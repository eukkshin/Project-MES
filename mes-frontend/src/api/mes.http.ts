import { api } from "@/lib/axios";
import type { ProcessLine,ProcessHistoryItem, ProcessLineRequest } from "@/types/process";

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


//SCM부품 조회
export const fetchComponents =async()=>{
    const response = await api.get('/api/scm/components')

    return response.data;
}

export const createComponent = async (formData: any) => {
    
    const response = await api.post('/api/scm/components', formData);
    return response.data;
};

//품질검사 조회
export const fetchInspection =async()=>{
    const response = await api.get('/api/quality/inspections')

    return response.data;
}

//품질검사 등록
export const createInspection =async(formData:any)=>{
    const response = await api.post('/api/quality/inspections', formData)

    return response.data;
}

//클린룸 설비 조회
export const fetchEquipment =async()=>{
    const response = await api.get('/api/equipment/status')

    return response.data;
}

//클린룸 설비 등록
export const createEquipment =async(formData:any)=>{
    const response = await api.post('/api/equipment/status', formData)

    return response.data;
}
//클린룸 status 변경
export const updateEquipmentStatus = async(id:number|string, status:any)=>{
    const response = await api.patch(`/api/equipment/status/${id}`, status)

    return response.data;
}

//생산실적조회

export const fetchRecords  =async()=>{

    const response = await api.get('/api/analytics/records')

    return response.data;
}

//생산실적 등록
export const createRecords =async(formData:any)=>{
    const response = await api.post('/api/analytics/records', formData)

    return response.data;
}
