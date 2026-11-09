'use client';

import type { EmployeeRole, ModalType } from "@/app/(protected)/admin/hr/page";
// import * as S from "@/assets/css/admin/Hr.styles";
import { FaXmark, FaCheck } from "react-icons/fa6";
import * as S from './style'

interface EmployeeEditModalProps {
  modal: { type: ModalType } | null;
  selectedEmployee: {
    id: string;
    name: string;
    accountStatus: "ACTIVE" | "INACTIVE";
  } | undefined ;
  closeModal: () => void;
  editRole: EmployeeRole;
  setEditRole: (val: EmployeeRole) => void;
  editPosition: string;
  setEditPosition: (val: string) => void;
  editName: string;
  setEditName: (val: string) => void;
  editDepartment: string;
  setEditDepartment: (val: string) => void;
  handleSave: () => void;
}

const modalTitles: Record<ModalType, string> = {
  role: "권한 변경",
  position: "직급 / 직책 변경",
  info: "직원 정보 변경",
  deactivate: "계정 비활성화",
};

export default function HrEditModal({
  modal,
  selectedEmployee,
  closeModal,
  editRole,
  setEditRole,
  editPosition,
  setEditPosition,
  editName,
  setEditName,
  editDepartment,
  setEditDepartment,
  handleSave,
}: EmployeeEditModalProps) {

  if (!modal || !selectedEmployee) return null;

  // 타입에 따른 동적 폼 렌더링
  const renderContent = () => {
    switch (modal.type) {
      case "role":
        return (
          <S.HRFormGroup>
            <label>계정 권한</label>
            <select
              value={editRole}
              onChange={(e) => setEditRole(e.target.value as EmployeeRole)}
            >
              <option value="EMPLOYEE">일반 직원</option>
              <option value="ADMIN">관리자</option>
            </select>
          </S.HRFormGroup>
        );

      case "position":
        return (
          <S.HRFormGroup>
            <label>직급 / 직책</label>
                <select
                value={editPosition}
                onChange={(e) => setEditPosition(e.target.value)}
            >
                <option value="사원">사원</option>
                <option value="주임">주임</option>
                <option value="대리">대리</option>
                <option value="과장">과장</option>
                <option value="차장">차장</option>
                <option value="부장">부장</option>
                <option value="팀장">팀장</option>
                <option value="실장">실장</option>
                </select>
          </S.HRFormGroup>
        );

      case "info":
        return (
          <>
            <S.HRFormGroup>
              <label>이름</label>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                maxLength={50}
              />
            </S.HRFormGroup>
            <S.HRFormGroup>
              <label>부서</label>
              <input
                value={editDepartment}
                onChange={(e) => setEditDepartment(e.target.value)}
                maxLength={50}
              />
            </S.HRFormGroup>
          </>
        );

      case "deactivate":
        return (
          <S.HRModalHint>
            {selectedEmployee.accountStatus === "ACTIVE"
              ? "이 계정의 로그인을 비활성화하시겠습니까? 직원 정보는 유지됩니다."
              : "이 계정을 다시 활성화하시겠습니까?"}
          </S.HRModalHint>
        );

      default:
        return null;
    }
  };

  const isDanger =
    modal.type === "deactivate" && selectedEmployee.accountStatus === "ACTIVE";

  return (
    <S.HRModalBackdrop onClick={closeModal}>
      <S.HRModalContainer onClick={(e) => e.stopPropagation()}>
        <S.HRModalHeader>
          <h2>{modalTitles[modal.type]}</h2>
          <S.HRModalClose type="button" onClick={closeModal} aria-label="닫기">
            <FaXmark />
          </S.HRModalClose>
        </S.HRModalHeader>

        <S.HRModalBody>
          <S.HRModalHint>
            {selectedEmployee.name} · {selectedEmployee.id}
          </S.HRModalHint>

          {renderContent()}
        </S.HRModalBody>

        <S.HRModalFooter>
          <S.HRModalButton type="button" $variant="secondary" onClick={closeModal}>
            취소
          </S.HRModalButton>
          <S.HRModalButton
            type="button"
            $variant={isDanger ? "danger" : "primary"}
            onClick={handleSave}
          >
            <FaCheck />
            {modal.type === "deactivate"
              ? selectedEmployee.accountStatus === "ACTIVE"
                ? "비활성화"
                : "활성화"
              : "변경 저장"}
          </S.HRModalButton>
        </S.HRModalFooter>
      </S.HRModalContainer>
    </S.HRModalBackdrop>
  );
}