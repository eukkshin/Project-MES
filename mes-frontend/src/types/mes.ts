// 공정 라인 데이터 타입
export interface ProcessLine {
  id: number;
  lineName: string;
  processType: string;
  status: string;
  currentProduct: string;
  operator: string;
}

// 공정 이력 데이터 타입
export interface ProcessHistoryItem {
  id: number;
  lineId: number;
  lineName: string;
  previousStatus: string;
  newStatus: string;
  changedBy: string;
  reason?: string;
  createdAt: string;
}

export type ProcessLineRequest = Pick<ProcessLine,
  "lineName" | "processType" | "currentProduct" | "operator"
>;


// 품질 검사 데이터 타입
export interface InspectionItem {
  id: number;
  serialNumber: string;
  inspectionType: string;
  defectReason: string | null;
  inspector: string;
  result: "PASS" | "FAIL";
}

export type InspectionRequest = Omit<InspectionItem,'id'>

// 생산 실적 데이터 타입
export interface ProductionRecord {
  id: number;
  lineName: string;
  targetCount: number;
  actualCount: number;
  defectCount: number;
  yieldRate: number;
}

export type ProductionRecordRequest = Omit<ProductionRecord,'id'>


//클린룸 설비 데이터 타입
export interface EquipmentItem {
  id: number;
  equipmentName: string;
  cleanroomZone: string;
  temperature: number;
  humidity: number;
  status: string;
}

// 설비 등록 요청
export interface EquipmentRequest {
  equipmentName: string;
  cleanroomZone: string;
  temperature: number;
  humidity: number;
}

// 부품 데이터 타입
export interface ComponentItem {
  id: number;
  componentName: string;
  category: string;
  stockQuantity: number;
  minThreshold: number;
  supplier: string;
  status: string;
}

// SCM 부품 등록 요청
export interface ComponentRequest {
  componentName: string;
  category: string;
  stockQuantity: number;
  minThreshold: number;
  supplier: string;
}
