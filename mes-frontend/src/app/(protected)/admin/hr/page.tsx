"use client";

import { useMemo, useState, useEffect } from "react";
import {
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaUserXmark,
  FaMagnifyingGlass,
  FaEllipsisVertical,
  FaShieldHalved,
  FaBriefcase,
  FaUserPen,
  FaBan,
  FaXmark,
  FaCheck,
  FaRotate,
  FaBuilding,
  FaArrowRotateRight,
  FaUserGear,
  FaUserShield,
} from "react-icons/fa6";

import { createPortal } from "react-dom";
import * as S from "@/assets/css/admin/Hr.styles";
import HrEditModal from "@/components/modal/hr/hrEditModal";

type EmployeeStatus = "active" | "leave" | "resigned";
export type EmployeeRole = "ADMIN" | "EMPLOYEE";

interface Employee {
  id: string;
  name: string;
  department: string;
  role: EmployeeRole;
  position: string;
  status: EmployeeStatus;
  joinDate: string;
  accountStatus: "ACTIVE" | "INACTIVE";
}

export type ModalType = "role" | "position" | "info" | "deactivate";

interface ModalState {
  type: ModalType;
  employeeId: string;
}

const initialEmployees: Employee[] = [
  {
    id: "E0001",
    name: "김민수",
    department: "개발팀",
    role: "ADMIN",
    position: "팀장",
    status: "active",
    joinDate: "2024-03-11",
    accountStatus: "ACTIVE",
  },
  {
    id: "E0002",
    name: "이서연",
    department: "디자인팀",
    role: "EMPLOYEE",
    position: "대리",
    status: "active",
    joinDate: "2024-06-17",
    accountStatus: "ACTIVE",
  },
  {
    id: "E0003",
    name: "박지훈",
    department: "개발팀",
    role: "EMPLOYEE",
    position: "과장",
    status: "leave",
    joinDate: "2023-01-09",
    accountStatus: "ACTIVE",
  },
  {
    id: "E0004",
    name: "최유진",
    department: "인사팀",
    role: "EMPLOYEE",
    position: "사원",
    status: "active",
    joinDate: "2025-02-03",
    accountStatus: "ACTIVE",
  },
  {
    id: "E0005",
    name: "정현우",
    department: "마케팅팀",
    role: "EMPLOYEE",
    position: "대리",
    status: "resigned",
    joinDate: "2022-08-22",
    accountStatus: "INACTIVE",
  },
];

const statusLabels: Record<EmployeeStatus, string> = {
  active: "재직",
  leave: "휴직",
  resigned: "퇴사",
};



export default function HRPage() {
  const [employees, setEmployees] = useState<Employee[]>(
    initialEmployees,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState | null>(null);

  // 모달 입력 상태
  const [editRole, setEditRole] = useState<EmployeeRole>("EMPLOYEE");
  const [editPosition, setEditPosition] = useState("");
  const [editName, setEditName] = useState("");
  const [editDepartment, setEditDepartment] = useState("");

  const selectedEmployee = employees.find(
    (employee) => employee.id === modal?.employeeId,
  );

  const [menuPosition, setMenuPosition] = useState<{
  top: number;
  right: number;
  } | null>(null);

  useEffect(() => {
  if (!openMenuId) return;

  const handleScroll = () => {
    setOpenMenuId(null);
  };

  window.addEventListener("scroll", handleScroll, true);

  return () => {
    window.removeEventListener("scroll", handleScroll, true);
  };
}, [openMenuId]);
  
  // 요약 데이터
  const summary = useMemo(
    () => ({
      total: employees.length,
      active: employees.filter((item) => item.status === "active").length,
      leave: employees.filter((item) => item.status === "leave").length,
      resigned: employees.filter((item) => item.status === "resigned").length,
    }),
    [employees],
  );

  // 부서 목록
  const departments = useMemo(
    () => [...new Set(employees.map((item) => item.department))],
    [employees],
  );

  // 검색 및 필터
  const filteredEmployees = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(keyword) ||
        employee.id.toLowerCase().includes(keyword) ||
        employee.department.toLowerCase().includes(keyword);

      const matchesDepartment =
        departmentFilter === "ALL" ||
        employee.department === departmentFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        employee.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, searchTerm, departmentFilter, statusFilter]);

  // 모달 열기
  const openEditModal = (type: ModalType, employee: Employee) => {
    setModal({
      type,
      employeeId: employee.id,
    });

    setOpenMenuId(null);

    setEditRole(employee.role);
    setEditPosition(employee.position);
    setEditName(employee.name);
    setEditDepartment(employee.department);
  };

  // 모달 닫기
  const closeModal = () => {
    setModal(null);
  };

  // 직원 정보 수정
  const handleSave = () => {
    if (!modal || !selectedEmployee) return;

    if (
      (modal.type === "info" &&
        (!editName.trim() || !editDepartment.trim())) ||
      (modal.type === "position" && !editPosition.trim())
    ) {
      return;
    }

    setEmployees((prev) =>
      prev.map((employee) => {
        if (employee.id !== modal.employeeId) return employee;

        switch (modal.type) {
          case "role":
            return {
              ...employee,
              role: editRole,
            };

          case "position":
            return {
              ...employee,
              position: editPosition.trim(),
            };

          case "info":
            return {
              ...employee,
              name: editName.trim(),
              department: editDepartment.trim(),
            };

          case "deactivate":
            return {
              ...employee,
              accountStatus:
                employee.accountStatus === "ACTIVE"
                  ? "INACTIVE"
                  : "ACTIVE",
            };

          default:
            return employee;
        }
      }),
    );

    closeModal();
  };

  const handleMenuAction = (type: ModalType, employee: Employee) => {
    openEditModal(type, employee);
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setDepartmentFilter("ALL");
    setStatusFilter("ALL");
    setOpenMenuId(null);
  };

  const toggleMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    employee: Employee,
  ) => {
    if (openMenuId === employee.id) {
      setOpenMenuId(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const MENU_HEIGHT = 180;

    // 버튼 아래 남은 공간 계산
    const spaceBelow = window.innerHeight - rect.bottom;

    const topPosition = spaceBelow < MENU_HEIGHT 
      ? rect.top - MENU_HEIGHT - 3  // 위로 띄울 때
      : rect.bottom + 3;            // 아래로 띄울 때

    setMenuPosition({
      top: topPosition,
      right: window.innerWidth - rect.right,
    });
    setOpenMenuId(employee.id);
  };

  return (
    <S.PageContainer>
      <S.PageHeader>
        <S.PageHeading>
          <S.Eyebrow>HUMAN RESOURCES MANAGEMENT</S.Eyebrow>
          <S.PageTitle>직원 관리</S.PageTitle>
          <S.PageDescription>
            직원 정보와 조직 권한 및 계정 상태를 관리합니다.
          </S.PageDescription>
        </S.PageHeading>

        <S.RefreshButton
          type="button"
          // onClick={() => void refetch()}
          // disabled={isLoading}
        >
          <FaArrowRotateRight />
          {/* {isLoading ? "조회 중..." : "새로고침"} */}
        </S.RefreshButton>
      </S.PageHeader>

      <S.HRSummaryGrid>
        <S.HRSummaryCard>
          <S.HRSummaryIcon $variant="blue">
            <FaUsers />
          </S.HRSummaryIcon>
          <S.HRSummaryContent>
            <span>전체 직원</span>
            <strong>{summary.total}</strong>
            <small>등록된 전체 직원</small>
          </S.HRSummaryContent>
        </S.HRSummaryCard>

        <S.HRSummaryCard>
          <S.HRSummaryIcon $variant="green">
            <FaUserCheck />
          </S.HRSummaryIcon>
          <S.HRSummaryContent>
            <span>재직 중</span>
            <strong>{summary.active}</strong>
            <small>현재 근무 중인 직원</small>
          </S.HRSummaryContent>
        </S.HRSummaryCard>

        <S.HRSummaryCard>
          <S.HRSummaryIcon $variant="orange">
            <FaUserClock />
          </S.HRSummaryIcon>
          <S.HRSummaryContent>
            <span>휴직</span>
            <strong>{summary.leave}</strong>
            <small>휴직 상태인 직원</small>
          </S.HRSummaryContent>
        </S.HRSummaryCard>

        <S.HRSummaryCard>
          <S.HRSummaryIcon $variant="gray">
            <FaUserXmark />
          </S.HRSummaryIcon>
          <S.HRSummaryContent>
            <span>퇴사</span>
            <strong>{summary.resigned}</strong>
            <small>퇴사 처리된 직원</small>
          </S.HRSummaryContent>
        </S.HRSummaryCard>
      </S.HRSummaryGrid>

      {/* 직원 목록 */}
      <S.Panel>
        <S.HRPanelHeader>
          <S.HRPanelTitle>
            <h2>전체 직원 목록</h2>
            <p>등록된 직원의 정보와 계정 상태를 확인합니다.</p>
          </S.HRPanelTitle>

          <S.HRItemCount>
            {filteredEmployees.length}명
          </S.HRItemCount>
        </S.HRPanelHeader>

        {/* 검색 및 필터 */}
        <S.HRToolbar>
          <S.HRSearchWrapper>
            <FaMagnifyingGlass />
            <S.HRSearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="이름, 사번, 부서 검색"
            />
          </S.HRSearchWrapper>

          <S.HRFilterGroup>
            <S.HRFilterSelect
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="ALL">전체 부서</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </S.HRFilterSelect>

            <S.HRFilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">전체 상태</option>
              <option value="active">재직</option>
              <option value="leave">휴직</option>
              <option value="resigned">퇴사</option>
            </S.HRFilterSelect>

            <S.ResetButton
              type="button"
              onClick={handleRefresh}
              title="검색 및 필터 초기화"
            >
              <FaRotate />
            </S.ResetButton>
          </S.HRFilterGroup>
        </S.HRToolbar>

        {/* 직원 테이블 */}
        {filteredEmployees.length > 0 ? (
          <S.HRTableWrapper>
            <S.HRTable>
              <thead>
                <tr>
                  <th>직원 정보</th>
                  <th>사번</th>
                  <th>부서</th>
                  <th>직급 / 직책</th>
                  <th>재직 상태</th>
                  <th>입사일</th>
                  <th>관리</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <S.HREmployeeIdentity >
                        <S.HRAvatar $role={employee.role}>
                           {employee.role === "ADMIN" ? (
                              <FaUserShield />
                            ) : (
                              employee.name.charAt(0)
                            )}
                        </S.HRAvatar>

                        <div>
                          <strong>{employee.name}</strong> 
                        </div>
                      </S.HREmployeeIdentity>
                    </td>

                    <td>{employee.id}</td>
                    <td>{employee.department}</td>
                    <td>{employee.position || "-"}</td>

                    <td>
                      <S.HRStatusBadge $status={employee.status}>
                        {statusLabels[employee.status]}
                      </S.HRStatusBadge>
                    </td>

                    <td>{employee.joinDate}</td>

                    <td>
                      <S.HRMoreWrapper>
                        <S.HRMoreButton
                          type="button"
                          aria-label={`${employee.name} 관리 메뉴`}
                          onClick={(e) => toggleMenu(e, employee)}
                        >
                          <FaEllipsisVertical />
                        </S.HRMoreButton>

                        {openMenuId === employee.id && 
                         typeof document !== "undefined" && 
                        createPortal(
                          <S.HRMoreMenu style={{top:menuPosition?.top, right:menuPosition?.right}}>
                            <S.HRMenuItem
                              type="button"
                              onClick={() =>
                                handleMenuAction("role", employee)
                              }
                            >
                              <FaShieldHalved />
                              권한 변경
                            </S.HRMenuItem>

                            <S.HRMenuItem
                              type="button"
                              onClick={() =>
                                handleMenuAction("position", employee)
                              }
                            >
                              <FaBriefcase />
                              직급 / 직책 변경
                            </S.HRMenuItem>

                            <S.HRMenuItem
                              type="button"
                              onClick={() =>
                                handleMenuAction("info", employee)
                              }
                            >
                              <FaUserGear />
                              직원 정보 변경
                            </S.HRMenuItem>

                            <S.HRMenuItem
                              type="button"
                              $danger
                              onClick={() =>
                                handleMenuAction("deactivate", employee)
                              }
                            >
                              <FaBan />
                              {employee.accountStatus === "ACTIVE"
                                ? "계정 비활성화"
                                : "계정 활성화"}
                            </S.HRMenuItem>
                          </S.HRMoreMenu>
                        , document.getElementById('portal-root')!)}
                      </S.HRMoreWrapper>
                    </td>
                  </tr>
                ))}
              </tbody>
            </S.HRTable>
          </S.HRTableWrapper>
        ) : (
          <S.HREmptyState>
            <FaBuilding />
            <strong>검색 결과가 없습니다.</strong>
            <span>검색어나 필터 조건을 변경해 보세요.</span>
          </S.HREmptyState>
        )}
      </S.Panel>

      <HrEditModal
      modal={modal}
      selectedEmployee={selectedEmployee}
      closeModal={closeModal}
      editRole={editRole}
      setEditRole={setEditRole}
      editPosition={editPosition}
      setEditPosition={setEditPosition}
      editName={editName}
      setEditName={setEditName}
      editDepartment={editDepartment}
      setEditDepartment={setEditDepartment}
      handleSave={handleSave}
      />
    </S.PageContainer>
  );
}
