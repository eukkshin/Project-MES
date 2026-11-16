import styled, { keyframes, css } from "styled-components";

export {
  PageContainer,
  PageHeader,
  PageHeading,
  Eyebrow,
  PageTitle,
  PageDescription,
  RefreshButton,
  ContentGrid,
  Panel,
  PanelHeader,
  PanelHeading,
  PanelIcon,
  PanelTitle,
  PanelDescription,
  Form,
  FormGroup,
  Label,
  Required,
  InputWrapper,
  Input,
  NumberGrid,
  FormFooter,
  FormHint,
  SubmitButton,
  ItemCount,
  ListToolbar,
  SearchWrapper,
  SearchInput,
  ResultCount,
  EmptyState,
  RetryButton,
  FilterWrapper,
  FilterSelect,
  SummaryCard,
  SummaryIcon,
  SummaryContent,
} from "./Admin.styles";


export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LiveIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 9999px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #15803d;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.2px;
`;

/* -------------------------------------------------------------------------- */
/* Pulse Animation & Status Dot                                               */
/* -------------------------------------------------------------------------- */
export const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  70% {
    transform: scale(1.15);
    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
`;

export const StatusDot = styled.span<{ $pulse?: boolean }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background: currentColor;

  ${({ $pulse }) =>
    $pulse &&
    css`
      background: #10b981;
      animation: ${pulseAnimation} 1.8s ease-in-out infinite;
    `}
`;

/* -------------------------------------------------------------------------- */
/* Status Badge (상태 배지 - Cleanroom & Admin 스타일과 통일)                    */
/* -------------------------------------------------------------------------- */
export type StatusTone = "success" | "warning" | "danger" | "neutral";

const statusColors: Record<StatusTone, { background: string; color: string }> = {
  success: { background: "#ecfdf5", color: "#059669" },
  warning: { background: "#fff7ed", color: "#ea580c" },
  danger: { background: "#fef2f2", color: "#dc2626" },
  neutral: { background: "#f1f5f9", color: "#64748b" },
};

export const StatusBadge = styled.span<{
  $tone: StatusTone;
  $clickable?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  flex-shrink: 0;
  padding: 6px 12px;
  border-radius: 20px;
  background: ${({ $tone }) => statusColors[$tone].background};
  color: ${({ $tone }) => statusColors[$tone].color};
  font-size: 11px;
  font-weight: 700;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  user-select: none;
  transition: all 0.15s ease;

  ${({ $clickable }) =>
    $clickable &&
    `
    &:hover {
      filter: brightness(0.95);
      transform: translateY(-1px);
    }
  `}
`;

/* -------------------------------------------------------------------------- */
/* Line Cards List (Cleanroom EquipmentCard와 동일한 룩앤필)                   */
/* -------------------------------------------------------------------------- */
export const LineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px 24px;
  max-height: 580px;
  overflow-y: auto;
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

export const LineCard = styled.div`
  padding: 20px 22px;
  border: 1px solid #eef2f6;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 10px 25px -4px rgba(15, 23, 42, 0.07),
      0 4px 10px -2px rgba(15, 23, 42, 0.03);
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

export const LineCardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const LineIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

export const LineIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #f1f5f9;
  color: #64748b;
  font-size: 17px;
`;

export const LineName = styled.h3`
  margin: 0 0 5px;
  color: #172033;
  font-size: 14px;
  font-weight: 800;
  overflow-wrap: anywhere;
`;

export const LineType = styled.p`
  margin: 0;
  color: #94a3b8;
  font-size: 11px;
`;

export const LineCardBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #f1f5f9;

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const LineDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 11px;

  svg {
    color: #94a3b8;
    font-size: 13px;
  }

  strong {
    color: #172033;
    font-weight: 700;
  }
`;

/* -------------------------------------------------------------------------- */
/* Status Control Bar on Card (카드 하단 상태 변경 제어부)                     */
/* -------------------------------------------------------------------------- */
export const StatusControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px dashed #eef2f6;
  flex-wrap: wrap;
`;

export const StatusControlLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.2px;

  svg {
    color: #94a3b8;
    font-size: 11px;
  }
`;

export const StatusRightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const StatusActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StatusButton = styled.button<{
  $variant?: "success" | "warning" | "danger";
  $active?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  padding: 0 10px;
  border-radius: 7px;
  border: 1px solid
    ${({ $variant, $active }) =>
      $active
        ? $variant === "success"
          ? "#10b981"
          : $variant === "warning"
          ? "#f59e0b"
          : "#ef4444"
        : "#e2e8f0"};
  background: ${({ $variant, $active }) =>
    $active
      ? $variant === "success"
        ? "#10b981"
        : $variant === "warning"
        ? "#f59e0b"
        : "#ef4444"
      : "#ffffff"};
  color: ${({ $active }) => ($active ? "#ffffff" : "#475569")};
  font-size: 11px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  letter-spacing: -0.2px;
  transition: all 0.15s ease;

  svg {
    font-size: 9px;
  }

  &:hover:not(:disabled) {
    ${({ $active, $variant }) =>
      !$active &&
      `
      background: ${
        $variant === "success"
          ? "#f0fdf4"
          : $variant === "warning"
          ? "#fffbeb"
          : "#fef2f2"
      };
      border-color: ${
        $variant === "success"
          ? "#86efac"
          : $variant === "warning"
          ? "#fde68a"
          : "#fca5a5"
      };
      color: ${
        $variant === "success"
          ? "#15803d"
          : $variant === "warning"
          ? "#b45309"
          : "#b91c1c"
      };
    `}
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const QuickToggleButton = styled.button<{ $isRunning: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  border-radius: 9999px;
  border: 1px solid
    ${({ $isRunning }) =>
      $isRunning ? "rgba(239, 68, 68, 0.25)" : "rgba(16, 185, 129, 0.25)"};
  background: ${({ $isRunning }) =>
    $isRunning ? "rgba(254, 242, 242, 0.9)" : "rgba(236, 253, 245, 0.9)"};
  color: ${({ $isRunning }) => ($isRunning ? "#e11d48" : "#059669")};
  font-size: 11px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  letter-spacing: -0.2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  svg {
    font-size: 10px;
  }

  &:hover:not(:disabled) {
    background: ${({ $isRunning }) =>
      $isRunning ? "#fee2e2" : "#d1fae5"};
    border-color: ${({ $isRunning }) =>
      $isRunning ? "#fca5a5" : "#6ee7b7"};
    transform: scale(1.02);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* -------------------------------------------------------------------------- */
/* Modal (src/assets/css/components/modal/Modal.styles.ts 스타일과 통일)        */
/* -------------------------------------------------------------------------- */
export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.4);
  z-index: 10000;
  padding: 16px;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 24px;
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const ModalIcon = styled.div<{ $variant?: StatusTone }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${({ $variant }) =>
    $variant === "success"
      ? "#ecfdf3"
      : $variant === "warning"
      ? "#fff7ed"
      : $variant === "danger"
      ? "#fef2f2"
      : "#f1f5f9"};
  color: ${({ $variant }) =>
    $variant === "success"
      ? "#16a34a"
      : $variant === "warning"
      ? "#ea580c"
      : $variant === "danger"
      ? "#dc2626"
      : "#64748b"};
  font-size: 18px;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  color: #172033;
  font-size: 16px;
  font-weight: 700;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
  font-size: 13px;
  color: #475569;
  line-height: 1.5;
`;

export const ModalInfo = styled.div`
  padding: 12px 14px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 12px;
  color: #334155;

  strong {
    color: #0f172a;
  }
`;

export const ModalInput = styled.input`
  width: 100%;
  height: 38px;
  padding: 0 12px;
  border: 1px solid #d1d3e2;
  border-radius: 6px;
  font-size: 12px;
  font-family: inherit;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #2563eb;
  }
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
`;

export const ModalCancelButton = styled.button`
  height: 36px;
  padding: 0 16px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background: #ffffff;
  color: #495057;
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    background: #f8f9fa;
  }
`;

export const ModalConfirmButton = styled.button<{
  $variant?: StatusTone;
}>`
  height: 36px;
  padding: 0 16px;
  border: none;
  border-radius: 6px;
  background: ${({ $variant }) =>
    $variant === "success"
      ? "#10b981"
      : $variant === "warning"
      ? "#ea580c"
      : $variant === "danger"
      ? "#dc2626"
      : "#2563eb"};
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

/* -------------------------------------------------------------------------- */
/* Status History Section (공정 상태 변경 이력 테이블 / 목록)                   */
/* -------------------------------------------------------------------------- */
export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 320px;
  overflow-y: auto;
  border-top: 1px solid #edf0f5;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
  }
`;

export const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 24px;
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.15s ease;

  &:hover {
    background: #f8fafc;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 16px;
  }
`;

export const HistoryLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

export const HistoryLineName = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
`;

export const HistoryChangeFlow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;

  svg {
    color: #94a3b8;
    font-size: 10px;
  }
`;

export const HistoryPillBadge = styled.span<{ $tone: StatusTone }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 9px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: -0.2px;
  user-select: none;
  background: ${({ $tone }) =>
    $tone === "success"
      ? "rgba(16, 185, 129, 0.12)"
      : $tone === "warning"
      ? "rgba(245, 158, 11, 0.12)"
      : $tone === "danger"
      ? "rgba(239, 68, 68, 0.12)"
      : "rgba(100, 116, 139, 0.1)"};
  color: ${({ $tone }) =>
    $tone === "success"
      ? "#059669"
      : $tone === "warning"
      ? "#d97706"
      : $tone === "danger"
      ? "#dc2626"
      : "#64748b"};
  border: 1px solid
    ${({ $tone }) =>
      $tone === "success"
        ? "rgba(16, 185, 129, 0.25)"
        : $tone === "warning"
        ? "rgba(245, 158, 11, 0.25)"
        : $tone === "danger"
        ? "rgba(239, 68, 68, 0.25)"
        : "rgba(100, 116, 139, 0.2)"};
`;

export const HistoryPillDot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
`;

export const HistoryRight = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const HistoryReason = styled.span`
  font-size: 12px;
  color: #64748b;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const HistoryOperator = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #475569;
  padding: 2px 8px;
  background: #f1f5f9;
  border-radius: 4px;
`;

export const HistoryTime = styled.span`
  font-size: 11px;
  color: #94a3b8;
  font-variant-numeric: tabular-nums;
`;
