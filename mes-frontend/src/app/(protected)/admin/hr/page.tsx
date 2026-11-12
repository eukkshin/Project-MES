"use client";

import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import {
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaUserXmark,
  FaMagnifyingGlass,
  FaEllipsisVertical,
  FaShieldHalved,
  FaBriefcase,
  FaBan,
  FaRotate,
  FaBuilding,
  FaArrowRotateRight,
  FaUserShield,
  FaPenToSquare,
} from "react-icons/fa6";

import { createPortal } from "react-dom";
import * as S from "@/assets/css/admin/Hr.styles";
import HrEditModal from "@/components/modal/hr/HrEditModal";
import type { 
  ModalType,
  EmployeeStatus, 
  EmployeeRole, 
  Employee, 
  EmployeePosition,
  EmployeeDepartment
} from '@/types/hr';
import {DEPARTMENT_OPTIONS} from '@/types/hr';
import { useGetEmployees, useUpdateEmployee } from "@/hooks/useHr";
import EqualizerLoader from "@/ui/feedback/EqualizerLoading";
import CommonError from "@/components/common/CommonError";
import { useAlertStore } from "@/store/useAlertStore";

interface ModalState {
  type: ModalType;
  employeeId: string;
}

const actionLabels: Record<ModalType, string> = {
    role: "권한 변경",
    position: "직급 변경",
    info: "직원 정보 수정",
    status: "재직 상태 변경",
    deactivate: "계정 상태 변경",
  };

const statusLabels: Record<EmployeeStatus, string> = {
  active: "재직",
  leave: "휴직",
  resigned: "퇴사",
};

const STATUS_OPTIONS = [
  { value: "ALL", label: "전체 상태" },
  { value: "active", label: "재직" },
  { value: "leave", label: "휴직" },
  { value: "resigned", label: "퇴사" },
];

export default function HRPage() {
  
  const { data:employees=[], isLoading, isFetching, isError, error, refetch } = useGetEmployees();
  const showAlert = useAlertStore(state=>state.showAlert);
  const updateMutate = useUpdateEmployee();

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState | null>(null);

  // 모달 입력 상태
  const [editRole, setEditRole] = useState<EmployeeRole>("EMPLOYEE");
  const [editPosition, setEditPosition] = useState<EmployeePosition>("사원");
  const [editName, setEditName] = useState("");
  const [editDepartment, setEditDepartment] = useState<EmployeeDepartment>("생산관리팀");
  const [editStatus, setEditStatus] = useState<EmployeeStatus>("active");

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
    setEditStatus(employee.status);
  };

  // 모달 닫기
  const closeModal = () => {
    setModal(null);
  };

  // 직원 정보 수정
  const handleSave = () => {
    if (!modal || !selectedEmployee) return;

     if (modal.type === "info" &&
        (!editName.trim() || !editDepartment.trim())){
          showAlert("이름과 부서를 입력해 주세요.");
          return;
      } 

    let updateData: Partial<Employee>={};

    switch(modal.type){
      case 'role':
        updateData = {
          role: editRole,
        };
        break;
      case 'position':
        updateData = {
          position: editPosition,
        }
        break;
      case "info":
        updateData = {
          name: editName.trim(),
          department: editDepartment,
        };
        break;
      case 'status':
        updateData = {
          status: editStatus,
        }
        break;
      case 'deactivate':
        if (!selectedEmployee.accountStatus) {
        showAlert("연결된 계정이 없습니다.");
        return;
        }
        updateData = {
          accountStatus: 
          selectedEmployee?.accountStatus === 'ACTIVE' 
          ? 'INACTIVE'
          : 'ACTIVE' 
        }
        break;
    }

    updateMutate.mutate({
      id: selectedEmployee.id,
      data: updateData,
    },
    { 
       onSuccess: ()=>{
        closeModal();
        showAlert(`${selectedEmployee?.name}님의 ${actionLabels[modal.type]}이 완료하였습니다`, "success")
    }
    },)
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
    const MENU_HEIGHT = 200;

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

  if( isLoading ){
    return <EqualizerLoader message="직원 목록을 불러오는 중입니다"/>
  }

  if(isError){
    const errorMessage = axios.isAxiosError(error) 
    ? error.response?.data?.message 
    : undefined;

    return (
      <CommonError 
      message={errorMessage}
      reset={refetch}/>
    )
  }

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
          onClick={() => void refetch()}
          disabled={isFetching}
        >
          <FaArrowRotateRight />
          {isFetching ? "조회 중..." : "새로고침"}
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
              
              {DEPARTMENT_OPTIONS.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </S.HRFilterSelect>

            <S.HRFilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
            {STATUS_OPTIONS.map(opt=> (
              <option value={opt.value} key={opt.value}>{opt.label}</option>
            ))}
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
                    <td>{employee.position ?? "-"}</td>

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

                        {openMenuId === employee.id && menuPosition && 
                         typeof document !== "undefined" && 
                        createPortal(
                          <S.HRMoreMenu style={{top:menuPosition?.top, right:menuPosition?.right}}>
                            <S.HRMenuItem
                              type="button"
                              onClick={() =>
                                openEditModal("role", employee)
                              }
                            >
                              <FaShieldHalved />
                              권한 변경
                            </S.HRMenuItem>

                            <S.HRMenuItem
                              type="button"
                              onClick={() =>
                                openEditModal("position", employee)
                              }
                            >
                              <FaBriefcase />
                              직급 / 직책 변경
                            </S.HRMenuItem>

                             <S.HRMenuItem
                              type="button"
                              onClick={() =>
                                openEditModal("status", employee)
                              }
                            >
                              <FaUserCheck />
                              재직 상태 변경
                            </S.HRMenuItem>

                            <S.HRMenuItem
                              type="button"
                              onClick={() =>
                                openEditModal("info", employee)
                              }
                            >
                              <FaPenToSquare />
                              직원 정보 변경
                            </S.HRMenuItem>

                            <S.HRMenuItem
                              type="button"
                              $danger
                              onClick={() =>
                                openEditModal("deactivate", employee)
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
      editStatus={editStatus}
      setEditStatus={setEditStatus}
      handleSave={handleSave}
      />
    </S.PageContainer>
  );
}
