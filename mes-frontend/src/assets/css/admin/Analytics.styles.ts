import styled from "styled-components";

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
  EmptyState,
  RetryButton,
  FilterSelect,
} from "./Admin.styles";

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  min-height: 94px;
  padding: 16px;
  background: #fff;
  border: 1px solid #e5eaf1;
  border-radius: 12px;
  box-sizing: border-box;
`;

export const SummaryIcon = styled.div<{
  $variant: "blue" | "green" | "orange";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ $variant }) =>
    $variant === "blue"
      ? "#eff6ff"
      : $variant === "green"
        ? "#ecfdf5"
        : "#fff7ed"};
  color: ${({ $variant }) =>
    $variant === "blue"
      ? "#2563eb"
      : $variant === "green"
        ? "#059669"
        : "#ea580c"};
  font-size: 17px;
`;

export const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
  span {
    color: #64748b;
    font-size: 11px;
    font-weight: 600;
  }
  strong {
    color: #172033;
    font-size: 23px;
    font-weight: 800;
    line-height: 1.2;
    font-variant-numeric: tabular-nums;
  }
  small {
    color: #94a3b8;
    font-size: 10px;
  }
`;

export const AchievementCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px 24px;
  border: 1px solid #e5eaf1;
  border-radius: 13px;
  background: #fff;
`;
export const AchievementHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  > div {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;
export const AchievementTitle = styled.strong`
  display: flex;
  align-items: center;
  gap: 9px;
  color: #172033;
  font-size: 13px;
  font-weight: 800;
  svg {
    color: #2563eb;
  }
`;
export const AchievementDescription = styled.span`
  color: #94a3b8;
  font-size: 11px;
`;
export const AchievementValue = styled.strong`
  color: #2563eb;
  font-size: 24px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
`;
export const ProgressTrack = styled.div`
  width: 100%;
  height: 9px;
  overflow: hidden;
  border-radius: 999px;
  background: #e2e8f0;
`;
type ProgressTone = "blue" | "success" | "warning" | "danger";
const progressColors: Record<ProgressTone, string> = {
  blue: "#2563eb",
  success: "#059669",
  warning: "#ea580c",
  danger: "#dc2626",
};
export const ProgressFill = styled.div<{ $width: number; $tone: ProgressTone }>`
  width: ${({ $width }) => `${Math.max(0, Math.min(100, $width))}%`};
  height: 100%;
  border-radius: 999px;
  background: ${({ $tone }) => progressColors[$tone]};
  transition: width 0.3s ease;
`;
export const ProgressFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: #94a3b8;
  font-size: 10px;
`;
export const FormPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 16px;
  border: 1px solid #dbeafe;
  border-radius: 9px;
  background: #eff6ff;
  span {
    color: #475569;
    font-size: 12px;
    font-weight: 600;
  }
  strong {
    color: #2563eb;
    font-size: 19px;
    font-weight: 800;
  }
`;
export const Notice = styled.div<{ $type: "success" | "error" }>`
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ $type }) => ($type === "success" ? "#ecfdf5" : "#fef2f2")};
  color: ${({ $type }) => ($type === "success" ? "#059669" : "#dc2626")};
`;
export const RecordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px 24px;
  max-height: 590px;
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
export const RecordCard = styled.div`
  padding: 20px;
  border: 1px solid #e9edf3;
  border-radius: 11px;
  background: #fff;
  &:hover {
    border-color: #bfdbfe;
  }
`;
export const RecordTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;
export const RecordIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;
export const RecordIcon = styled.div`
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
export const RecordName = styled.h3`
  margin: 0 0 6px;
  color: #172033;
  font-size: 14px;
  font-weight: 800;
`;
export const RecordSub = styled.span`
  color: #94a3b8;
  font-size: 11px;
`;
type YieldTone = "success" | "warning" | "danger";
const yieldColors: Record<YieldTone, { background: string; color: string }> = {
  success: { background: "#ecfdf5", color: "#059669" },
  warning: { background: "#fff7ed", color: "#ea580c" },
  danger: { background: "#fef2f2", color: "#dc2626" },
};
export const YieldBadge = styled.span<{ $tone: YieldTone }>`
  flex-shrink: 0;
  padding: 7px 10px;
  border-radius: 7px;
  background: ${({ $tone }) => yieldColors[$tone].background};
  color: ${({ $tone }) => yieldColors[$tone].color};
  font-size: 11px;
  font-weight: 700;
`;
export const RecordMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
export const RecordMetric = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  min-width: 0;
  padding: 14px;
  border-radius: 9px;
  background: #f8fafc;
  span {
    color: #94a3b8;
    font-size: 11px;
  }
  strong {
    color: #172033;
    font-size: 19px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }
`;
export const RecordProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 10px;
  span {
    color: #64748b;
    font-size: 11px;
    font-weight: 600;
  }
  strong {
    color: #172033;
    font-size: 12px;
    font-weight: 800;
  }
`;
export const RecordFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid #f1f5f9;
  span {
    color: #94a3b8;
    font-size: 11px;
  }
  strong {
    color: #2563eb;
    font-size: 12px;
    font-weight: 800;
  }
`;
