// mes-backend/src/services/dashboardDataService.ts
/**
 * MES 데이터 수집 및 집계 서비스
 * 생산 공정, 생산 실적, 품질 검사, 설비 상태, SCM 재고 데이터를 조회하고 정규화합니다.
 */

const ProcessLine = require("../model/ProcessLine");
const ProductionRecord = require("../model/ProductionRecord");
const QualityInspection = require("../model/QualityInspection");
const Equipment = require("../model/Equipment");
const ComponentSCM = require("../model/ComponentSCM");

export interface DashboardRawData {
  lines: any[];
  records: any[];
  inspections: any[];
  equipments: any[];
  components: any[];
}

export interface DashboardMetrics {
  totalLines: number;
  runningLines: number;
  lineRunRate: number;
  targetCountTotal: number;
  actualCountTotal: number;
  defectCountTotal: number;
  yieldRate: number;
  achievementRate: number;
  inspectionTotal: number;
  inspectionPassCount: number;
  inspectionFailCount: number;
  inspectionPassRate: number;
  equipmentTotal: number;
  equipmentAbnormalCount: number;
  equipmentWarningCount: number;
  equipmentErrorCount: number;
  equipmentNormalCount: number;
  componentTotal: number;
  componentLowStockCount: number;
  abnormalEquipments: any[];
  lowStockComponents: any[];
}

export class DashboardDataService {
  /**
   * DB에서 모든 MES 도메인 데이터를 병렬로 조회합니다.
   */
  public async getRawData(): Promise<DashboardRawData> {
    const [lines, records, inspections, equipments, components] = await Promise.all([
      ProcessLine.findAll({ order: [["id", "ASC"]] }).catch(() => []),
      ProductionRecord.findAll({ order: [["id", "DESC"]], limit: 100 }).catch(() => []),
      QualityInspection.findAll({ order: [["id", "DESC"]], limit: 100 }).catch(() => []),
      Equipment.findAll({ order: [["id", "ASC"]] }).catch(() => []),
      ComponentSCM.findAll({ order: [["id", "ASC"]] }).catch(() => []),
    ]);

    return {
      lines: lines.map((l: any) => l.toJSON ? l.toJSON() : l),
      records: records.map((r: any) => r.toJSON ? r.toJSON() : r),
      inspections: inspections.map((i: any) => i.toJSON ? i.toJSON() : i),
      equipments: equipments.map((e: any) => e.toJSON ? e.toJSON() : e),
      components: components.map((c: any) => c.toJSON ? c.toJSON() : c),
    };
  }

  /**
   * 원시 MES 데이터를 비즈니스 지표(KPI)로 집계합니다.
   */
  public aggregateMetrics(rawData: DashboardRawData): DashboardMetrics {
    const { lines, records, inspections, equipments, components } = rawData;

    // 1. 공정 라인 가동률
    const totalLines = lines.length;
    const runningLines = lines.filter(
      (l) => (l.status || "").toUpperCase() === "RUNNING"
    ).length;
    const lineRunRate = totalLines > 0 ? (runningLines / totalLines) * 100 : 0;

    // 2. 생산 실적 및 수율
    const targetCountTotal = records.reduce(
      (sum, r) => sum + Number(r.targetCount || 0),
      0
    );
    const actualCountTotal = records.reduce(
      (sum, r) => sum + Number(r.actualCount || 0),
      0
    );
    const defectCountTotal = records.reduce(
      (sum, r) => sum + Number(r.defectCount || 0),
      0
    );
    const totalProduced = actualCountTotal + defectCountTotal;
    const yieldRate = totalProduced > 0 ? (actualCountTotal / totalProduced) * 100 : 0;
    const achievementRate =
      targetCountTotal > 0 ? (actualCountTotal / targetCountTotal) * 100 : 0;

    // 3. 품질 검사 합격률
    const inspectionTotal = inspections.length;
    const inspectionPassCount = inspections.filter(
      (i) => (i.result || "").toUpperCase() === "PASS"
    ).length;
    const inspectionFailCount = inspections.filter(
      (i) => (i.result || "").toUpperCase() === "FAIL"
    ).length;
    const inspectionPassRate =
      inspectionTotal > 0 ? (inspectionPassCount / inspectionTotal) * 100 : 0;

    // 4. 설비 상태 집계
    const equipmentTotal = equipments.length;
    const abnormalEquipments = equipments.filter((e) => {
      const status = (e.status || "").toUpperCase();
      return status === "WARNING" || status === "ERROR";
    });
    const equipmentWarningCount = equipments.filter(
      (e) => (e.status || "").toUpperCase() === "WARNING"
    ).length;
    const equipmentErrorCount = equipments.filter(
      (e) => (e.status || "").toUpperCase() === "ERROR"
    ).length;
    const equipmentAbnormalCount = abnormalEquipments.length;
    const equipmentNormalCount = equipmentTotal - equipmentAbnormalCount;

    // 5. SCM 자재 재고 집계
    const componentTotal = components.length;
    const lowStockComponents = components.filter((c) => {
      const stock = Number(c.stockQuantity ?? 0);
      const min = Number(c.minThreshold ?? 0);
      const status = (c.status || "").toUpperCase();
      return stock <= min || status === "WARNING" || status === "DANGER";
    });
    const componentLowStockCount = lowStockComponents.length;

    return {
      totalLines,
      runningLines,
      lineRunRate,
      targetCountTotal,
      actualCountTotal,
      defectCountTotal,
      yieldRate,
      achievementRate,
      inspectionTotal,
      inspectionPassCount,
      inspectionFailCount,
      inspectionPassRate,
      equipmentTotal,
      equipmentAbnormalCount,
      equipmentWarningCount,
      equipmentErrorCount,
      equipmentNormalCount,
      componentTotal,
      componentLowStockCount,
      abnormalEquipments,
      lowStockComponents,
    };
  }

  /**
   * 최신 집계 지표와 원시 데이터를 한 번에 가져옵니다.
   */
  public async getDashboardSummary(): Promise<{
    rawData: DashboardRawData;
    metrics: DashboardMetrics;
  }> {
    const rawData = await this.getRawData();
    const metrics = this.aggregateMetrics(rawData);
    return { rawData, metrics };
  }
}

export const dashboardDataService = new DashboardDataService();
