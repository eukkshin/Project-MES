// mes-backend/src/services/aiAnalysisService.ts
/**
 * AI 브리핑 분석 서비스
 * 
 * 현재: MES 데이터를 기반으로 한 규칙 기반(Rule-based) 분석 알고리즘
 * 추후 확장: Hugging Face Inference API 또는 OpenAI API 등 외부 LLM 연동 인터페이스 준비
 */

import { DashboardMetrics, DashboardRawData } from "./dashboardDataService";

export type RiskSeverity = "CRITICAL" | "WARNING" | "INFO";
export type BriefingStatus = "HEALTHY" | "WARNING" | "CRITICAL";

export interface RiskItem {
  id: string;
  category: "EQUIPMENT" | "SCM" | "PRODUCTION" | "QUALITY" | "PROCESS";
  severity: RiskSeverity;
  title: string;
  detail: string;
  target?: string;
  suggestion: string;
}

export interface RecommendationItem {
  id: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  action: string;
  targetDomain: string;
  expectedEffect: string;
}

export interface AiBriefingResponse {
  overallStatus: BriefingStatus;
  headline: string;
  overview: string;
  risks: RiskItem[];
  recommendations: RecommendationItem[];
  analyzedAt: string;
  metrics: {
    lineRunRate: number;
    yieldRate: number;
    achievementRate: number;
    inspectionPassRate: number;
    alertEquipmentCount: number;
    lowStockCount: number;
  };
  modelInfo: {
    engine: string;
    version: string;
    provider: string;
  };
}

export class AiAnalysisService {
  /**
   * 브리핑 생성 메인 진입점
   * 추후 Hugging Face / OpenAI 연동 시 이 메서드 내부에서 모델 호출로 분기하거나 교체할 수 있습니다.
   */
  public async generateBriefing(
    rawData: DashboardRawData,
    metrics: DashboardMetrics
  ): Promise<AiBriefingResponse> {
    // [TODO: 추후 Hugging Face / OpenAI API 연동 지점]
    // const prompt = this.buildPrompt(rawData, metrics);
    // return await this.callExternalAiModel(prompt);

    return this.analyzeRuleBased(rawData, metrics);
  }

  /**
   * 규칙 기반 분석 로직
   */
  private analyzeRuleBased(
    rawData: DashboardRawData,
    metrics: DashboardMetrics
  ): AiBriefingResponse {
    const risks: RiskItem[] = [];
    const recommendations: RecommendationItem[] = [];

    // 1. 설비 상태 분석 (최우선순위)
    if (metrics.equipmentErrorCount > 0) {
      const errorEquipments = rawData.equipments.filter(
        (e) => (e.status || "").toUpperCase() === "ERROR"
      );
      const names = errorEquipments.map((e) => e.equipmentName).join(", ");

      risks.push({
        id: "risk-eq-error",
        category: "EQUIPMENT",
        severity: "CRITICAL",
        title: `설비 심각 이상(ERROR) ${metrics.equipmentErrorCount}건 발생`,
        detail: `비정상 정지 또는 임계치 심각 초과 설비: ${names}. 즉각적인 생산 라인 영향이 우려됩니다.`,
        target: names,
        suggestion: "현장 엔지니어 긴급 파견 및 비상 안전 점검 프로토콜 가동 권장",
      });

      recommendations.push({
        id: "rec-eq-error",
        priority: "HIGH",
        targetDomain: "클린룸/설비",
        action: `이상 설비(${names}) 즉시 가동 중단 및 인터록 점검`,
        expectedEffect: "추가 결함 확산 방지 및 장비 파손 방지",
      });
    }

    if (metrics.equipmentWarningCount > 0) {
      const warningEquipments = rawData.equipments.filter(
        (e) => (e.status || "").toUpperCase() === "WARNING"
      );
      const names = warningEquipments.map((e) => e.equipmentName).join(", ");

      risks.push({
        id: "risk-eq-warning",
        category: "EQUIPMENT",
        severity: "WARNING",
        title: `설비 주의(WARNING) ${metrics.equipmentWarningCount}건 감지`,
        detail: `온습도 파라미터 이탈 또는 주의 상태 설비: ${names}.`,
        target: names,
        suggestion: "설비 센서 캘리브레이션 및 공조 시스템(HVAC) 설정값 재확인 권장",
      });

      recommendations.push({
        id: "rec-eq-warning",
        priority: "MEDIUM",
        targetDomain: "클린룸/설비",
        action: `주의 설비(${names}) 온·습도 모니터링 주기 단축 및 예방 정비 실시`,
        expectedEffect: "ERROR 전이 사전 예방 및 생산 환경 안정화",
      });
    }

    // 2. SCM 안전재고 미달 분석
    if (metrics.componentLowStockCount > 0) {
      const criticalLow = metrics.lowStockComponents.slice(0, 3);
      const details = criticalLow
        .map(
          (c) =>
            `${c.componentName}(보유: ${c.stockQuantity} / 기준: ${c.minThreshold} EA)`
        )
        .join(", ");

      const isCritical = metrics.lowStockComponents.some(
        (c) => Number(c.stockQuantity) <= Number(c.minThreshold) * 0.2
      );

      risks.push({
        id: "risk-scm-low-stock",
        category: "SCM",
        severity: isCritical ? "CRITICAL" : "WARNING",
        title: `안전재고 미달 자재 ${metrics.componentLowStockCount}개 품목 감지`,
        detail: `안전재고 수준 이하 품목: ${details}${
          metrics.componentLowStockCount > 3 ? " 외" : ""
        }. 자재 결품 시 조립 라인 셧다운 위험이 있습니다.`,
        target: details,
        suggestion: "협력사 긴급 발주 발송 및 완충 재고(Safety Stock) 보충 요청",
      });

      recommendations.push({
        id: "rec-scm-order",
        priority: isCritical ? "HIGH" : "MEDIUM",
        targetDomain: "자재 SCM",
        action: `부족 자재(${criticalLow.map((c) => c.componentName).join(", ")}) 긴급 입고 요청 및 납기 단축 협의`,
        expectedEffect: "자재 부족으로 인한 공정 정지(Line Stop) 방지",
      });
    }

    // 3. 생산 실적 및 목표 달성률 분석
    if (metrics.achievementRate > 0 && metrics.achievementRate < 85) {
      risks.push({
        id: "risk-prod-achievement",
        category: "PRODUCTION",
        severity: "WARNING",
        title: `목표 생산 달성률 저조 (${metrics.achievementRate.toFixed(1)}%)`,
        detail: `누적 목표 생산량 대비 실적이 ${metrics.achievementRate.toFixed(
          1
        )}%에 머무르고 있습니다. (목표: ${metrics.targetCountTotal.toLocaleString()} / 실적: ${metrics.actualCountTotal.toLocaleString()} EA)`,
        suggestion: "공정별 작업 편성 효율화 및 병목 라인 작업자 추가 투입 권장",
      });

      recommendations.push({
        id: "rec-prod-efficiency",
        priority: "MEDIUM",
        targetDomain: "생산 실적",
        action: "병목 공정 택트 타임(Tact Time) 재조정 및 교대 근무 인력 재배치",
        expectedEffect: "일일 목표 생산 달성률 95% 이상 회복",
      });
    }

    // 4. 공정 수율 및 품질 불량 분석
    if (metrics.yieldRate > 0 && metrics.yieldRate < 95) {
      risks.push({
        id: "risk-prod-yield",
        category: "PRODUCTION",
        severity: metrics.yieldRate < 88 ? "CRITICAL" : "WARNING",
        title: `공정 수율 기준치 미달 (${metrics.yieldRate.toFixed(1)}%)`,
        detail: `양품률 기준치 95.0% 대비 ${metrics.yieldRate.toFixed(
          1
        )}%로 불량품(${metrics.defectCountTotal.toLocaleString()} EA) 발생률이 높습니다.`,
        suggestion: "불량 다발 공정의 가공 파라미터 분석 및 초기 샘플링 전수 검사 권장",
      });

      recommendations.push({
        id: "rec-quality-inspection",
        priority: "HIGH",
        targetDomain: "품질 관리",
        action: "불량 다발 공정의 검사 빈도 상향 및 원인 분석(Root Cause Analysis)",
        expectedEffect: "불량률 2.0% 이하 억제 및 원가 손실 절감",
      });
    }

    // 5. 공정 라인 가동률 분석
    if (metrics.lineRunRate > 0 && metrics.lineRunRate < 70) {
      const stoppedLines = rawData.lines.filter(
        (l) => (l.status || "").toUpperCase() !== "RUNNING"
      );
      risks.push({
        id: "risk-process-line",
        category: "PROCESS",
        severity: "WARNING",
        title: `전체 공정 가동률 저하 (${metrics.lineRunRate.toFixed(0)}%)`,
        detail: `총 ${metrics.totalLines}개 라인 중 ${metrics.runningLines}개 라인만 정상 가동 중입니다. (비가동: ${stoppedLines
          .map((l) => l.lineName)
          .join(", ")})`,
        suggestion: "비가동 라인의 유지보수 일정 확인 및 작업 오더 조기 배정 권장",
      });
    }

    // 전체 상태(overallStatus) 결정
    let overallStatus: BriefingStatus = "HEALTHY";
    if (risks.some((r) => r.severity === "CRITICAL")) {
      overallStatus = "CRITICAL";
    } else if (risks.some((r) => r.severity === "WARNING")) {
      overallStatus = "WARNING";
    }

    // 종합 헤드라인 및 오버뷰 구성
    let headline = "";
    let overview = "";

    if (overallStatus === "HEALTHY") {
      headline = "전 공정 및 설비 최적 정상 가동 중";
      overview = `현재 공정 가동률 ${metrics.lineRunRate.toFixed(
        0
      )}%, 생산 수율 ${metrics.yieldRate.toFixed(
        1
      )}%, 품질 합격률 ${metrics.inspectionPassRate.toFixed(
        1
      )}%로 모든 핵심 지표가 정상 임계치 내에서 원활하게 운영되고 있습니다. 설비 이상이나 자재 결품 징후가 없어 현재 생산 계획을 그대로 유지하셔도 좋습니다.`;

      recommendations.push({
        id: "rec-healthy-keep",
        priority: "LOW",
        targetDomain: "종합 관제",
        action: "표준 작업 지침 준수 유지 및 주기적 예방 보전 계획 점검",
        expectedEffect: "현행 고수율 및 무사고 운영 지속",
      });
    } else if (overallStatus === "WARNING") {
      headline = `주의 징후 ${risks.length}건 감지 - 사전 조치 권장`;
      const issueSummary = risks.map((r) => r.title).join(", ");
      overview = `공정 일부 영역에서 주의 수준의 이상 징후(${issueSummary})가 확인되었습니다. 현재 가동에는 중대한 지장이 없으나 방치 시 품질 저하나 라인 정지로 확산될 우려가 있으므로 권장 대응 사항을 조속히 검토하시기 바랍니다.`;
    } else {
      headline = `긴급 위험 ${
        risks.filter((r) => r.severity === "CRITICAL").length
      }건 감지 - 즉각 대응 필요`;
      const criticalSummary = risks
        .filter((r) => r.severity === "CRITICAL")
        .map((r) => r.title)
        .join(", ");
      overview = `생산 라인에 직접적인 차질을 초래할 수 있는 심각한 위험(${criticalSummary})이 포착되었습니다. 즉각적인 현장 확인 및 긴급 비상 대응 프로세스를 가동해야 합니다.`;
    }

    return {
      overallStatus,
      headline,
      overview,
      risks,
      recommendations,
      analyzedAt: new Date().toISOString(),
      metrics: {
        lineRunRate: metrics.lineRunRate,
        yieldRate: metrics.yieldRate,
        achievementRate: metrics.achievementRate,
        inspectionPassRate: metrics.inspectionPassRate,
        alertEquipmentCount: metrics.equipmentAbnormalCount,
        lowStockCount: metrics.componentLowStockCount,
      },
      modelInfo: {
        engine: "MES-RuleEngine-v1.0",
        version: "1.0.0",
        provider: "Rule-Based Analyzer (Hugging Face / OpenAI Ready)",
      },
    };
  }
}

export const aiAnalysisService = new AiAnalysisService();
