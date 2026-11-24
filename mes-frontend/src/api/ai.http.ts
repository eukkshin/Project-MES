// mes-frontend/src/api/ai.http.ts
import { api } from "@/lib/axios";
import type { AiBriefingData, StreamTicketResponse } from "@/types/aiDashboard";

/**
 * AI 관제 브리핑 생성 요청 API
 * 사용자가 요청할 때 1회 분석을 실행합니다. (15초 폴링 제외)
 */
export const getAiBriefing = async (): Promise<AiBriefingData> => {
  const response = await api.post<{ success: boolean; data: AiBriefingData }>(
    "/api/admin/dashboard/ai/briefing"
  );
  return response.data.data;
};

/**
 * SSE 실시간 연결을 위한 일회용 티켓 발급 API
 * Authorization Bearer Token 헤더로 인증 후 일회용 티켓을 반환받습니다.
 */
export const issueStreamTicket = async (): Promise<StreamTicketResponse> => {
  const response = await api.post<StreamTicketResponse>(
    "/api/admin/dashboard/ai/stream-ticket"
  );
  return response.data;
};
