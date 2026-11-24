// mes-backend/src/services/aiMonitorService.ts
/**
 * 백그라운드 이상 상태 주기적 모니터링 서비스
 * 
 * - 주기적으로 MES 데이터를 조회하여 설비 상태 및 안전재고 이상을 감지
 * - 새로운 이상 상태 발생 시 aiEventManager를 통해 연결된 SSE 클라이언트들에 실시간 전파
 * - 단일 서버 환경에서 독립된 백그라운드 타이머로 동작
 */

import { aiAlertService } from "./aiAlertService";
import { aiEventManager } from "./aiEventManager";
import { dashboardDataService } from "./dashboardDataService";

export class AiMonitorService {
  private timer: NodeJS.Timeout | null = null;
  private isChecking: boolean = false;
  private intervalMs: number = 5000; // 5초 간격 모니터링

  /**
   * 모니터링 서비스 시작
   */
  public start(intervalMs: number = 5000): void {
    if (this.timer) {
      return;
    }

    this.intervalMs = intervalMs;
    console.log(`[AiMonitorService] 실시간 MES 이상 상태 모니터링 시작 (주기: ${this.intervalMs}ms)`);

    this.timer = setInterval(() => {
      void this.checkOnce();
    }, this.intervalMs);
  }

  /**
   * 모니터링 서비스 중지
   */
  public stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      console.log("[AiMonitorService] 실시간 MES 이상 상태 모니터링 중지");
    }
  }

  /**
   * 1회 이상 상태 확인 및 이벤트 전송
   */
  public async checkOnce(): Promise<number> {
    if (this.isChecking) {
      return 0; // 이전 검사가 아직 진행 중이면 건너뜀
    }

    this.isChecking = true;

    try {
      // 1. 최신 MES 원시 데이터 조회
      const rawData = await dashboardDataService.getRawData();

      // 2. 이상 상태 감지 및 중복 여부 확인
      const newAnomalies = aiAlertService.detectAnomalies(rawData);

      // 3. 신규 이상 이벤트가 있으면 SSE 브로드캐스트
      if (newAnomalies.length > 0) {
        for (const anomaly of newAnomalies) {
          console.log(
            `[AiMonitorService] 이상 상태 감지 및 SSE 전송: [${anomaly.type}] ${anomaly.title}`
          );
          aiEventManager.broadcast("anomaly", anomaly);
        }
      }

      return newAnomalies.length;
    } catch (error) {
      console.error("[AiMonitorService] 이상 상태 점검 중 오류:", error);
      return 0;
    } finally {
      this.isChecking = false;
    }
  }
}

export const aiMonitorService = new AiMonitorService();
