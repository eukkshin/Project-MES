import { api } from "@/lib/axios";

import type { ApproveUserRequest, Employee, EmployeeDirectory, PendingUser } from "@/types/hr";

export const getEmployees = async(): Promise<Employee[]>=>{
    const response = await api.get('/api/admin/employees');
    return response.data.employees;
}

export const updateEmployee = async({id, data}:{id:string, data:Partial<Employee>}):Promise<Employee>=>{
    const response = await api.patch(`/api/admin/employees/${id}`, data);
    return response.data.employee;
}

export const getEmployeeDirectory = async():Promise<EmployeeDirectory[]>=>{
    const response = await api.get('/api/employees/directory');
    return response.data.directory;
}

// 승인 대기자 목록 조회
export const getPendingUsers = async (): Promise<PendingUser[]> => {
  const response = await api.get("/api/admin/pending-users");
  return response.data.users;
};

//회원가입 승인 (자동 사번 발급 + Employee 생성)
export const updatePendingUser = async (userId: number,payload: ApproveUserRequest
) => {
  const response = await api.post(`/api/admin/pending-users/${userId}/approve`, payload);
     
  return response.data; 
};

// 회원가입 반려
export const rejectPendingUser = async (userId: number) => {
  const response = await api.patch(`/api/admin/pending-users/${userId}/reject`);
  return response.data; 
};