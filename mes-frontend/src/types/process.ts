
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