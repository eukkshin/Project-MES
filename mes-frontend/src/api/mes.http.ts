import { api } from "@/lib/axios";
import type { 
    InspectionItem,
    ProcessLine,
    ProcessHistoryItem, 
    ProcessLineRequest,
    ProductionRecordRequest,
    InspectionRequest,
    ProductionRecord,
    EquipmentItem,
    EquipmentRequest,
    ComponentItem,
    ComponentRequest,
} from "@/types/mes";

//공정라인 목록조회
export const fetchProcessLines =async():Promise<ProcessLine[]>=>{
    const response = await api.get('/api/process/lines')
    return response.data.line ?? [];
}

// 공정라인 상태변경 이력 조회
export const fetchProcessHistory = async (lineId?: number): Promise<ProcessHistoryItem[]> => {
    const response = await api.get('/api/process/lines/history', {
        params: lineId ? { lineId } : undefined,
    });
    return response.data.history;
};

//공정라인 등록
export const createProcessLine = async (formData: ProcessLineRequest) => {
    
    const response = await api.post('/api/process/lines', formData);
    return response.data;
};

// 공정라인 상태변경
export const updateLineStatus = async (id: number, status: string, reason?: string) => {
    const response = await api.patch(`/api/process/lines/${id}/status`, { status, reason });
    return response.data;
};



//품질검사 조회
export const getInspections =async(): Promise<InspectionItem[]>=>{
    const response = await api.get('/api/quality/inspections')

    return response.data.inspections;
}

//품질검사 등록
export const createInspection =async(formData:InspectionRequest)=>{
    const response = await api.post('/api/quality/inspections', formData)

    return response.data;
}

//생산실적조회
export const getProductionRecord =async(): Promise<ProductionRecord[]>=>{

    const response = await api.get('/api/analytics/records')
    return response.data.records;
}

//생산실적 등록
export const createProductionRecord =async(formData:ProductionRecordRequest)=>{
    const response = await api.post('/api/analytics/records', formData)

    return response.data;
}

//클린룸 설비 조회
export const getEquipments =async():Promise<EquipmentItem[]>=>{
    const response = await api.get('/api/equipment/status')

    return response.data.equipments;
}

//클린룸 설비 등록
export const createEquipment =async(formData:EquipmentRequest)=>{
    const response = await api.post('/api/equipment/status', formData)

    return response.data;
}
//클린룸 status 변경
export const updateEquipmentStatus = async(id:number, status: string)=>{
    const response = await api.patch(`/api/equipment/status/${id}`, {status})

    return response.data;
}

//SCM부품 조회
export const getSCMComponents =async():Promise<ComponentItem[]>=>{
    const response = await api.get('/api/scm/components')

    return response.data.components;
}

export const createSCMComponent = async (formData: ComponentRequest) => {
    
    const response = await api.post('/api/scm/components', formData);
    return response.data;
};

