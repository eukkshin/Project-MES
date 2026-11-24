// mes-backend/src/services/aiEventManager.ts
/**
 * SSE(Server-Sent Events) 연결 관리 및 브로드캐스트 매니저
 * 
 * - 일회용 단기 만료 티켓(Stream Ticket) 발급 및 검증 (재사용 불가)
 * - SSE 연결 유지, 하트비트(Keep-Alive ping), 연결 해제 시 리소스 자동 정리
 * - 실시간 이상 알림 브로드캐스트 전송
 * 
 * [주의사항]:
 * 현재 구현은 단일 서버 프로세스의 인메모리 관리 방식입니다.
 * 추후 다중 서버 인스턴스(L4/L7 로드밸런싱 클러스터) 환경으로 확장할 경우
 * Redis Pub/Sub, Kafka 등의 외부 메시지 브로커 및 공유 세션 저장소(Redis)를 도입해야 합니다.
 */

import crypto from "crypto";
import { Response } from "express";

interface TicketPayload {
  userId: number;
  email: string;
  role: string;
  expiresAt: number;
}

interface SseClient {
  id: string;
  res: Response;
  userId: number;
  connectedAt: Date;
}

export class AiEventManager {
  /**
   * 일회용 티켓 저장소: Map<ticketToken, TicketPayload>
   */
  private tickets: Map<string, TicketPayload> = new Map();

  /**
   * 연결된 SSE 클라이언트 집합
   */
  private clients: Map<string, SseClient> = new Map();

  /**
   * 하트비트 인터벌 타이머
   */
  private heartbeatTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.startHeartbeat();
    this.startTicketCleaner();
  }

  /**
   * 일회용 SSE 연결 티켓 발급 (유효시간: 60초)
   */
  public issueTicket(user: { id: number; email: string; role?: string }): {
    ticket: string;
    expiresIn: number;
  } {
    const ticket = crypto.randomBytes(32).toString("hex");
    const expiresInSeconds = 60;
    const expiresAt = Date.now() + expiresInSeconds * 1000;

    this.tickets.set(ticket, {
      userId: user.id,
      email: user.email,
      role: user.role || "EMPLOYEE",
      expiresAt,
    });

    return {
      ticket,
      expiresIn: expiresInSeconds,
    };
  }

  /**
   * 티켓 유효성 검증 및 일회용 사용(즉시 폐기)
   */
  public consumeTicket(ticket: string): TicketPayload | null {
    if (!ticket || typeof ticket !== "string") {
      return null;
    }

    const payload = this.tickets.get(ticket);
    if (!payload) {
      return null;
    }

    // 일회용 보장을 위해 조회 즉시 삭제
    this.tickets.delete(ticket);

    // 만료 시간 검증
    if (Date.now() > payload.expiresAt) {
      return null;
    }

    return payload;
  }

  /**
   * SSE 클라이언트 연결 등록 및 스트림 초기화
   */
  public registerClient(res: Response, user: TicketPayload): string {
    const clientId = `client-${user.userId}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;

    // SSE 표준 응답 헤더 설정
    res.writeHead(200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no", // Nginx 프록시 버퍼링 비활성화
      "Access-Control-Allow-Origin": res.req.headers.origin || "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
    });

    // 즉시 버퍼 플러시 (헤더 전송)
    res.flushHeaders?.();

    const client: SseClient = {
      id: clientId,
      res,
      userId: user.userId,
      connectedAt: new Date(),
    };

    this.clients.set(clientId, client);

    // 연결 수립 알림 이벤트 전송
    this.sendToClient(client, "connected", {
      success: true,
      clientId,
      userId: user.userId,
      message: "실시간 MES 관제 이벤트 스트림이 연결되었습니다.",
      connectedAt: client.connectedAt.toISOString(),
    });

    // 클라이언트 연결 종료 감지 및 정리
    res.on("close", () => {
      this.removeClient(clientId);
    });

    return clientId;
  }

  /**
   * 클라이언트 연결 해제 및 리소스 정리
   */
  public removeClient(clientId: string): void {
    const client = this.clients.get(clientId);
    if (client) {
      this.clients.delete(clientId);
      try {
        if (!client.res.writableEnded) {
          client.res.end();
        }
      } catch (err) {
        // 무시
      }
    }
  }

  /**
   * 특정 클라이언트에 SSE 메시지 전송
   */
  private sendToClient(client: SseClient, event: string, data: any): void {
    try {
      if (!client.res.writableEnded) {
        client.res.write(`event: ${event}\n`);
        client.res.write(`data: ${JSON.stringify(data)}\n\n`);
      }
    } catch (err) {
      this.removeClient(client.id);
    }
  }

  /**
   * 모든 연결된 관리자 클라이언트에게 이벤트 브로드캐스트
   */
  public broadcast(event: string, data: any): number {
    let sentCount = 0;
    for (const client of this.clients.values()) {
      try {
        this.sendToClient(client, event, data);
        sentCount++;
      } catch {
        this.removeClient(client.id);
      }
    }
    return sentCount;
  }

  /**
   * 현재 활성 연결 클라이언트 수 반환
   */
  public getConnectedClientCount(): number {
    return this.clients.size;
  }

  /**
   * 25초 주기 Keep-Alive ping 전송 (연결 끊김 방지)
   */
  private startHeartbeat(): void {
    if (this.heartbeatTimer) return;

    this.heartbeatTimer = setInterval(() => {
      for (const client of this.clients.values()) {
        try {
          if (!client.res.writableEnded) {
            // SSE 주석 형식의 핑 전송 (프론트엔드 이벤트 리스너를 방해하지 않음)
            client.res.write(`: ping ${Date.now()}\n\n`);
          }
        } catch {
          this.removeClient(client.id);
        }
      }
    }, 25000);
  }

  /**
   * 만료된 미사용 티켓 주기적 청소 (1분 주기)
   */
  private startTicketCleaner(): void {
    setInterval(() => {
      const now = Date.now();
      for (const [ticket, payload] of this.tickets.entries()) {
        if (now > payload.expiresAt) {
          this.tickets.delete(ticket);
        }
      }
    }, 60000);
  }
}

export const aiEventManager = new AiEventManager();
