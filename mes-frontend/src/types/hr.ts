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

export const DEPARTMENT_OPTIONS = [
  "경영지원팀",
  "인사총무팀",
  "재무회계팀",
  "생산관리팀",
  "생산팀",
  "품질관리팀",
  "설비관리팀",
  "자재구매팀",
  "물류팀",
  "영업팀",
  "IT개발팀",
] as const;

export type EmployeeStatus = "active" | "leave" | "resigned";
export type EmployeeRole = "ADMIN" | "EMPLOYEE";
export type EmployeePosition = (typeof POSITION_OPTIONS)[number];
export type EmployeeDepartment= (typeof DEPARTMENT_OPTIONS)[number];
export type AccountStatus = "ACTIVE" | "INACTIVE";
export type ModalType = "role" | "position" | "info" | "deactivate" | "status";

export interface Employee {
  id: string;
  name: string;
  department: EmployeeDepartment;
  role: EmployeeRole;
  position: EmployeePosition;
  status: EmployeeStatus;
  joinDate: string;
  accountStatus: AccountStatus;
}

export interface EmployeeDirectory {
  id: string;
  name: string;
  department: EmployeeDepartment;
  role: "ADMIN" | "EMPLOYEE";
  position: EmployeePosition | null;
  email: string | null;
  status: "active" | "leave";
}




