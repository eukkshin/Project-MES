// mes-backend/src/controllers/aiDashboardController.ts
/**
 * AI 관제 대시보드 API 컨트롤러
 * 
 * 1. POST /api/admin/dashboard/ai/briefing: MES 데이터 수집 및 규칙 기반 AI 브리핑 생성
 * 2. POST /api/admin/dashboard/ai/stream-ticket: 관리자 인증 후 일회용 SSE 연결 티켓 발급
 * 3. GET  /api/admin/dashboard/ai/stream: 발급된 일회용 티켓 검증 및 SSE 실시간 스트림 연결
 */

import { Request, Response } from "express";
import { aiAnalysisService } from "../services/aiAnalysisService";
import { aiEventManager } from "../services/aiEventManager";
import { dashboardDataService } from "../services/dashboardDataService";

export class AiDashboardController {
  /**
   * AI 관제 브리핑 요청 처리
   */
  public async getBriefing(req: Request, res: Response): Promise<void> {
    try {
      // 1. MES 데이터 수집 및 지표 집계
      const { rawData, metrics } = await dashboardDataService.getDashboardSummary();

      // 2. 규칙 기반 브리핑 분석 생성
      const briefing = await aiAnalysisService.generateBriefing(rawData, metrics);

      res.status(200).json({
        success: true,
        data: briefing,
      });
    } catch (error: any) {
      console.error("[AiDashboardController] AI 브리핑 생성 오류:", error);
      res.status(500).json({
        success: false,
        message: "AI 브리핑 분석 중 서버 오류가 발생했습니다.",
        error: error?.message,
      });
    }
  }

  /**
   * SSE 실시간 스트림 연결용 일회용 티켓 발급
   */
  public async issueStreamTicket(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;

      if (!user || !user.id) {
        res.status(401).json({
          success: false,
          code: "UNAUTHORIZED",
          message: "인증되지 않은 사용자입니다.",
        });
        return;
      }

      // 관리자 권한 확인 (필요시)
      if (user.role !== "ADMIN") {
        res.status(403).json({
          success: false,
          code: "FORBIDDEN",
          message: "관리자 권한이 필요합니다.",
        });
        return;
      }

      // 일회용 티켓 발급
      const result = aiEventManager.issueTicket(user);

      res.status(200).json({
        success: true,
        ticket: result.ticket,
        expiresIn: result.expiresIn,
      });
    } catch (error: any) {
      console.error("[AiDashboardController] SSE 티켓 발급 오류:", error);
      res.status(500).json({
        success: false,
        message: "SSE 연결 티켓 발급 중 오류가 발생했습니다.",
      });
    }
  }

  /**
   * SSE 실시간 스트림 연결 처리
   * EventSource는 커스텀 헤더를 보낼 수 없으므로 쿼리 파라미터의 일회용 티켓으로 인증합니다.
   */
  public async connectStream(req: Request, res: Response): Promise<void> {
    const ticket = req.query.ticket as string;

    if (!ticket) {
      res.status(401).json({
        success: false,
        code: "TICKET_REQUIRED",
        message: "SSE 연결 티켓이 제공되지 않았습니다.",
      });
      return;
    }

    // 티켓 검증 및 일회용 사용(즉시 파기)
    const user = aiEventManager.consumeTicket(ticket);

    if (!user) {
      res.status(401).json({
        success: false,
        code: "INVALID_OR_EXPIRED_TICKET",
        message: "유효하지 않거나 이미 만료/사용된 SSE 연결 티켓입니다.",
      });
      return;
    }

    // 관리자 권한 검증
    if (user.role !== "ADMIN") {
      res.status(403).json({
        success: false,
        code: "FORBIDDEN",
        message: "관리자 권한이 필요합니다.",
      });
      return;
    }

    // SSE 클라이언트 등록 및 스트림 시작
    aiEventManager.registerClient(res, user);
  }
}

export const aiDashboardController = new AiDashboardController();
