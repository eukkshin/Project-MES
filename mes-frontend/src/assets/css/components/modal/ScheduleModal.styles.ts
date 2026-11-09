import styled from "styled-components";
import { Description } from "../../Style.style";

type ScheduleStatus = "대기" | "진행" | "완료";

const statusColors = {
  대기: {
    background: "#f1f5f9",
    color: "#64748b",
    border: "#cbd5e1",
  },
  진행: {
    background: "#eff6ff",
    color: "#2563eb",
    border: "#bfdbfe",
  },
  완료: {
    background: "#ecfdf5",
    color: "#059669",
    border: "#a7f3d0",
  },
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  width: 100%;
  min-width: 0;
  padding: 4px 0;

  box-sizing: border-box;
`;

export const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;

  padding: 16px;

  background: #f8fafc;
  border: 1px solid #e9edf3;
  border-radius: 11px;
`;

export const DateIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 42px;
  height: 42px;

  border-radius: 10px;
  background: #eff6ff;

  color: #2563eb;
  font-size: 17px;
`;

export const DateText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  min-width: 0;
  flex: 1;

  strong {
    color: #172033;
    font-size: 14px;
    font-weight: 800;
  }

  span {
    color: #94a3b8;
    font-size: 11px;
    line-height: 1.5;
  }
`;

export const ScheduleCount = styled.span`
  flex-shrink: 0;

  padding: 7px 10px;
  border-radius: 7px;

  background: #eff6ff;
  color: #2563eb;

  font-size: 11px;
  font-weight: 700;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 9px;

  margin: 0;

  color: #172033;
  font-size: 13px;
  font-weight: 800;

  > svg {
    color: #2563eb;
    font-size: 12px;
  }
`;

export const CancelEditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 7px 10px;

  border: 1px solid #e2e8f0;
  border-radius: 7px;
  background: #ffffff;

  color: #64748b;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #f8fafc;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  color: #334155;
  font-size: 12px;
  font-weight: 700;
`;

export const StatusSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;
`;

export const StatusOption = styled.button<{
  $status: ScheduleStatus;
  $selected: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  height: 40px;
  min-width: 0;

  border: 1px solid
    ${({ $status, $selected }) =>
      $selected ? statusColors[$status].border : "#e2e8f0"};

  border-radius: 8px;

  background: ${({ $status, $selected }) =>
    $selected ? statusColors[$status].background : "#ffffff"};

  color: ${({ $status, $selected }) =>
    $selected ? statusColors[$status].color : "#94a3b8"};

  font-size: 12px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    background: ${({ $status }) => statusColors[$status].background};
  }
`;

export const StatusDot = styled.span`
  display: inline-block;
  flex-shrink: 0;

  width: 7px;
  height: 7px;

  border-radius: 50%;
  background: currentColor;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 75px;
  padding: 14px;

  border: 1px solid #e2e8f0;
  border-radius: 9px;
  outline: none;
  resize: vertical;

  background: #ffffff;
  color: #172033;

  font-size: 12px;
  font-family: inherit;
  line-height: 1.7;

  box-sizing: border-box;

  transition: border-color 0.2s ease;

  &::placeholder {
    color: #a8b3c3;
  }

  &:focus {
    border-color: #2563eb;
  }
`;

export const CharacterCount = styled.span`
  align-self: flex-end;
  margin-top: -4px;

  color: #94a3b8;
  font-size: 10px;
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;

  width: 100%;
  height: 43px;

  border: none;
  border-radius: 9px;
  background: #2563eb;

  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;

  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:disabled {
    background: #93c5fd;
    cursor: not-allowed;
  }

  .spin{
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to{
      transform: rotate(360deg);
    }
  }
`;

export const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  padding-top: 20px;
  border-top: 1px solid #edf0f5;
`;

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const ListCount = styled.span`
  color: #94a3b8;
  font-size: 11px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  min-height: 155px;
  padding: 20px 12px;

  border: 1px dashed #e2e8f0;
  border-radius: 10px;
  background: #fafbfd;

  text-align: center;

  strong {
    color: #64748b;
    font-size: 12px;
    font-weight: 700;
  }

  span {
    color: #94a3b8;
    font-size: 11px;
    line-height: 1.6;
  }
`;

export const EmptyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  border-radius: 12px;
  background: #f1f5f9;

  color: #94a3b8;
  font-size: 18px;
`;

export const ScheduleList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 12px;

  width: 100%;
  min-width: 0;
  padding: 8px 2px 14px;

  overflow-x: auto;
  overflow-y: hidden;

  scroll-behavior: auto;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
  }
`;

export const ScheduleCard = styled.div<{
  $editing: boolean; $type: string;
}>`
  padding: 15px;

  border: 1px solid ${({ $editing }) => ($editing ? "#93c5fd" : "#e9edf3")};

  border-radius: 10px;
  flex: 0 0 240px;
  min-width: 0;

  background: ${({ $editing }) => ($editing ? "#f8fbff" : "#ffffff")};

  transition: border-color 0.2s ease;

  &:hover {
    border-color: #bfdbfe;
  }

    position: relative;
    overflow: hidden;

    ${({ $type }) =>
    $type === "PUBLIC" &&
    `
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;

        width: 0;
        height: 0;

        border-top: 24px solid #DCEFFA;
        border-right: 24px solid transparent;

        pointer-events: none;
      }
  `}
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const StatusBadge = styled.span<{
  $status: ScheduleStatus;
}>`
  display: inline-flex;
  align-items: center;
  gap: 7px;

  padding: 6px 9px;

  border-radius: 6px;

  background: ${({ $status }) => statusColors[$status].background};

  color: ${({ $status }) => statusColors[$status].color};

  font-size: 10px;
  font-weight: 700;
`;

export const ScheduleTypeBadge = styled.span<{ $type: string }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 9px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  color: ${({ $type }) =>
    $type === "PUBLIC" ? "#3289C7" : "#8998A8"};

  /* background: ${({ $type }) =>
    $type === "PUBLIC" ? "#E5F4FF" : "#F1F4F7"}; */

  svg {
    font-size: 11px;
  }
`;

export const CreatedAt = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;

  color: #94a3b8;
  font-size: 10px;
`;

export const ScheduleContent = styled.p`
  margin: 14px 0;

  color: #334155;
  font-size: 12px;
  line-height: 1.7;

  white-space: pre-wrap;
  overflow-wrap: anywhere;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 7px;

  padding-top: 11px;
  border-top: 1px solid #f1f5f9;
`;

export const CardAction = styled.button<{
  $danger?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  padding: 7px 10px;

  border: 1px solid ${({ $danger }) => ($danger ? "#fee2e2" : "#e2e8f0")};

  border-radius: 7px;

  background: ${({ $danger }) => ($danger ? "#fff7f7" : "#ffffff")};

  color: ${({ $danger }) => ($danger ? "#ef4444" : "#64748b")};

  font-size: 11px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    background: ${({ $danger }) => ($danger ? "#fee2e2" : "#f1f5f9")};
  }
`;

export const AlarmTime = styled.div<{$enabled:boolean}>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;

  svg {
    color: ${({ $enabled }) => $enabled ? "#4e73df" : "#9ca3af"};
  }
`;

export const TimeSelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
  background-color: rgba(245, 245, 247, 0.8);

  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  width: 100%;
  box-sizing: border-box;
  height: 50px;
  min-height: 50px;
  flex-shrink: 0;
  padding: 0 20px;
`;
export const AlarmDescription = styled.div`
  color: #94a3b8;
  font-size: 11px;
  line-height: 1.6;
`;

export const TimeLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #1d1d1f;
  white-space: nowrap;

  svg {
    width: 14px;
    height: 14px;
    fill: #4e73df;
  }
`;

export const TimeSelectGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

export const StyledSelect = styled.select`
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  color: #1d1d1f;
  font-size: 13px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  transition: all 0.15s ease;
  min-width: 76px; 
  text-align: center;

  &:focus {
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.12);
  }
`;

export const TimeColon = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #86868b;
`;

export const AlarmToggle = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  input {
    appearance: none;
    position: relative;
    width: 36px;
    height: 20px;
    margin: 0;
    border-radius: 20px;
    background: #dbe2ea;
    cursor: pointer;
    transition: background 0.2s ease;

    &::before {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #fff;
      transition: transform 0.2s ease;
    }

    &:checked {
      background: #2563eb;
    }

    &:checked::before {
      transform: translateX(16px);
    }

    &:focus-visible {
      outline: 2px solid #93c5fd;
      outline-offset: 3px;
    }
  }
`;


// 일정 유형 선택 영역
export const ScheduleTypeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 1px;
`;

export const ScheduleTypeCard = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  line-height: 1;
  padding: 15px 20px;
  border-radius: 14px;

  border: 1px solid
    ${({ $selected }) => ($selected ? "rgba(82, 157, 218, 0.2)" : "#E3EAF1")};

  background: ${({ $selected }) =>
    $selected ? "#F0F8FF" : "#FFFFFF"};

  cursor: pointer;
  text-align: left;

  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;

  box-shadow: ${({ $selected }) =>
    $selected ? "0 3px 12px rgba(80, 160, 220, 0.09)" : "none"};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 14px rgba(80, 160, 220, 0.09);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 3px solid rgba(82, 157, 218, 0.2);
    outline-offset: 3px;
  }
`;

export const ScheduleTypeCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

// 아이콘 배경
export const ScheduleTypeIcon = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  border-radius: 11px;

  background: ${({ $selected }) =>
    $selected ? "#DDF0FF" : "#F1F5F9"};

  color: ${({ $selected }) =>
    $selected ? "#398CCB" : "#8293A5"};

  transition: all 0.25s ease;

  svg {
    font-size: 15px;
  }
`;

// 선택 체크
export const ScheduleTypeCheck = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;
  border-radius: 50%;

  border: 1.5px solid
    ${({ $selected }) => ($selected ? "#55A7E1" : "#D6E0E9")};

  background: ${({ $selected }) =>
    $selected ? "#55A7E1" : "transparent"};

  color: #FFFFFF;

  svg {
    font-size: 11px;
  }
`;

export const ScheduleTypeTitle = styled.strong<{ $selected: boolean }>`
  font-size: 14px;
  font-weight: 700;

  color: ${({ $selected }) =>
    $selected ? "#2879B8" : "#45566A"};
`;

export const ScheduleTypeDescription = styled.span`
  font-size: 11px;
  color: #8998A8;
  line-height: 1.2;
`;