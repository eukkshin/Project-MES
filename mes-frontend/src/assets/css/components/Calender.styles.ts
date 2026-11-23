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

  border-radius: 16px;

  background: ${({ theme }) => theme.colors.bg.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  box-shadow: ${({ theme }) => theme.shadows.subtle};
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
  align-items: center;
  gap: 14px;
  min-width: 0;
`;

export const CalendarIcon = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;

  width: 44px;

  height: 44px;

  background: ${({ theme }) => theme.colors.primary.subtle};

  border-radius: 12px;

  color: ${({ theme }) => theme.colors.primary.default};

  font-size: 19px;

 border: ${({ theme }) =>
  theme?.mode === "light"
    ? "none"
    : `1px solid ${theme.colors.border.default}`
  };
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
  color: ${({ theme }) => theme.colors.text.primary};

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

export const CalendarControls = styled.div<{$isOpen:boolean}>`
  display: flex;
  align-items: center;
  gap: 12px;

  transition: opacity 0.25s ease, visibility 0.25s ease, transform 0.25s ease;

  @media (max-width: 1300px) {
    opacity: ${({ $isOpen }) => ($isOpen ? 0 : 1)};
    visibility: ${({ $isOpen }) => ($isOpen ? "hidden" : "visible")};
    pointer-events: ${({ $isOpen }) => ($isOpen ? "none" : "auto")};
    transform: ${({ $isOpen }) => ($isOpen ? "translateY(-4px)" : "translateY(0)")};
  }
  @media (max-width: 768px) {
    width: 100%;
    justify-content: ${({$isOpen})=> $isOpen ? 'flex-end': 'space-between'};
    display: ${({ $isOpen }) => ($isOpen ? "none" : "flex")};
  }
`;

export const TodayButton = styled.button`
  white-space: nowrap;
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
  
  background: ${({ theme }) => theme.colors.bg.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

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

  font-size: 12px;

  background: ${({ theme }) => theme.colors.bg.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    background: #eff6ff;

    border-color: #bfdbfe;

    color: #2563eb;
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const MonthLabel = styled.span`
  min-width: 116px;

  text-align: center;

  color: ${({ theme }) => theme.colors.text.primary};

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

  background: ${({ theme }) =>
    theme?.mode === "light" || !theme?.mode
      ? "#fafbfd"
      : theme?.colors?.bg?.surface ?? "#1e293b"};

  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};

  @media (max-width: 768px) {
    gap: 12px 18px;

    padding: 14px 18px;
  }
`;

export const CalendarSummaryItem = styled.div`
  display: flex;

  align-items: center;

  gap: 8px;

  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};

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

  color: ${({ theme }) => theme.colors.text.secondary};

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
  border: 1px solid ${({ theme }) => 
    theme.mode === 'light' || !theme?.mode
    ? '#edf0f5'
    : theme.colors.border.default ?? '#334155'};

  border-radius: 0;

  background: ${({ $isOutside, $isToday,theme }) => {
    if ($isOutside) {
      return theme?.mode === "light" || !theme?.mode
        ? "#fafbfd"
        : theme?.colors?.bg?.canvas ?? "#0f172a";
    }
    if ($isToday) return theme.colors.primary.subtle;
    return theme.colors.bg.surface;
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
    background: ${({ $isOutside }) => ($isOutside 
      ? "#f1f5f9" 
      : "#eff6ff")};
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

  background: ${({theme})=>
  theme?.mode === 'light' || !theme?.mode 
  ? "#ecfdf5"
  : "transparent"
};

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

  background: ${({theme})=>
  theme?.mode === 'light' || !theme?.mode 
  ? "#fef2f2"
  : "transparent"
};

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

// export const SchedulePreview = styled.div`
//   display: flex;

//   align-items: center;

//   gap: 6px;

//   width: 100%;

//   min-width: 0;

//   padding: 6px 7px;

//   border-radius: 5px;

//   background: #eff6ff;

//   color: #2563eb;

//   font-size: 10px;

//   font-weight: 600;

//   span {
//     overflow: hidden;

//     text-overflow: ellipsis;

//     white-space: nowrap;
//   }

//   @media (max-width: 768px) {
//     padding: 4px;

//     font-size: 9px;
//   }

//   @media (max-width: 480px) {
//     span {
//       display: none;
//     }
//   }
// `;

// export const SchedulePreviewDot = styled.span`
//   width: 6px;

//   height: 6px;

//   flex-shrink: 0;

//   border-radius: 50%;

//   background: #2563eb;
// `;

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

  border-top: 1px solid ${({ theme }) => theme.colors.border.default};

  color: #94a3b8;

  font-size: 11px;

  @media (max-width: 768px) {
    padding: 14px 18px;

    font-size: 10px;
  }
`;



export const SchedulePreviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  min-width: 0;
  overflow: hidden;
`;

export const SchedulePreview = styled.div<{ $type: string }>`
  display: flex;
  align-items: center;
  gap: 6px;

  width: 100%;
  min-width: 0;
  padding: 6px 7px;

  border-radius: 5px;

  background: ${({ $type }) =>
  $type === "PUBLIC" ? "#FFF0D9" : "#EFF6FF"};

  background: ${({ $type, theme }) => {
    const isLight = theme?.mode === "light" || !theme?.mode;
    if (!isLight) return "transparent";
    return $type === "PUBLIC" ? "#FFF0D9" : "#EFF6FF";
  }};

  color: ${({ $type }) =>
    $type === "PUBLIC" ? "#A84B00" : "#2563EB"};
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

export const SchedulePreviewDot = styled.span<{ $type: string }>`
  width: 6px;
  height: 6px;
  flex-shrink: 0;
  border-radius: 50%;

  background: ${({ $type }) =>
     $type === "PUBLIC" ? "#F59E0B" : "#2563EB"};
`;

export const MoreScheduleCount = styled.div`
  padding-left: 5px;
  color: #94A3B8;
  font-size: 10px;
`;

//========================================
// 달력 + 오른쪽 패널 전체 영역

export const CalendarContent = styled.div`
  display: flex;
  align-items: stretch;
  gap: 20px;
  width: 100%;
  min-width: 0;
  min-height: 0;
  position: relative;
`;

export const CalendarMain = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 0;
`;

const isLightMode = (theme?: { mode?: string }) =>
  theme?.mode === "light" || !theme?.mode;

/* ==========================================================================
   오른쪽 일정 사이드 패널 (Apple Style)
   ========================================================================== */

export const ScheduleSidePanel = styled.aside<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: ${({ $isOpen }) => ($isOpen ? "350px" : "0")};
  min-width: 0;
  overflow: hidden;

  background: ${({ theme }) =>
    isLightMode(theme)
      ? "rgba(248, 250, 252, 0.95)"
      : theme?.colors?.bg?.surface ?? "#1e293b"};
  backdrop-filter: blur(20px);
  border: ${({ $isOpen, theme }) =>
    !$isOpen
      ? "none"
      : isLightMode(theme)
        ? "1px solid #e2e8f0"
        : `1px solid ${theme?.colors?.border?.default ?? "#334155"}`};
  border-radius: 20px;
  box-shadow: ${({ $isOpen, theme }) =>
    !$isOpen
      ? "none"
      : isLightMode(theme)
        ? "0 10px 30px rgba(15, 23, 42, 0.06)"
        : theme?.shadows?.elevated ?? "0 4px 12px rgba(0, 0, 0, 0.5)"};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition:
    width 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.25s ease,
    box-shadow 0.35s ease;

  @media (max-width: 1100px) {
    position: absolute;
    z-index: 20;
    top: 0;
    right: 0;
    bottom: 0;
    width: ${({ $isOpen }) => ($isOpen ? "330px" : "0")};
  }
`;

export const SchedulePanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 24px 24px 16px;
  border-bottom: 1px solid
    ${({ theme }) =>
      isLightMode(theme)
        ? "#edf2f7"
        : theme?.colors?.border?.default ?? "#334155"};
`;

export const SchedulePanelTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  small {
    color: ${({ theme }) =>
      isLightMode(theme)
        ? "#94a3b8"
        : theme?.colors?.text?.disabled ?? "#64748b"};
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: ${({ theme }) =>
      isLightMode(theme)
        ? "#0f172a"
        : theme?.colors?.text?.primary ?? "#f8fafc"};
  }
`;

export const SchedulePanelClose = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) =>
    isLightMode(theme)
      ? "#f1f5f9"
      : theme?.colors?.bg?.elevated ?? "#334155"};
  color: ${({ theme }) =>
    isLightMode(theme)
      ? "#64748b"
      : theme?.colors?.text?.secondary ?? "#cbd5e1"};
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) =>
      isLightMode(theme)
        ? "#e2e8f0"
        : theme?.colors?.border?.input ?? "#475569"};
    color: ${({ theme }) =>
      isLightMode(theme)
        ? "#0f172a"
        : theme?.colors?.text?.primary ?? "#f8fafc"};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ScheduleDateSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 18px 24px;
  padding: 0 4px;
  background: transparent;
  border: none;
  box-shadow: none;

  span {
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) =>
      isLightMode(theme)
        ? "#64748b"
        : theme?.colors?.text?.secondary ?? "#cbd5e1"};
  }

  .date-display {
    display: flex;
    align-items: baseline;
    gap: 3px;

    strong {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: ${({ theme }) =>
        isLightMode(theme)
          ? "#2563eb"
          : theme?.colors?.primary?.default ?? "#66a3e0"};
    }

    small {
      font-size: 13px;
      font-weight: 600;
      color: ${({ theme }) =>
        isLightMode(theme)
          ? "#64748b"
          : theme?.colors?.text?.secondary ?? "#cbd5e1"};
    }
  }
`;

/* ==========================================================================
   일정 리스트 & 카드 영역
   ========================================================================== */

export const SchedulePanelList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 6px 20px 24px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      isLightMode(theme)
        ? "#cbd5e1"
        : theme?.colors?.border?.input ?? "#475569"};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const SchedulePanelCard = styled.div<{
  $type: "PUBLIC" | "PERSONAL" | "NOTICE";
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 16px 16px 28px;
  background: ${({ theme }) =>
    isLightMode(theme)
      ? "#fff"
      : theme?.colors?.bg?.elevated ?? "#334155"};
  border: ${({ theme }) =>
    isLightMode(theme)
      ? "1px solid transparent"
      : `1px solid ${theme?.colors?.border?.default ?? "#475569"}`};
  border-radius: 18px;
  box-shadow: ${({ theme }) =>
    isLightMode(theme)
      ? "0 4px 16px rgba(15, 23, 42, 0.03)"
      : theme?.shadows?.subtle ?? "0 2px 4px rgba(0, 0, 0, 0.4)"};
  overflow: hidden;
  cursor: pointer;

  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);

  &::before {
    content: "";
    position: absolute;
    top: 14px;
    left: 8px;
    bottom: 14px;
    width: 4px;
    border-radius: 9999px;
    background: ${({ $type, theme }) => {
      if (isLightMode(theme)) {
        return $type === "PUBLIC" ? "#f59e0b" : "#2563eb";
      }
      return $type === "PUBLIC"
        ? theme?.colors?.status?.warning?.text ?? "#fbbf24"
        : theme?.colors?.primary?.default ?? "#66a3e0";
    }};
    transition: all 0.25s ease;
  }

  &:hover {
    border-color: ${({ $type, theme }) => {
      if (isLightMode(theme)) {
        return $type === "PUBLIC" ? "#fde68a" : "#bfdbfe";
      }
      return $type === "PUBLIC"
        ? theme?.colors?.status?.warning?.border ?? "#fbbf24"
        : theme?.colors?.primary?.default ?? "#66a3e0";
    }};
    background: ${({ $type, theme }) => {
      if (isLightMode(theme)) {
        return $type === "PUBLIC" ? "#fffdfa" : "#fafcff";
      }
      return theme?.colors?.bg?.surface ?? "#1e293b";
    }};
    box-shadow: ${({ theme }) =>
      isLightMode(theme)
        ? "0 10px 25px rgba(15, 23, 42, 0.07)"
        : theme?.shadows?.elevated ?? "0 4px 12px rgba(0, 0, 0, 0.5)"};
    transform: translateY(-0.5px) scale(1.01);

    &::before {
      top: 10px;
      bottom: 10px;
      width: 5px;
    }
  }

  &:active {
    transform: scale(0.985);
  }
`;

export const SchedulePanelCardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

// 애플 캡슐 배지 (아이콘 + 텍스트 조합)
export const ScheduleTypeBadge = styled.span<{
  $type: "PUBLIC" | "PERSONAL" | "NOTICE";
}>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.3px;
  color: ${({ $type, theme }) => {
    if (isLightMode(theme)) {
      return $type === "PUBLIC" ? "#d97706" : "#2563eb";
    }
    return $type === "PUBLIC"
      ? theme?.colors?.status?.warning?.text ?? "#fbbf24"
      : theme?.colors?.primary?.default ?? "#66a3e0";
  }};
  background: ${({ $type, theme }) => {
    if (isLightMode(theme)) {
      return $type === "PUBLIC" ? "#fff8eb" : "#eff6ff";
    }
    return $type === "PUBLIC"
      ? theme?.colors?.status?.warning?.bg ?? "#431407"
      : theme?.colors?.primary?.subtle ?? "#1e293b";
  }};
  border: 1px solid
    ${({ $type, theme }) => {
      if (isLightMode(theme)) {
        return $type === "PUBLIC" ? "#fef3c7" : "#dbeafe";
      }
      return $type === "PUBLIC"
        ? theme?.colors?.status?.warning?.border ?? "#fbbf24"
        : theme?.colors?.border?.default ?? "#475569";
    }};

  svg {
    font-size: 10px;
  }
`;

// 시간 및 알람 표시 (아이콘 통합)
export const SchedulePanelTime = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) =>
    isLightMode(theme)
      ? "#94a3b8"
      : theme?.colors?.text?.secondary ?? "#cbd5e1"};

  svg {
    font-size: 11px;
    color: ${({ theme }) =>
      isLightMode(theme)
        ? "#cbd5e1"
        : theme?.colors?.text?.disabled ?? "#64748b"};
  }
`;

export const SchedulePanelCardTitle = styled.strong`
  font-size: 14.5px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.4px;
  color: ${({ theme }) =>
    isLightMode(theme)
      ? "#0f172a"
      : theme?.colors?.text?.primary ?? "#f8fafc"};
  word-break: break-word;
`;

export const SchedulePanelCardContent = styled.p`
  margin: 0;
  font-size: 12.5px;
  line-height: 1.55;
  color: ${({ theme }) =>
    isLightMode(theme)
      ? "#64748b"
      : theme?.colors?.text?.secondary ?? "#cbd5e1"};
  word-break: break-word;
`;

// 카드 하단 메타정보 / 버튼 구역 (선택사항)
export const SchedulePanelCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  padding-top: 8px;
  border-top: 1px dashed
    ${({ theme }) =>
      isLightMode(theme)
        ? "#f1f5f9"
        : theme?.colors?.border?.default ?? "#475569"};
`;

export const ScheduleEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 100px;
  padding-bottom: 30px;
  gap: 10px;
  color: ${({ theme }) =>
    isLightMode(theme)
      ? "#94a3b8"
      : theme?.colors?.text?.disabled ?? "#64748b"};
  text-align: center;

  svg {
    font-size: 32px;
    color: ${({ theme }) =>
      isLightMode(theme)
        ? "#cbd5e1"
        : theme?.colors?.border?.input ?? "#475569"};
    margin-bottom: 2px;
  }

  strong {
    font-size: 14.5px;
    font-weight: 700;
    color: ${({ theme }) =>
      isLightMode(theme)
        ? "#475569"
        : theme?.colors?.text?.secondary ?? "#cbd5e1"};
    letter-spacing: -0.3px;
  }

  span {
    font-size: 12px;
    color: ${({ theme }) =>
      isLightMode(theme)
        ? "#94a3b8"
        : theme?.colors?.text?.disabled ?? "#64748b"};
  }
`;

export const HeaderExpandingButton = styled.button`
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 32px;
  background: ${({ theme }) =>
    isLightMode(theme)
      ? "#eff6ff"
      : theme?.colors?.primary?.subtle ?? "#1e293b"};
  color: ${({ theme }) =>
    isLightMode(theme)
      ? "#2563eb"
      : theme?.colors?.primary?.default ?? "#66a3e0"};
  border: 1px solid
    ${({ theme }) =>
      isLightMode(theme)
        ? "#dbeafe"
        : theme?.colors?.border?.default ?? "#334155"};
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  width: 32px;
  padding: 0;
  justify-content: center;

  span {
    white-space: nowrap;
    font-size: 12px;
    font-weight: 700;
    opacity: 0;
    max-width: 0;
    transition: all 0.25s ease;
    margin-left: 0;
  }

  /* 호버 시 폭이 늘어나며 글자가 나타남 */
  &:hover {
    width: 88px;
    padding: 0 12px;
    background: ${({ theme }) =>
      isLightMode(theme)
        ? "#2563eb"
        : theme?.colors?.primary?.default ?? "#66a3e0"};
    color: ${({ theme }) =>
      isLightMode(theme)
        ? "#ffffff"
        : theme?.colors?.text?.inverse ?? "#0f172a"};
    border-color: ${({ theme }) =>
      isLightMode(theme)
        ? "#2563eb"
        : theme?.colors?.primary?.default ?? "#66a3e0"};
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);

    span {
      opacity: 1;
      max-width: 60px;
      margin-left: 5px;
    }
  }

  &:active {
    transform: scale(0.96);
  }
`;