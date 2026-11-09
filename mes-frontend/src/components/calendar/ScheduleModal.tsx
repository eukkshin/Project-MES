"use client";

import React, { useCallback, useRef, useState } from "react";
import {
  FaBell,
  FaCalendarDay,
  FaCheck,
  FaCircleNotch,
  FaClock,
  FaPen,
  FaPlus,
  FaTrash,
  FaTriangleExclamation,
  FaUser,
  FaUsers,
  FaXmark,
} from "react-icons/fa6";

import type { ApiScheduleStatus, Schedule, ScheduleType } from "@/types/schedule";
import * as S from "@/assets/css/components/modal/ScheduleModal.styles";

import ModalLayout from "../modal/ModalLayout";
import { Select } from "@/ui/Select/Select";
import { useAlertStore } from "@/store/useAlertStore";
import { useCreatePublicSchedule, useCreateSchedule, useDeleteSchedule, useGetSchedules, useUpdateSchedule } from "@/hooks/useSchedule";
import EqualizerLoader from "@/ui/feedback/EqualizerLoading";
import { useAuthStore } from "@/store/useAuthStore";
import { createSchedule } from "@/api/schedule.http";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: number;
  month: number;
  selectedDate: number | null;
}

type ScheduleStatus = Schedule["status"];

const STATUS_OPTIONS: ScheduleStatus[] = ["대기", "진행", "완료"];

const hourOptions = Array.from({ length: 24 }, (_, i) => {
  const h = String(i).padStart(2, "0");

  return {
    label: `${h}시`,
    value: h,
  };
});

const minuteOptions = Array.from(
  { length: 12 },
  (_, i) => {
    const m = String(i * 5).padStart(2, "0");

    return {
      label: `${m}분`,
      value: m,
    };
  }
);

const toApiStatus = (status: Schedule['status'])=>{
  const statusMap = {
    대기: "PENDING",
    진행: "IN_PROGRESS",
    완료: "COMPLETED",
  } as const;

  return statusMap[status];
}

const toFrontendStatus = (status:ApiScheduleStatus) : Schedule['status'] =>{
  const statusMap: Record<ApiScheduleStatus, Schedule['status']> = {
    PENDING: "대기",
    IN_PROGRESS: "진행",
    COMPLETED: "완료",
  };
  return statusMap[status] ?? '대기';
}

export default function ScheduleModal({
  isOpen,
  onClose,
  year,
  month,
  selectedDate,
}: ScheduleModalProps) {

  //React Query
  const { data: scheduleData = [], isFetching , isError, error } = useGetSchedules();

  if(isError){
    console.error("일정 조회 실패", error);
  }

 
  const createMutation = useCreateSchedule();
  const createPublicMutation = useCreatePublicSchedule();
  const updateMutation = useUpdateSchedule();
  const deleteMutation = useDeleteSchedule();

  //zustand
  const { showAlert } =useAlertStore();
  const role = useAuthStore(state=> state.role);
  const isAdmin = role === 'ADMIN'

  const [scheduleType, setScheduleType] = useState<ScheduleType>("PERSONAL");

  const [formContent, setFormContent] = useState("");
  const [formStatus, setFormStatus] = useState<ScheduleStatus>("대기");

  const [hour, setHour]= useState("09")
  const [minute, setMinute] = useState("00");

  const [alarmEnabled, setAlarmEnabled] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const wheelCleanupRef = useRef<(() => void) | null>(null);

  //select용
  const [openSelectId, setOpenSelectId] = useState<string | null>(null);

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
  
  const schedules: Schedule[] = scheduleData.map((item)=>{

    const  [scheduleYear, scheduleMonth, scheduleDay]=
    item.scheduleDate.slice(0,10).split("-").map(Number);

    return{
      id: item.id,
      scheduleType: item.scheduleType,
      title: item.title ?? '',
      content: item.content,
      year: scheduleYear,
      month: scheduleMonth,
      date: scheduleDay,
      time: item.time,
      alarmEnabled:
      item.alarmEnabled ===  true ||
      item.alarmEnabled === 1 ||
      item.alarmEnabled === "1",
      status: toFrontendStatus(item.status),
      createdAt: item.createdAt.substring(0,10)
    }
  })
  
  if (selectedDate === null) return null;


  const formattedTime = `${hour}:${minute}`;

  const scheduleDate =
    `${year}-${String(month).padStart(2,"0")}-${String(selectedDate).padStart(2,'0')}`

  const formatDisplayTime = (time?: string|null)=>{
    if(!time) return "시간 미설정"

    const [savedHour, savedMinute] = time.split(":");
    
    const h = Number(savedHour);
    const ampm = h < 12 ? "AM" : "PM";
    const displayHour = h % 12 || 12;

    return `${ampm} ${displayHour} : ${savedMinute}`;
  }

  const filteredSchedules = schedules.filter(
    (schedule) => 
      schedule.year === year &&
      schedule.month === month &&
      schedule.date === selectedDate,
  );

  const resetForm = () => {
    setScheduleType('PERSONAL');
    setFormContent("");
    setFormStatus("대기");
    setHour("09");
    setMinute("00");
    setEditingId(null);
    setAlarmEnabled(false);
    setOpenSelectId(null);
  };

  const handleSave = async() => {
    const content = formContent.trim();

    if (!content) return;

    const requestData  ={
      scheduleType ,
      content,
      scheduleDate,  //2026-11-04
      time: scheduleType === "PERSONAL" && alarmEnabled 
        ? `${formattedTime}` 
        : null,
      alarmEnabled: scheduleType === "PERSONAL" && alarmEnabled,
      status: toApiStatus(formStatus),
    }
    
    try{
      if(editingId !== null){
        await updateMutation.mutateAsync({
          id: editingId, 
          data: requestData
        });

        showAlert("일정이 수정되었습니다.", "success");
      }else{

        if(scheduleType === 'PUBLIC'){
          await createPublicMutation.mutateAsync(requestData);
        }else{
          await createMutation.mutateAsync(requestData);
        }
        showAlert("일정이 등록되었습니다.", "success");
      }
      resetForm();

    } catch (error){
      console.error("일정 저장 실패:", error);
      showAlert("일정 저장에 실패했습니다.", "error");
    }
  };

  const handleEdit = (schedule: Schedule) => {
    setFormContent(schedule.content);
    setFormStatus(schedule.status);
    setEditingId(schedule.id);
    setAlarmEnabled(schedule.alarmEnabled ?? false);
    setScheduleType(schedule.scheduleType);
    const [savedHour, savedMinute] = (schedule.time || "09:00").split(":");
    setHour(savedHour);
    setMinute(savedMinute);
  };

  const handleDelete = async (id:number) => {

    try{
      await deleteMutation.mutateAsync(id);
      showAlert("일정이 삭제되었습니다.", "success");

      if (editingId === id) {
        resetForm();
      }
    }catch(error){
      console.error("일정 삭제 실패:", error);
      showAlert("일정 삭제에 실패했습니다.", "error");
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

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
                {editingId !== null ? (
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

              {editingId !== null && (
                <S.CancelEditButton type="button" onClick={resetForm}>
                  <FaXmark />
                  수정 취소
                </S.CancelEditButton>
              )}
            </S.SectionHeader>
            {isAdmin && (
            <S.ScheduleTypeSelector>
              <S.ScheduleTypeCard type="button" 
              $selected={scheduleType==='PERSONAL'}
              onClick={e=> setScheduleType('PERSONAL')}
              aria-pressed={scheduleType==='PERSONAL'}
              >
                <S.ScheduleTypeCardHeader>
                  <S.ScheduleTypeIcon $selected={scheduleType === "PERSONAL"}>
                    <FaUser />
                  </S.ScheduleTypeIcon>

                  <S.ScheduleTypeCheck $selected={scheduleType === "PERSONAL"}>
                    {scheduleType === "PERSONAL" && <FaCheck />}
                  </S.ScheduleTypeCheck>
                </S.ScheduleTypeCardHeader>
                
                <S.ScheduleTypeTitle $selected={scheduleType === "PERSONAL"}>
                  개인 일정
                </S.ScheduleTypeTitle>
                <S.ScheduleTypeDescription>
                  나만 관리하는 일정
                </S.ScheduleTypeDescription>
              </S.ScheduleTypeCard>

              <S.ScheduleTypeCard
                type="button"
                $selected={scheduleType === "PUBLIC"}
                onClick={() => setScheduleType("PUBLIC")}
                aria-pressed={scheduleType === "PUBLIC"}
              >
                <S.ScheduleTypeCardHeader>
                  <S.ScheduleTypeIcon $selected={scheduleType === "PUBLIC"}>
                    <FaUsers />
                  </S.ScheduleTypeIcon>

                  <S.ScheduleTypeCheck $selected={scheduleType === "PUBLIC"}>
                    {scheduleType === "PUBLIC" && <FaCheck />}
                  </S.ScheduleTypeCheck>
                </S.ScheduleTypeCardHeader>

                <S.ScheduleTypeTitle $selected={scheduleType === "PUBLIC"}>
                  전체 일정
                </S.ScheduleTypeTitle>

                <S.ScheduleTypeDescription>
                  모든 직원에게 공유되는 일정
                </S.ScheduleTypeDescription>
              </S.ScheduleTypeCard>
            </S.ScheduleTypeSelector>
            )}
            
            <S.TimeSelectorWrapper>
              <S.TimeLabel>
                <FaBell/>
                알람 시간 
              </S.TimeLabel>
              {scheduleType === 'PUBLIC' ? (
              <S.AlarmDescription>
                  전체 일정은 개인 알람을 설정할 수 없습니다.
              </S.AlarmDescription>
              ) : (
                !alarmEnabled ? (
                 <S.AlarmToggle>
                  <input
                    type="checkbox"
                    checked={alarmEnabled}
                    onChange={ (e)=>{
                      const enabled = e.target.checked;
                      setAlarmEnabled(enabled)
  
                      if(!enabled){
                        setOpenSelectId(null);
                      }
                    }}
                  />
                </S.AlarmToggle>
                ): (
                 <S.TimeSelectGroup>
                   <Select id="hour" options={hourOptions} 
                   openSelectId={openSelectId}  setOpenSelectId={setOpenSelectId}
                   value={hour} onChange={setHour} width="80px"
                   >
                     <Select.Toggle/>
                     <Select.Menu/>
                   </Select>
                   <S.TimeColon>:</S.TimeColon>
  
                   <Select id="minute" options={minuteOptions}
                   openSelectId={openSelectId} setOpenSelectId={setOpenSelectId}
                   value={minute} onChange={setMinute}  width="80px"
                   >
                     <Select.Toggle/>
                     <Select.Menu/>
                   </Select>
  
                    <S.AlarmToggle>
                      <input
                        type="checkbox"
                        checked={alarmEnabled}
                        onChange={ (e)=>{
                          const enabled = e.target.checked;
                          setAlarmEnabled(enabled)
  
                          if(!enabled){
                            setOpenSelectId(null);
                          }
                        }}
                      />
                    </S.AlarmToggle>
                 </S.TimeSelectGroup>
               )
              )}
            </S.TimeSelectorWrapper>

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
              disabled={!formContent.trim() || isSaving}
            > { isSaving ? (
              <>
              <FaCircleNotch className="spin"/>
              저장중...
              </>
            ) : editingId !== null ? (
              <>
              <FaCheck />
              수정 완료
              </>
            ) : (
              <>
              <FaPlus />
              일정 등록하기
              </>
             )}
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

            {isFetching ? (
              <EqualizerLoader/>
            ) : isError ? (
              <S.EmptyState>
                <S.EmptyIcon>
                  <FaTriangleExclamation />
                </S.EmptyIcon>
                <strong>일정을 불러오지 못했습니다.</strong>
                <span>잠시 후 다시 시도해 주세요.</span>
              </S.EmptyState>
            ) : (
              filteredSchedules.length === 0 ? (
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
                      $type={schedule.scheduleType}
                    >
                      <S.CardHeader>
                        <S.StatusBadge $status={schedule.status}>
                          <S.StatusDot />
                          {schedule.status}
                        </S.StatusBadge>
              
                       <S.AlarmTime $enabled={schedule.alarmEnabled}>
                        <FaBell size={10}/>
                        {schedule.alarmEnabled 
                        ? formatDisplayTime(schedule.time)
                        : "" }
                      </S.AlarmTime>
              
                      </S.CardHeader>
              
                      <S.ScheduleContent>{schedule.content}</S.ScheduleContent>
              
                      <S.CardFooter>
                        <S.CreatedAt>
                          {schedule.createdAt}
                        </S.CreatedAt>
              
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
                          disabled={isDeleting}
                          onClick={() => {
                            showAlert(
                              "선택한 일정을 삭제하시겠습니까?", "info", "일정 삭제",
                               () => handleDelete(schedule.id),
                            )
                          }}
                        >
                          <FaTrash />
                          {isDeleting ? "삭제중..." : "삭제"}
                        </S.CardAction>
                      </S.CardFooter>
                    </S.ScheduleCard>
                  ))}
                </S.ScheduleList>
              )
            )}
          </S.ListSection>
        </S.Container>
      </ModalLayout>
    </>
  );
}
