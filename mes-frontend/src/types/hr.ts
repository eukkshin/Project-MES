export type EmployeeStatus = "active" | "leave" | "resigned";
export type EmployeeRole = "ADMIN" | "EMPLOYEE";
export type AccountStatus = "ACTIVE" | "INACTIVE";

export interface Employee {
  id: string;
  name: string;
  department: string;
  role: EmployeeRole;
  position: string;
  status: EmployeeStatus;
  joinDate: string;
  accountStatus: AccountStatus;
}

export interface EmployeeDirectory {
  id: string;
  name: string;
  department: string;
  position: string | null;
  email: string | null;
  status: "active" | "leave";
}