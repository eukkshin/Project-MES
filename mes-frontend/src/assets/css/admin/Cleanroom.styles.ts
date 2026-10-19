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
  ResultCount,
  EmptyState,
  RetryButton,
} from "./Admin.styles";

export const EnvironmentGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 18px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const EnvironmentCard = styled.div`
  display: flex;

  align-items: center;

  gap: 18px;

  min-width: 0;

  padding: 22px 24px;

  border: 1px solid #e5eaf1;

  border-radius: 13px;

  background: #ffffff;

  box-sizing: border-box;
`;

export const EnvironmentIcon = styled.div<{
  $variant: "temperature" | "humidity";
}>`
  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;

  width: 52px;

  height: 52px;

  border-radius: 13px;

  background: ${({ $variant }) =>
    $variant === "temperature" ? "#fff7ed" : "#eff6ff"};

  color: ${({ $variant }) =>
    $variant === "temperature" ? "#ea580c" : "#2563eb"};

  font-size: 20px;
`;

export const EnvironmentInfo = styled.div`
  display: flex;

  flex-direction: column;

  gap: 6px;

  > span {
    color: #64748b;

    font-size: 12px;

    font-weight: 600;
  }

  > strong {
    color: #172033;

    font-size: 27px;

    font-weight: 800;

    font-variant-numeric: tabular-nums;

    small {
      margin-left: 4px;

      color: #94a3b8;

      font-size: 14px;

      font-weight: 600;
    }
  }

  > p {
    margin: 0;

    color: #94a3b8;

    font-size: 11px;
  }
`;

export const FilterSelect = styled.select`
  height: 39px;

  padding: 0 12px;

  border: 1px solid #e2e8f0;

  border-radius: 8px;

  background: #ffffff;

  color: #475569;

  font-size: 12px;

  font-family: inherit;

  cursor: pointer;

  outline: none;

  &:focus {
    border-color: #2563eb;
  }
`;

export const EquipmentList = styled.div`
  display: flex;

  flex-direction: column;

  gap: 14px;

  padding: 20px 24px;

  max-height: 560px;

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

export const EquipmentCard = styled.div`
  padding: 20px;

  border: 1px solid #e9edf3;

  border-radius: 11px;

  background: #ffffff;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: #bfdbfe;

    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.05);
  }

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

export const EquipmentCardTop = styled.div`
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const EquipmentIdentity = styled.div`
  display: flex;

  align-items: center;

  gap: 12px;

  min-width: 0;
`;

export const EquipmentIcon = styled.div`
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

export const EquipmentName = styled.h3`
  margin: 0 0 7px;

  color: #172033;

  font-size: 14px;

  font-weight: 800;

  overflow-wrap: anywhere;
`;

export const EquipmentZone = styled.p`
  display: flex;

  align-items: center;

  gap: 6px;

  margin: 0;

  color: #94a3b8;

  font-size: 11px;
`;

type StatusTone = "success" | "warning" | "danger" | "neutral";

const statusColors: Record<StatusTone, { background: string; color: string }> =
  {
    success: { background: "#ecfdf5", color: "#059669" },

    warning: { background: "#fff7ed", color: "#ea580c" },

    danger: { background: "#fef2f2", color: "#dc2626" },

    neutral: { background: "#f1f5f9", color: "#64748b" },
  };

export const StatusBadge = styled.span<{ $tone: StatusTone }>`
  display: inline-flex;

  align-items: center;

  gap: 7px;

  flex-shrink: 0;

  padding: 7px 10px;

  border-radius: 7px;

  background: ${({ $tone }) => statusColors[$tone].background};

  color: ${({ $tone }) => statusColors[$tone].color};

  font-size: 11px;

  font-weight: 700;
`;

export const StatusDot = styled.span`
  width: 7px;

  height: 7px;

  flex-shrink: 0;

  border-radius: 50%;

  background: currentColor;
`;

export const MetricGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 12px;

  margin-top: 20px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const MetricBox = styled.div`
  min-width: 0;

  padding: 16px;

  border-radius: 9px;

  background: #f8fafc;
`;

export const MetricLabel = styled.div`
  display: flex;

  align-items: center;

  gap: 8px;

  color: #94a3b8;

  font-size: 11px;

  svg {
    color: #64748b;
  }
`;

export const MetricValue = styled.div`
  margin-top: 12px;

  color: #172033;

  font-size: 25px;

  font-weight: 800;

  font-variant-numeric: tabular-nums;

  small {
    margin-left: 4px;

    color: #94a3b8;

    font-size: 12px;

    font-weight: 600;
  }
`;

export const EquipmentCardFooter = styled.div`
  display: flex;

  align-items: center;

  gap: 9px;

  margin-top: 17px;

  padding-top: 16px;

  border-top: 1px solid #f1f5f9;

  > svg {
    color: #94a3b8;

    font-size: 12px;
  }

  span {
    color: #94a3b8;

    font-size: 11px;
  }

  strong {
    color: #475569;

    font-size: 11px;

    font-weight: 700;
  }
`;

export const SummaryGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(5, minmax(0, 1fr));

  gap: 12px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div`
  display: flex;

  align-items: center;

  gap: 18px;

  min-width: 0;

  min-height: 116px;

  padding: 22px 24px;

  background: #ffffff;

  border: 1px solid #e5eaf1;

  border-radius: 13px;

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

    white-space: nowrap;
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

export const SummaryUnit = styled.span`
  margin-left: 3px;

  color: #94a3b8 !important;

  font-size: 13px !important;

  font-weight: 600 !important;
`;

export const StatusControl = styled.div`
  display: flex;

  align-items: center;

  gap: 10px;

  width: 100%;

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

export const StatusControlLabel = styled.span`
  display: inline-flex;

  align-items: center;

  gap: 7px;

  margin-right: auto;

  color: #64748b;

  font-size: 11px;

  font-weight: 600;

  white-space: nowrap;

  svg {
    color: #94a3b8;
  }
`;

export const StatusSelect = styled.select`
  height: 34px;

  min-width: 115px;

  padding: 0 10px;

  border: 1px solid #e2e8f0;

  border-radius: 7px;

  background: #ffffff;

  color: #475569;

  font-size: 11px;

  font-family: inherit;

  outline: none;

  cursor: pointer;

  &:focus {
    border-color: #2563eb;
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;

export const StatusUpdateButton = styled.button`
  height: 34px;

  padding: 0 14px;

  border: none;

  border-radius: 7px;

  background: #2563eb;

  color: #ffffff;

  font-size: 11px;

  font-weight: 700;

  font-family: inherit;

  white-space: nowrap;

  cursor: pointer;

  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:disabled {
    background: #cbd5e1;

    cursor: not-allowed;
  }
`;
