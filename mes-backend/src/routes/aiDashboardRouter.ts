// mes-backend/src/routes/aiDashboardRouter.ts
/**
 * AI 관제 대시보드 라우터
 */

import { Router } from "express";
import { aiDashboardController } from "../controllers/aiDashboardController";

export const createAiDashboardRouter = (
  verifyToken: any,
  verifyAdmin: any
): Router => {
  const router = Router();

  // 1. AI 브리핑 분석 요청 API (POST /api/admin/dashboard/ai/briefing)
  router.post(
    "/briefing",
    verifyToken,
    verifyAdmin,
    aiDashboardController.getBriefing.bind(aiDashboardController)
  );

  // 2. SSE 연결용 일회용 티켓 발급 API (POST /api/admin/dashboard/ai/stream-ticket)
  router.post(
    "/stream-ticket",
    verifyToken,
    verifyAdmin,
    aiDashboardController.issueStreamTicket.bind(aiDashboardController)
  );

  // 3. SSE 실시간 스트림 연결 API (GET /api/admin/dashboard/ai/stream?ticket=...)
  // 브라우저 EventSource 연결: 쿼리의 일회용 티켓으로 인증 검증
  router.get(
    "/stream",
    aiDashboardController.connectStream.bind(aiDashboardController)
  );

  return router;
};
