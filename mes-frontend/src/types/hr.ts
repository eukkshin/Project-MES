export const POSITION_OPTIONS = [
  "사원",
  "주임",
  "대리",
  "과장",
  "차장",
  "부장",
  "팀장",
  "실장",
] as const ;

export type EmployeeStatus = "active" | "leave" | "resigned";
export type EmployeeRole = "ADMIN" | "EMPLOYEE";
export type EmployeePosition = (typeof POSITION_OPTIONS)[number];
export type AccountStatus = "ACTIVE" | "INACTIVE";
export type ModalType = "role" | "position" | "info" | "deactivate" | "status";

export interface Employee {
  id: string;
  name: string;
  department: string;
  role: EmployeeRole;
  position: EmployeePosition;
  status: EmployeeStatus;
  joinDate: string;
  accountStatus: AccountStatus;
}

export interface EmployeeDirectory {
  id: string;
  name: string;
  department: string;
  position: EmployeePosition | null;
  email: string | null;
  status: "active" | "leave";
}




