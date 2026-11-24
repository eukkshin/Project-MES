// mes-frontend/src/hooks/useAiEventSource.ts
import { useEffect, useRef } from "react";
import { issueStreamTicket } from "@/api/ai.http";
import { useAiAlertStore } from "@/store/useAiAlertStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useMesAlertStore } from "@/store/useMesAlertStore";
import type { AnomalyAlertEvent } from "@/types/aiDashboard";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/**
 * SSE 실시간 이상 알림 연결 훅
 * 
 * 흐름:
 * 1. 기존 Axios Bearer Token으로 일회용 연결 티켓(stream-ticket) 요청
 * 2. 발급받은 일회용 티켓을 쿼리스트링에 담아 브라우저 EventSource 생성
 * 3. 서버에서 티켓 검증 후 SSE 스트림 유지 및 실시간 이상 이벤트 수신
 * 4. 컴포넌트 언마운트 시 스트림 닫기 및 리소스 정리
 * 5. 연결 끊김 시 자동 재연결(티켓 재발급) 처리
 */
export function useAiEventSource() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const role = useAuthStore((state) => state.role);

  const { setIsConnected, addEvent } = useAiAlertStore();
  const triggerLiveAlert = useMesAlertStore((state) => state.triggerLiveAlert);

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    isMountedRef.current = true;

    // 관리자(ADMIN) 권한 확인
    const isAdmin = isInitialized && isAuth && role === "ADMIN";

    if (!isAdmin) {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
        setIsConnected(false);
      }
      return;
    }

    let isConnecting = false;

    const connectSse = async () => {
      if (isConnecting || !isMountedRef.current) return;
      isConnecting = true;

      try {
        // 1. 일회용 티켓 발급
        const ticketData = await issueStreamTicket();
        if (!ticketData.success || !ticketData.ticket || !isMountedRef.current) {
          throw new Error("SSE 티켓 발급에 실패했습니다.");
        }

        // 기존 연결이 있다면 정리
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
        }

        // 2. EventSource 연결 생성 (일회용 티켓 전달)
        const streamUrl = `${API_BASE_URL}/api/admin/dashboard/ai/stream?ticket=${encodeURIComponent(
          ticketData.ticket
        )}`;

        const es = new EventSource(streamUrl, { withCredentials: true });
        eventSourceRef.current = es;

        // 연결 성공 이벤트
        es.addEventListener("connected", (e: MessageEvent) => {
          if (!isMountedRef.current) return;
          try {
            const data = JSON.parse(e.data);
            console.log("[SSE] 관제 이벤트 스트림 연결 수립:", data);
            setIsConnected(true);
          } catch (err) {
            console.error("[SSE] connected 파싱 오류:", err);
          }
        });

        // 실시간 이상 상태 알림 이벤트
        es.addEventListener("anomaly", (e: MessageEvent) => {
          if (!isMountedRef.current) return;
          try {
            const anomalyData: AnomalyAlertEvent = JSON.parse(e.data);
            console.warn("[SSE] 실시간 이상 징후 수신:", anomalyData);

            // 신규 AI 알림 스토어에 기록
            addEvent(anomalyData);

            // 기존 글로벌 토스트 알림 연동 (기존 UI 경험 유지)
            triggerLiveAlert({
              title: anomalyData.title,
              description: anomalyData.message,
            });
          } catch (err) {
            console.error("[SSE] anomaly 파싱 오류:", err);
          }
        });

        // 에러 및 연결 끊김 처리
        es.onerror = (err) => {
          console.warn("[SSE] 스트림 연결 중단 또는 오류 발생. 재연결을 준비합니다.", err);
          setIsConnected(false);

          if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
          }

          // 5초 후 티켓 재발급 및 재연결 시도
          if (isMountedRef.current && !reconnectTimeoutRef.current) {
            reconnectTimeoutRef.current = setTimeout(() => {
              reconnectTimeoutRef.current = null;
              void connectSse();
            }, 5000);
          }
        };
      } catch (err) {
        console.error("[SSE] 티켓 발급 및 연결 실패:", err);
        setIsConnected(false);

        // 실패 시 10초 후 재시도
        if (isMountedRef.current && !reconnectTimeoutRef.current) {
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectTimeoutRef.current = null;
            void connectSse();
          }, 10000);
        }
      } finally {
        isConnecting = false;
      }
    };

    void connectSse();

    // 정리(cleanup): 컴포넌트 언마운트 시 SSE 닫기 및 타이머 제거
    return () => {
      isMountedRef.current = false;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      setIsConnected(false);
    };
  }, [isAuth, isInitialized, role, setIsConnected, addEvent, triggerLiveAlert]);
}
