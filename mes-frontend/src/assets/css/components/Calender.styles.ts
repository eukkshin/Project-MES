import styled from "styled-components";

export const CalendarContainer = styled.div`
  display: flex;

  flex-direction: column;

  flex: 1;

  width: 100%;

  height: 100%;

  min-height: 0;

  min-width: 0;
`;

export const CalTopMargin = styled.div`
  width: 100%;

  margin-top: 0;
`;

export const CalendarWrapper = styled.section`
  width: 100%;

  overflow: hidden;

  background: #ffffff;

  border: 1px solid #e5eaf1;

  border-radius: 16px;

  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.035);
`;

export const CalendarTopBar = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  padding: 28px 30px;

  @media (max-width: 768px) {
    flex-direction: column;

    align-items: flex-start;

    padding: 22px 18px;
  }
`;

export const CalendarTitleGroup = styled.div`
  display: flex;

  align-items: flex-start;

  gap: 14px;
`;

export const CalendarIcon = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;

  width: 44px;

  height: 44px;

  background: #eff6ff;

  border-radius: 12px;

  color: #2563eb;

  font-size: 19px;
`;

export const CalendarEyebrow = styled.p`
  margin: 0 0 5px;

  color: #94a3b8;

  font-size: 10px;

  font-weight: 700;

  letter-spacing: 1.2px;
`;

export const CalendarTitle = styled.h2`
  margin: 0;

  color: #172033;

  font-size: 20px;

  font-weight: 800;

  letter-spacing: -0.6px;
`;

export const CalendarDescription = styled.p`
  margin: 8px 0 0;

  color: #94a3b8;

  font-size: 12px;

  line-height: 1.5;
`;

export const CalendarControls = styled.div`
  display: flex;

  align-items: center;

  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;

    justify-content: space-between;
  }
`;

export const TodayButton = styled.button`
  display: flex;

  align-items: center;

  justify-content: center;

  height: 36px;

  padding: 0 16px;

  background: #ffffff;

  border: 1px solid #e2e8f0;

  border-radius: 8px;

  color: #475569;

  font-size: 12px;

  font-weight: 700;

  font-family: inherit;

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    background: #eff6ff;

    border-color: #bfdbfe;

    color: #2563eb;
  }
`;

export const MonthNavigation = styled.div`
  display: flex;

  align-items: center;

  gap: 10px;
`;

export const MonthArrowButton = styled.button`
  display: flex;

  align-items: center;

  justify-content: center;

  width: 36px;

  height: 36px;

  background: #ffffff;

  border: 1px solid #e2e8f0;

  border-radius: 8px;

  color: #64748b;

  font-size: 12px;

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;

    border-color: #cbd5e1;

    color: #2563eb;
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const MonthLabel = styled.span`
  min-width: 116px;

  text-align: center;

  color: #172033;

  font-size: 15px;

  font-weight: 800;

  letter-spacing: -0.4px;

  @media (max-width: 480px) {
    min-width: 100px;

    font-size: 14px;
  }
`;

export const CalendarSummary = styled.div`
  display: flex;

  align-items: center;

  flex-wrap: wrap;

  gap: 22px;

  padding: 15px 30px;

  background: #fafbfd;

  border-top: 1px solid #edf0f5;

  border-bottom: 1px solid #edf0f5;

  @media (max-width: 768px) {
    gap: 12px 18px;

    padding: 14px 18px;
  }
`;

export const CalendarSummaryItem = styled.div`
  display: flex;

  align-items: center;

  gap: 8px;

  color: #64748b;

  font-size: 12px;

  font-weight: 500;
`;

export const SummaryDot = styled.span<{ $color: string }>`
  width: 8px;

  height: 8px;

  border-radius: 50%;

  background: ${({ $color }) => $color};
`;

export const ScheduleCount = styled.div`
  margin-left: auto;

  color: #94a3b8;

  font-size: 12px;

  strong {
    margin-left: 5px;

    color: #2563eb;

    font-weight: 800;
  }

  @media (max-width: 768px) {
    width: 100%;

    margin-left: 0;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(7, minmax(0, 1fr));

  /* 泥??됱? ?붿씪 ?ㅻ뜑, ?댄썑 ?됱? ?좎쭨 二쇱감 */
  grid-template-rows: 52px;
  grid-auto-rows: minmax(0, 1fr);

  flex: 1;

  min-height: 0;

  width: 100%;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-rows: 42px;
    min-height: 360px;
  }
`;

export const DayName = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  height: 52px;

  color: #64748b;

  font-size: 12px;

  font-weight: 700;

  &:nth-child(7n + 1) {
    color: #ef4444;
  }

  &:nth-child(7n) {
    color: #3b82f6;
  }

  @media (max-width: 768px) {
    height: 42px;

    font-size: 11px;
  }
`;

interface DayCellProps {
  $isToday?: boolean;

  $isHoliday?: boolean;

  $isSunday?: boolean;

  $isSaturday?: boolean;

  $isOutside?: boolean;
}

export const DayCell = styled.button<DayCellProps>`
  position: relative;

  display: flex;

  flex-direction: column;

  align-items: flex-start;

  gap: 8px;

  min-width: 0;

  min-height: 0;

  height: 100%;

  padding: 9px 10px;

  border: 1px solid #edf0f5;

  border-radius: 0;

  background: ${({ $isOutside, $isToday }) => {
    if ($isOutside) return "#fafbfd";

    if ($isToday) return "#f4f8ff";

    return "#ffffff";
  }};

  color: ${({ $isOutside, $isHoliday, $isSunday, $isSaturday }) => {
    if ($isOutside) return "#cbd5e1";

    if ($isHoliday || $isSunday) return "#ef4444";

    if ($isSaturday) return "#3b82f6";

    return "#334155";
  }};

  text-align: left;

  font-family: inherit;

  cursor: pointer;

  transition:
    background 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    background: ${({ $isOutside }) => ($isOutside ? "#f1f5f9" : "#eff6ff")};

    box-shadow: inset 0 0 0 1px #bfdbfe;

    z-index: 1;
  }

  &:focus-visible {
    outline: 2px solid #2563eb;

    outline-offset: -2px;

    z-index: 2;
  }

  @media (max-width: 1400px) {
    min-height: 68px;

    padding: 8px;
  }

  @media (max-width: 768px) {
    min-height: 60px;

    padding: 6px;
  }
`;

export const DayCellTop = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 4px;

  width: 100%;
`;

export const DayNumber = styled.span<{ $isToday?: boolean }>`
  display: flex;

  align-items: center;

  justify-content: center;

  width: 29px;

  height: 29px;

  flex-shrink: 0;

  border-radius: 9px;

  background: ${({ $isToday }) => ($isToday ? "#2563eb" : "transparent")};

  color: ${({ $isToday }) => ($isToday ? "#ffffff" : "inherit")};

  font-size: 13px;

  font-weight: ${({ $isToday }) => ($isToday ? 800 : 600)};

  @media (max-width: 480px) {
    width: 24px;

    height: 24px;

    font-size: 11px;
  }
`;

export const DayScheduleCount = styled.span`
  padding: 4px 6px;

  border-radius: 5px;

  background: #ecfdf5;

  color: #059669;

  font-size: 10px;

  font-weight: 700;

  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const HolidayLabel = styled.span`
  display: block;

  max-width: 100%;

  padding: 5px 7px;

  border-radius: 5px;

  background: #fef2f2;

  color: #ef4444;

  font-size: 10px;

  font-weight: 600;

  overflow: hidden;

  white-space: nowrap;

  text-overflow: ellipsis;

  @media (max-width: 480px) {
    padding: 3px;

    font-size: 9px;
  }
`;

export const SchedulePreview = styled.div`
  display: flex;

  align-items: center;

  gap: 6px;

  width: 100%;

  min-width: 0;

  padding: 6px 7px;

  border-radius: 5px;

  background: #eff6ff;

  color: #2563eb;

  font-size: 10px;

  font-weight: 600;

  span {
    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;
  }

  @media (max-width: 768px) {
    padding: 4px;

    font-size: 9px;
  }

  @media (max-width: 480px) {
    span {
      display: none;
    }
  }
`;

export const SchedulePreviewDot = styled.span`
  width: 6px;

  height: 6px;

  flex-shrink: 0;

  border-radius: 50%;

  background: #2563eb;
`;

export const DayAddIcon = styled.span`
  position: absolute;

  right: 10px;

  bottom: 10px;

  display: flex;

  align-items: center;

  justify-content: center;

  width: 22px;

  height: 22px;

  border-radius: 6px;

  background: #2563eb;

  color: #ffffff;

  font-size: 10px;

  opacity: 0;

  transform: translateY(3px);

  transition: all 0.2s ease;

  ${DayCell}:hover & {
    opacity: 1;

    transform: translateY(0);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const CalendarBottomBar = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 12px;

  padding: 16px 30px;

  border-top: 1px solid #edf0f5;

  color: #94a3b8;

  font-size: 11px;

  @media (max-width: 768px) {
    padding: 14px 18px;

    font-size: 10px;
  }
`;
