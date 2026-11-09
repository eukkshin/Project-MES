"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowRightToBracket,
  FaArrowsTurnRight,
  FaArrowsUpDownLeftRight,
  FaCalendarDays,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaPlus,
  FaRightLong,
  FaUpRightFromSquare,
  FaUser,
  FaUsers,
  FaX,
  FaXbox,
  FaXmark,
} from "react-icons/fa6";

import { fetchHolidays } from "@/api/holidays";
import type { Holiday } from "@/types/holiday";
import type { ApiSchedule, ApiScheduleStatus, Schedule, ScheduleStatus } from "@/types/schedule";
import * as S from "@/assets/css/Style.style";
import { Temporal } from "@js-temporal/polyfill";

import ScheduleModal from "@/components/calendar/ScheduleModal";
import { useGetSchedules } from "@/hooks/useSchedule";


interface CalendarProps {
  year?: number;
  month?: number;
}

const statusMap: Record<ApiScheduleStatus, ScheduleStatus> = {
  PENDING: "대기",
  IN_PROGRESS: "진행",
  COMPLETED: "완료",
};

// API의 alarmEnabled 값을 boolean으로 변환
const isAlarmEnabled = (value: ApiSchedule["alarmEnabled"]) => {
  return value === true || value === 1 || value === "1" || value === "true";
};

export default function Calendar({ year, month }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = Temporal.Now.plainDateISO();

    return Temporal.PlainYearMonth.from({
      year: year ?? today.year,
      month: month ?? today.month,
    });
  });

  const { data:apiSchedules = [] } = useGetSchedules();

  const [holidays, setHolidays] = useState<Holiday[]>([]);

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const schedules: Schedule[] = useMemo(()=>{
    return apiSchedules.map((sch:ApiSchedule)=>{
      const [year,month,date] = sch.scheduleDate.split("-").map(Number);

      return {
        id: sch.id,
        scheduleType: sch.scheduleType,
        title: sch.title ?? undefined,
        content: sch.content,
        year,
        month,
        date,
        time: sch.time,
        alarmEnabled: isAlarmEnabled(sch.alarmEnabled),
        status: statusMap[sch.status],
        createdAt: sch.createdAt,
      };
    });
  }, [apiSchedules]);
  

  const currentYear = currentMonth.year;
  const currentMonthNumber = currentMonth.month;

  const today = Temporal.Now.plainDateISO();

  // // 외부에서 year, month props가 변경되면 달력도 변경
  // useEffect(() => {
  //   if (year === undefined && month === undefined) return;

  //   const now = Temporal.Now.plainDateISO();

  //   setCurrentMonth(
  //     Temporal.PlainYearMonth.from({
  //       year: year ?? now.year,
  //       month: month ?? now.month,
  //     }),
  //   );
  // }, [year, month]);

  useEffect(() => {
    let cancelled = false;

    fetchHolidays(currentYear, currentMonthNumber)
      .then((data) => {
        if (!cancelled) setHolidays(data);
      })
      .catch((error) => {
        console.error("공휴일 조회 실패:", error);
        if (!cancelled) setHolidays([]);
      });

    return () => {
      cancelled = true;
    };
  }, [currentYear, currentMonthNumber]);

  const moveMonth = (amount: number) => {
    setCurrentMonth((prev) => prev.add({ months: amount }));
    setSelectedDate(null);
  };

  const goToToday = () => {
    const now = Temporal.Now.plainDateISO();

    setCurrentMonth(
      Temporal.PlainYearMonth.from({
        year: now.year,
        month: now.month,
      }),
    );
  };

  const openSchedulePanel = (day: number) => {
    setSelectedDate(day);
    setIsPanelOpen(true);
  };

  const firstDay = currentMonth.toPlainDate({ day: 1 });

  // Temporal: 월요일=1, 일요일=7
  // 일요일부터 시작하도록 변환
  const firstDayIndex = firstDay.dayOfWeek % 7;

  // 달력 첫 칸에 표시할 날짜
  const gridStart = firstDay.subtract({
    days: firstDayIndex,
  });

  const calendarDays = Array.from({ length: 42 }, (_, index) =>
    gridStart.add({ days: index }),
  );

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  const scheduledDays = schedules.filter(
    (schedule) =>
      schedule.year === currentYear &&
      schedule.month === currentMonthNumber,
  ).length;

  const selectedSchedules = schedules
  .filter(
    (schedule) =>
      schedule.year === currentYear &&
      schedule.month === currentMonthNumber &&
      schedule.date === selectedDate
  )
  .sort((a, b) => {
    // 공용 일정 먼저
    if (a.scheduleType === "PUBLIC" && b.scheduleType !== "PUBLIC") {
      return -1;
    }

    if (a.scheduleType !== "PUBLIC" && b.scheduleType === "PUBLIC") {
      return 1;
    }
    // 같은 종류라면 시간순
    return (a.time ?? "").localeCompare(b.time ?? "");
  });

  return (
    <>
      <S.CalTopMargin>
        <S.CalendarContent>
          <S.CalendarMain>
            <S.CalendarWrapper>
              <S.CalendarTopBar>
                <S.CalendarTitleGroup>
                  <S.CalendarIcon>
                    <FaCalendarDays />
                  </S.CalendarIcon>

                  <div>
                    <S.CalendarEyebrow>SCHEDULE MANAGEMENT</S.CalendarEyebrow>

                    <S.CalendarTitle>일정 관리</S.CalendarTitle>

                    <S.CalendarDescription>
                      생산 일정과 주요 업무를 한눈에 확인하세요.
                    </S.CalendarDescription>
                  </div>
                </S.CalendarTitleGroup>

                <S.CalendarControls $isOpen={isPanelOpen}>
                  <S.TodayButton type="button" onClick={goToToday}>
                    오늘
                  </S.TodayButton>

                  <S.MonthNavigation>
                    <S.MonthArrowButton
                      type="button"
                      aria-label="이전 달"
                      onClick={() => moveMonth(-1)}
                    >
                      <FaChevronLeft />
                    </S.MonthArrowButton>

                    <S.MonthLabel>
                      {currentYear}년 {currentMonthNumber}월
                    </S.MonthLabel>

                    <S.MonthArrowButton
                      type="button"
                      aria-label="다음 달"
                      onClick={() => moveMonth(1)}
                    >
                      <FaChevronRight />
                    </S.MonthArrowButton>
                  </S.MonthNavigation>
                </S.CalendarControls>
              </S.CalendarTopBar>

              <S.CalendarSummary>
                <S.CalendarSummaryItem>
                  <S.SummaryDot $color="#2563eb" />
                  <span>오늘</span>
                </S.CalendarSummaryItem>

                <S.CalendarSummaryItem>
                  <S.SummaryDot $color="#ef4444" />
                  <span>공휴일</span>
                </S.CalendarSummaryItem>

                <S.CalendarSummaryItem>
                  <S.SummaryDot $color="#10b981" />
                  <span>등록된 일정</span>
                </S.CalendarSummaryItem>

                <S.CalendarSummaryItem>
                  <S.SummaryDot $color="#F59E0B" />
                  <span>전체 일정</span>
                </S.CalendarSummaryItem>

                <S.ScheduleCount>
                  이번 달 등록 일정 <strong>{scheduledDays}건</strong>
                </S.ScheduleCount>
              </S.CalendarSummary>

              <S.CalendarGrid>
                {weekdays.map((day) => (
                  <S.DayName key={day}>{day}</S.DayName>
                ))}

                {calendarDays.map((date, index) => {
                  const isCurrentMonth =
                    date.year === currentYear && date.month === currentMonthNumber;

                  const isToday = date.equals(today);
                  const isSunday = index % 7 === 0;
                  const isSaturday = index % 7 === 6;

                  const holiday = isCurrentMonth
                    ? holidays.find((h) => h.date === date.day)
                    : undefined;

                  const daySchedules = isCurrentMonth
                    ? schedules.filter((schedule) => 
                      schedule.year === date.year &&
                      schedule.month === date.month &&
                      schedule.date === date.day
                    )
                    : [];

                  const hasSchedule = daySchedules.length > 0;

                  const handleClick = () => {
                    if (!isCurrentMonth) {
                      const offset =
                        (date.year - currentYear) * 12 +
                        (date.month - currentMonthNumber);

                      moveMonth(offset);
                      return;
                    }

                    openSchedulePanel(date.day);
                  };

                  const sortedDaySchedules = [...daySchedules].sort((a,b)=>{
                    if(a.scheduleType === 'PUBLIC' && b.scheduleType !== 'PUBLIC'){
                      return -1;
                    }
                    if(a.scheduleType !== 'PUBLIC' && b.scheduleType === 'PUBLIC' ){
                      return 1;
                    }
                    return 0;
                  })

                  return (
                    <S.DayCell
                      key={date.toString()}
                      type="button"
                      $isToday={isToday}
                      $isHoliday={!!holiday}
                      $isSunday={isSunday}
                      $isSaturday={isSaturday}
                      $isOutside={!isCurrentMonth}
                      onClick={handleClick}
                      aria-label={`${date.toString()}${
                        holiday ? `, ${holiday.name}` : ""
                      }`}
                    >
                      <S.DayCellTop>
                        <S.DayNumber $isToday={isToday}>{date.day}</S.DayNumber>

                        {isCurrentMonth && hasSchedule && (
                          <S.DayScheduleCount>
                            {daySchedules.length}건
                          </S.DayScheduleCount>
                        )}
                      </S.DayCellTop>

                      {holiday && (
                        <S.HolidayLabel title={holiday.name}>
                          {holiday.name}
                        </S.HolidayLabel>
                      )}

                      {isCurrentMonth && daySchedules.length > 0 && (
                        <S.SchedulePreviewList>
                          {sortedDaySchedules.slice(0, 3).map((schedule) => (
                            <S.SchedulePreview
                              key={schedule.id}
                              $type={schedule.scheduleType}
                              title={schedule.title || schedule.content}
                            >
                              <S.SchedulePreviewDot $type={schedule.scheduleType} />
                              <span>{schedule.title || schedule.content}</span>
                            </S.SchedulePreview>
                          ))}

                          {daySchedules.length > 3 && (
                            <S.MoreScheduleCount>
                              +{daySchedules.length - 3}건 더보기
                            </S.MoreScheduleCount>
                          )}
                        </S.SchedulePreviewList>
                      )}
                      {isCurrentMonth && (
                        <S.DayAddIcon>
                          <FaPlus />
                        </S.DayAddIcon>
                      )}
                    </S.DayCell>
                  );
                })}
              </S.CalendarGrid>

              <S.CalendarBottomBar>
                <span>날짜를 클릭하면 일정을 확인하거나 등록할 수 있습니다.</span>
                <span>
                  {currentYear}.{String(currentMonthNumber).padStart(2, "0")}
                </span>
              </S.CalendarBottomBar>
            </S.CalendarWrapper>

          </S.CalendarMain>
          
          {/* 오른쪽 상세 패널 */}
          <S.ScheduleSidePanel $isOpen={isPanelOpen}>
            <S.SchedulePanelHeader>
              <S.SchedulePanelTitle>
                <small>SCHEDULE DETAILS</small>
                <h3>일정 상세</h3>
              </S.SchedulePanelTitle>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <S.HeaderExpandingButton type="button" onClick={() => setIsModalOpen(true)}>
                  <FaPlus size={12} />
                  <span>일정 추가</span>
                </S.HeaderExpandingButton>
                <S.SchedulePanelClose
                  type="button"
                  onClick={() => setIsPanelOpen(false)}
                  aria-label="일정 패널 닫기"
                >
                  <FaXmark size={12} />
                </S.SchedulePanelClose>
              </div>
            </S.SchedulePanelHeader>
           
            {selectedDate !== null && (
              <>
                <S.ScheduleDateSummary>
                  <span>선택한 날짜</span>
                  <div className="date-display">
                    <strong>{selectedDate}일</strong>
                  </div>
                </S.ScheduleDateSummary>

                <S.SchedulePanelList>
                  {selectedSchedules.length > 0 ? (
                    selectedSchedules.map((schedule) => (
                      <S.SchedulePanelCard
                        key={schedule.id}
                        $type={schedule.scheduleType}
                      >
                        <S.SchedulePanelCardTop>
                          <S.ScheduleTypeBadge $type={schedule.scheduleType}>
                            {schedule.scheduleType === "PUBLIC"
                              ? <><FaUsers/>전체 일정</>
                              :  <><FaUser/>개인 일정</>}
                          </S.ScheduleTypeBadge>

                          <S.SchedulePanelTime>
                            <FaClock/>
                            {schedule.alarmEnabled && schedule.time
                              ? schedule.time
                              : ""}
                          </S.SchedulePanelTime>
                        </S.SchedulePanelCardTop>

                        <S.SchedulePanelCardTitle>
                          {schedule.title || schedule.content}
                        </S.SchedulePanelCardTitle>

                        {schedule.title && (
                          <S.SchedulePanelCardContent>
                            {schedule.content}
                          </S.SchedulePanelCardContent>
                        )}
                      </S.SchedulePanelCard>
                    ))
                  ) : (
                    <S.ScheduleEmpty>
                      <FaCalendarDays />
                      <strong>등록된 일정이 없습니다.</strong>
                      <span>이 날짜에 새로운 일정을 추가해 보세요.</span>
                    </S.ScheduleEmpty>
                  )}
                </S.SchedulePanelList>
              </>
            )}
          </S.ScheduleSidePanel>

        </S.CalendarContent>
      </S.CalTopMargin>

      <ScheduleModal
        key={`${currentYear}-${currentMonthNumber}-${selectedDate}`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        year={currentYear}
        month={currentMonthNumber}
        selectedDate={selectedDate}
      />
    </>
  );
}
