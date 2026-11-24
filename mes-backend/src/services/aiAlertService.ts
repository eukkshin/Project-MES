// mes-backend/src/services/aiAlertService.ts
/**
 * 설비 및 재고 이상 감지 및 중복 방지 서비스
 * 
 * 감지 대상:
 * 1. 설비 상태가 NORMAL에서 WARNING으로 변경된 경우
 * 2. 설비 상태가 ERROR로 변경된 경우
 * 3. 재고 수량이 안전재고 이하로 내려간 경우
 * 
 * 중복 방지 규칙:
 * - 활성 이상 상태를 메모리에 보관하여 매 주기마다 동일한 알림이 중복 전송되는 것을 방지합니다.
 * - 정상으로 복구되면 해당 상태 캐시가 해제되어 다음 이상 발생 시 다시 새로운 알림이 발송됩니다.
 */

import { DashboardRawData } from "./dashboardDataService";

export type AnomalyType =
  | "EQUIPMENT_WARNING"
  | "EQUIPMENT_ERROR"
  | "SCM_LOW_STOCK"
  | "QUALITY_DEFECT_SPIKE";

export interface AnomalyAlertEvent {
  id: string;
  type: AnomalyType;
  severity: "CRITICAL" | "WARNING";
  title: string;
  message: string;
  entityId: number | string;
  entityName: string;
  data: Record<string, any>;
  timestamp: string;
}

export class AiAlertService {
  /**
   * 활성화된 이상 상태 키 집합
   * 형식: `eq-${id}-${status}` 또는 `scm-${id}`
   */
  private activeAlertKeys: Set<string> = new Set();

  /**
   * 이전 설비 상태 스냅샷 (이전 상태 -> 새 상태 전이 추적)
   * Map<equipmentId, lastKnownStatus>
   */
  private lastEquipmentStatuses: Map<number, string> = new Map();

  /**
   * 이상 상태를 검사하고 새로 발생한 이벤트 목록을 반환합니다.
   */
  public detectAnomalies(rawData: DashboardRawData): AnomalyAlertEvent[] {
    const newEvents: AnomalyAlertEvent[] = [];
    const currentActiveKeys = new Set<string>();

    // 1. 설비 상태 검사
    for (const eq of rawData.equipments) {
      const eqId = Number(eq.id);
      const currentStatus = String(eq.status || "NORMAL").toUpperCase();
      const prevStatus = this.lastEquipmentStatuses.get(eqId) || "NORMAL";

      // 상태 변경 이력 갱신
      this.lastEquipmentStatuses.set(eqId, currentStatus);

      // (1) 설비가 NORMAL로 복구된 경우
      if (currentStatus === "NORMAL") {
        this.activeAlertKeys.delete(`eq-${eqId}-WARNING`);
        this.activeAlertKeys.delete(`eq-${eqId}-ERROR`);
        continue;
      }

      // (2) 설비가 WARNING 또는 ERROR인 경우
      const isWarning = currentStatus === "WARNING";
      const isError = currentStatus === "ERROR";

      if (isWarning || isError) {
        const alertKey = `eq-${eqId}-${currentStatus}`;
        currentActiveKeys.add(alertKey);

        // 아직 알림이 발송되지 않은 신규 상태이거나 상태가 전이된 경우
        if (!this.activeAlertKeys.has(alertKey)) {
          this.activeAlertKeys.add(alertKey);

          // 이전 상태와 다른 레벨의 알림 키는 제거 (예: WARNING -> ERROR로 격상 시 WARNING 키 제거)
          if (isError) {
            this.activeAlertKeys.delete(`eq-${eqId}-WARNING`);
          } else if (isWarning) {
            this.activeAlertKeys.delete(`eq-${eqId}-ERROR`);
          }

          newEvents.push({
            id: `evt-eq-${eqId}-${Date.now()}`,
            type: isError ? "EQUIPMENT_ERROR" : "EQUIPMENT_WARNING",
            severity: isError ? "CRITICAL" : "WARNING",
            title: isError
              ? `[설비 심각] ${eq.equipmentName} 이상 발생 (ERROR)`
              : `[설비 주의] ${eq.equipmentName} 임계치 주의 (WARNING)`,
            message: `${eq.cleanroomZone || "클린룸"}의 '${
              eq.equipmentName
            }' 설비가 ${currentStatus} 상태로 전환되었습니다. (온도: ${
              eq.temperature ?? "-"
            }℃, 습도: ${eq.humidity ?? "-"}%)`,
            entityId: eqId,
            entityName: eq.equipmentName,
            data: {
              cleanroomZone: eq.cleanroomZone,
              temperature: eq.temperature,
              humidity: eq.humidity,
              status: currentStatus,
              previousStatus: prevStatus,
            },
            timestamp: new Date().toISOString(),
          });
        }
      }
    }

    // 2. SCM 재고 검사 (안전재고 이하 감지)
    for (const comp of rawData.components) {
      const compId = Number(comp.id);
      const stock = Number(comp.stockQuantity ?? 0);
      const minThreshold = Number(comp.minThreshold ?? 0);
      const status = String(comp.status || "").toUpperCase();

      const isLowStock =
        stock <= minThreshold || status === "WARNING" || status === "DANGER";
      const alertKey = `scm-${compId}`;

      if (isLowStock) {
        currentActiveKeys.add(alertKey);

        // 아직 알림을 보내지 않았거나, 재고가 기존보다 현저히 추가 소진된 경우
        if (!this.activeAlertKeys.has(alertKey)) {
          this.activeAlertKeys.add(alertKey);

          const isCritical = stock <= Math.max(1, Math.floor(minThreshold * 0.2));

          newEvents.push({
            id: `evt-scm-${compId}-${Date.now()}`,
            type: "SCM_LOW_STOCK",
            severity: isCritical ? "CRITICAL" : "WARNING",
            title: isCritical
              ? `[재고 긴급] ${comp.componentName} 안전재고 심각 부족`
              : `[재고 주의] ${comp.componentName} 안전재고 기준 미달`,
            message: `자재 '${comp.componentName}'의 현재고가 ${stock} EA로 최소 안전재고(${minThreshold} EA) 이하로 감소했습니다.`,
            entityId: compId,
            entityName: comp.componentName,
            data: {
              category: comp.category,
              stockQuantity: stock,
              minThreshold,
              supplier: comp.supplier,
              status: comp.status,
            },
            timestamp: new Date().toISOString(),
          });
        }
      } else {
        // 안전재고 이상으로 회복된 경우 캐시 제거 -> 추후 다시 부족해지면 신규 알림 발송 가능
        this.activeAlertKeys.delete(alertKey);
      }
    }

    return newEvents;
  }

  /**
   * 알림 캐시 초기화 (테스트용 또는 수동 리셋용)
   */
  public resetAlertCache(): void {
    this.activeAlertKeys.clear();
    this.lastEquipmentStatuses.clear();
  }

  /**
   * 현재 활성 알림 키 수 확인
   */
  public getActiveAlertCount(): number {
    return this.activeAlertKeys.size;
  }
}

export const aiAlertService = new AiAlertService();
