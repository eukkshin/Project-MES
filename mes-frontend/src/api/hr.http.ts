import { api } from "@/lib/axios";

import type { Employee, EmployeeDirectory } from "@/types/hr";

export const getEmployees = async(): Promise<Employee[]>=>{
    const response = await api.get('/api/admin/employees');
    return response.data.employees;
}

export const updateEmployee = async({
    id, 
    data
}:{id:string, data:Partial<Employee>}):Promise<Employee>=>{
    const response = await api.patch(`/api/admin/employees/${id}`, data);
    return response.data.employee;
}

export const getEmployeeDirectory = async():Promise<EmployeeDirectory[]>=>{
    const response = await api.get('/api/employees/directory');
    return response.data.directory;
}




