"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FaCalendarDay,
  FaCheck,
  FaClock,
  FaPen,
  FaPlus,
  FaTrash,
  FaXmark,
} from "react-icons/fa6";

import * as S from "@/assets/css/components/modal/ScheduleModal.styles";
import AlertModal from "@/components/modal/AlertModal";
import { Temporal } from "@js-temporal/polyfill";

import ModalLayout from "./ModalLayout";

export interface Schedule {
  id: string;
  date: number;
  content: string;
  status: "대기" | "진행" | "완료";
  createdAt: string;
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  month: number;
  selectedDate: number | null;
  schedules: Schedule[];
  setSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>;
}

type ScheduleStatus = Schedule["status"];

const STATUS_OPTIONS: ScheduleStatus[] = ["대기", "진행", "완료"];

export default function ScheduleModal({
  isOpen,
  onClose,
  month,
  selectedDate,
  schedules,
  setSchedules,
}: ScheduleModalProps) {
  const [formContent, setFormContent] = useState("");
  const [formStatus, setFormStatus] = useState<ScheduleStatus>("대기");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const wheelCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormContent("");
      setFormStatus("대기");
      setEditingId(null);
      setDeleteTargetId(null);
    }
  }, [isOpen, selectedDate]);

  const setScheduleListRef = useCallback((element: HTMLDivElement | null) => {
    // 이전 이벤트 제거
    wheelCleanupRef.current?.();
    wheelCleanupRef.current = null;

    if (!element) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;

      // 터치패드의 가로 이동은 기본 동작 유지
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        return;
      }

      if (event.deltaY === 0) return;

      const maxScrollLeft = element.scrollWidth - element.clientWidth;

      if (maxScrollLeft <= 0) return;

      const delta = event.deltaY;
      const current = element.scrollLeft;

      const next = Math.max(0, Math.min(maxScrollLeft, current + delta));

      // 가로로 이동할 공간이 남아 있는 경우
      if (Math.abs(next - current) > 0.5) {
        // 세로 스크롤 차단
        event.preventDefault();

        // 가로 스크롤만 실행
        element.scrollLeft = next;
      }

      // 가로 끝에 도달한 경우에는 preventDefault 하지 않음
      // → 모달의 세로 스크롤 정상 작동
    };

    element.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    wheelCleanupRef.current = () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, []);

  if (selectedDate === null) return null;

  const filteredSchedules = schedules.filter(
    (schedule) => schedule.date === selectedDate,
  );

  const resetForm = () => {
    setFormContent("");
    setFormStatus("대기");
    setEditingId(null);
  };

  const handleSave = () => {
    const content = formContent.trim();

    if (!content) return;

    const currentTime = Temporal.Now.plainTimeISO().toString().split(".")[0];

    if (editingId) {
      setSchedules((prev) =>
        prev.map((schedule) =>
          schedule.id === editingId
            ? {
                ...schedule,
                content,
                status: formStatus,
              }
            : schedule,
        ),
      );
    } else {
      setSchedules((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          date: selectedDate,
          content,
          status: formStatus,
          createdAt: currentTime,
        },
      ]);
    }

    resetForm();
  };

  const handleEdit = (schedule: Schedule) => {
    setFormContent(schedule.content);
    setFormStatus(schedule.status);
    setEditingId(schedule.id);
  };

  const handleDelete = () => {
    if (!deleteTargetId) return;

    setSchedules((prev) =>
      prev.filter((schedule) => schedule.id !== deleteTargetId),
    );

    if (editingId === deleteTargetId) {
      resetForm();
    }

    setDeleteTargetId(null);
  };

  return (
    <>
      <ModalLayout
        isOpen={isOpen}
        onClose={onClose}
        title={`${month}월 ${selectedDate}일 업무 일정`}
      >
        <S.Container>
          <S.DateInfo>
            <S.DateIcon>
              <FaCalendarDay />
            </S.DateIcon>

            <S.DateText>
              <strong>
                {month}월 {selectedDate}일
              </strong>
              <span>업무 일정을 등록하고 관리하세요.</span>
            </S.DateText>

            <S.ScheduleCount>{filteredSchedules.length}건</S.ScheduleCount>
          </S.DateInfo>

          <S.Section>
            <S.SectionHeader>
              <S.SectionTitle>
                {editingId ? (
                  <>
                    <FaPen />
                    일정 수정
                  </>
                ) : (
                  <>
                    <FaPlus />새 일정 등록
                  </>
                )}
              </S.SectionTitle>

              {editingId && (
                <S.CancelEditButton type="button" onClick={resetForm}>
                  <FaXmark />
                  수정 취소
                </S.CancelEditButton>
              )}
            </S.SectionHeader>

            <S.FormGroup>
              <S.Label>진행 상태</S.Label>

              <S.StatusSelector>
                {STATUS_OPTIONS.map((status) => (
                  <S.StatusOption
                    key={status}
                    type="button"
                    $status={status}
                    $selected={formStatus === status}
                    onClick={() => setFormStatus(status)}
                    aria-pressed={formStatus === status}
                  >
                    <S.StatusDot />
                    {status}
                  </S.StatusOption>
                ))}
              </S.StatusSelector>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="scheduleContent">업무 내용</S.Label>

              <S.TextArea
                id="scheduleContent"
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                placeholder="업무 일정을 입력해 주세요."
                maxLength={500}
              />

              <S.CharacterCount>{formContent.length} / 500</S.CharacterCount>
            </S.FormGroup>

            <S.SaveButton
              type="button"
              onClick={handleSave}
              disabled={!formContent.trim()}
            >
              {editingId ? <FaCheck /> : <FaPlus />}
              {editingId ? "수정 완료" : "일정 등록하기"}
            </S.SaveButton>
          </S.Section>

          <S.ListSection>
            <S.ListHeader>
              <S.SectionTitle>
                <FaClock />
                등록된 일정
              </S.SectionTitle>

              <S.ListCount>총 {filteredSchedules.length}건</S.ListCount>
            </S.ListHeader>

            {filteredSchedules.length === 0 ? (
              <S.EmptyState>
                <S.EmptyIcon>
                  <FaCalendarDay />
                </S.EmptyIcon>

                <strong>등록된 일정이 없습니다.</strong>
                <span>위 입력란에서 새로운 업무 일정을 등록해 보세요.</span>
              </S.EmptyState>
            ) : (
              <S.ScheduleList ref={setScheduleListRef}>
                {filteredSchedules.map((schedule) => (
                  <S.ScheduleCard
                    key={schedule.id}
                    $editing={editingId === schedule.id}
                  >
                    <S.CardHeader>
                      <S.StatusBadge $status={schedule.status}>
                        <S.StatusDot />
                        {schedule.status}
                      </S.StatusBadge>

                      <S.CreatedAt>
                        <FaClock />
                        {schedule.createdAt}
                      </S.CreatedAt>
                    </S.CardHeader>

                    <S.ScheduleContent>{schedule.content}</S.ScheduleContent>

                    <S.CardFooter>
                      <S.CardAction
                        type="button"
                        onClick={() => handleEdit(schedule)}
                      >
                        <FaPen />
                        수정
                      </S.CardAction>

                      <S.CardAction
                        type="button"
                        $danger
                        onClick={() => setDeleteTargetId(schedule.id)}
                      >
                        <FaTrash />
                        삭제
                      </S.CardAction>
                    </S.CardFooter>
                  </S.ScheduleCard>
                ))}
              </S.ScheduleList>
            )}
          </S.ListSection>
        </S.Container>
      </ModalLayout>

      <AlertModal
        isOpen={deleteTargetId !== null}
        title="일정 삭제"
        message="선택한 일정을 삭제하시겠습니까?"
        type="info"
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
