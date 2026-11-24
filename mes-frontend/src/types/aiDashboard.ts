// mes-frontend/src/types/aiDashboard.ts

export type BriefingStatus = "HEALTHY" | "WARNING" | "CRITICAL";
export type RiskSeverity = "CRITICAL" | "WARNING" | "INFO";
export type RiskCategory = "EQUIPMENT" | "SCM" | "PRODUCTION" | "QUALITY" | "PROCESS";

export interface RiskItem {
  id: string;
  category: RiskCategory;
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

export interface AiBriefingData {
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

export interface StreamTicketResponse {
  success: boolean;
  ticket: string;
  expiresIn: number;
}

export type AnomalyEventType =
  | "EQUIPMENT_WARNING"
  | "EQUIPMENT_ERROR"
  | "SCM_LOW_STOCK"
  | "QUALITY_DEFECT_SPIKE";

export interface AnomalyAlertEvent {
  id: string;
  type: AnomalyEventType;
  severity: "CRITICAL" | "WARNING";
  title: string;
  message: string;
  entityId: number | string;
  entityName: string;
  data: Record<string, any>;
  timestamp: string;
}
