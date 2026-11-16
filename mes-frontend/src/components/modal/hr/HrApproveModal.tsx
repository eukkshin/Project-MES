"use client";

import { useState, useEffect } from "react";
import { POSITION_OPTIONS, DEPARTMENT_OPTIONS } from "@/types/hr";
import type {
  EmployeeRole,
  EmployeePosition,
  EmployeeDepartment,
  PendingUser,
  ApproveUserRequest,
} from "@/types/hr";
import { FaXmark, FaCheck } from "react-icons/fa6";
import * as S from "@/assets/css/components/modal/HrEditModal.style";

interface HrApproveModalProps {
  user: PendingUser | null;
  isSubmitting: boolean;
  onClose: () => void;
  onApprove: (userId: number, payload: ApproveUserRequest) => void;
}

export default function HrApproveModal({
  user,
  isSubmitting,
  onClose,
  onApprove,
}: HrApproveModalProps) {
  const today = new Date().toISOString().split("T")[0];

  const [department, setDepartment] =
    useState<EmployeeDepartment>(DEPARTMENT_OPTIONS[0]);
  const [position, setPosition] =
    useState<EmployeePosition>(POSITION_OPTIONS[0]);
  const [role, setRole] = useState<EmployeeRole>("EMPLOYEE");
  const [joinDate, setJoinDate] = useState(today);

  useEffect(() => {
    if (!user) return;

    const matchedPosition = POSITION_OPTIONS.find(
      (opt) => opt === user.position,
    );
    setDepartment(DEPARTMENT_OPTIONS[0]); // "경영지원팀"
    setPosition(matchedPosition ?? POSITION_OPTIONS[0]); // 일치 항목 없으면 "사원"
    setRole("EMPLOYEE");
    setJoinDate(new Date().toISOString().split("T")[0]);
  }, [user]);

  if (!user) return null;

  const handleSubmit = () => {
    onApprove(user.id, {
      department,
      position,
      role,
      joinDate,
    });
  };

  return (
    <S.HRModalBackdrop onClick={onClose}>
      <S.HRModalContainer onClick={(e) => e.stopPropagation()}>
        <S.HRModalHeader>
          <h2>회원가입 승인 및 직원 등록</h2>
          <S.HRModalClose type="button" onClick={onClose} aria-label="닫기">
            <FaXmark />
          </S.HRModalClose>
        </S.HRModalHeader>

        <S.HRModalBody>
          <S.HRModalHint>
            {user.name} · {user.email}
            <br />
            승인 시 사원번호가 자동 발급되며 직원 목록에 등록됩니다.
          </S.HRModalHint>

          <S.HRFormGroup>
            <label>배정 부서</label>
            <select
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value as EmployeeDepartment)
              }
            >
              {DEPARTMENT_OPTIONS.map((depart) => (
                <option value={depart} key={depart}>
                  {depart}
                </option>
              ))}
            </select>
          </S.HRFormGroup>

          <S.HRFormGroup>
            <label>직급 / 직책</label>
            <select
              value={position}
              onChange={(e) =>
                setPosition(e.target.value as EmployeePosition)
              }
            >
              {POSITION_OPTIONS.map((pos) => (
                <option value={pos} key={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </S.HRFormGroup>

          <S.HRFormGroup>
            <label>계정 권한</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as EmployeeRole)}
            >
              <option value="EMPLOYEE">일반 직원</option>
              <option value="ADMIN">관리자</option>
            </select>
          </S.HRFormGroup>

          <S.HRFormGroup>
            <label>입사일</label>
            <input
              type="date"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
            />
          </S.HRFormGroup>
        </S.HRModalBody>

        <S.HRModalFooter>
          <S.HRModalButton
            type="button"
            $variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            취소
          </S.HRModalButton>
          <S.HRModalButton
            type="button"
            $variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <FaCheck />
            {isSubmitting ? "처리 중..." : "승인 및 사번 발급"}
          </S.HRModalButton>
        </S.HRModalFooter>
      </S.HRModalContainer>
    </S.HRModalBackdrop>
  );
}