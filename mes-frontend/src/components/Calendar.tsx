"use client";

import { useEffect, useState } from "react";
import {
  FaCalendarDays,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
} from "react-icons/fa6";

import { fetchHolidays } from "@/api/holidays";
import { Holiday } from "@/types/holiday";
import * as S from "@/assets/css/Style.style";
import { Temporal } from "@js-temporal/polyfill";

import ScheduleModal from "@/ui/modal/ScheduleModal";

interface Schedule {
  id: string;
  date: number;
  content: string;
  status: "대기" | "진행" | "완료";
  createdAt: string;
}

interface CalendarProps {
  year?: number;
  month?: number;
}

export default function Calendar({ year, month }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = Temporal.Now.plainDateISO();

    return Temporal.PlainYearMonth.from({
      year: year ?? today.year,
      month: month ?? today.month,
    });
  });

  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentYear = currentMonth.year;
  const currentMonthNumber = currentMonth.month;

  const today = Temporal.Now.plainDateISO();

  const isThisMonth =
    today.year === currentYear && today.month === currentMonthNumber;

  useEffect(() => {
    if (year === undefined && month === undefined) return;

    const now = Temporal.Now.plainDateISO();

    setCurrentMonth(
      Temporal.PlainYearMonth.from({
        year: year ?? now.year,
        month: month ?? now.month,
      }),
    );
  }, [year, month]);

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

  const openScheduleModal = (day: number) => {
    setSelectedDate(day);
    setIsModalOpen(true);
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
      schedule.date >= 1 && schedule.date <= currentMonth.daysInMonth,
  ).length;

  return (
    <>
      <S.CalTopMargin>
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

            <S.CalendarControls>
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
                ? schedules.filter((schedule) => schedule.date === date.day)
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

                openScheduleModal(date.day);
              };

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

                  {isCurrentMonth && hasSchedule && (
                    <S.SchedulePreview>
                      <S.SchedulePreviewDot />
                      <span>{daySchedules[0].content}</span>
                    </S.SchedulePreview>
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
      </S.CalTopMargin>

      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        month={currentMonthNumber}
        selectedDate={selectedDate}
        schedules={schedules}
        setSchedules={setSchedules}
      />
    </>
  );
}
