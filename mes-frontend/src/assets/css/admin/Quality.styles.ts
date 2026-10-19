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
  FilterSelect,
  StatusDot,
  SummaryGrid,
  SummaryCard,
  SummaryIcon,
  SummaryContent,
} from "./Admin.styles";

export const Select = styled.select`
  flex: 1;

  min-width: 0;

  height: 100%;

  border: none;

  outline: none;

  background: transparent;

  color: #172033;

  font-size: 13px;

  font-family: inherit;

  cursor: pointer;
`;

export const ResultSelectGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 12px;
`;

export const ResultOption = styled.label<{
  $selected: boolean;

  $isPass: boolean;
}>`
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 9px;

  min-height: 46px;

  padding: 8px;

  box-sizing: border-box;

  border: 1px solid
    ${({ $selected, $isPass }) =>
      $selected ? ($isPass ? "#86efac" : "#fca5a5") : "#e2e8f0"};

  border-radius: 9px;

  background: ${({ $selected, $isPass }) =>
    $selected ? ($isPass ? "#f0fdf4" : "#fef2f2") : "#ffffff"};

  color: ${({ $selected, $isPass }) =>
    $selected ? ($isPass ? "#15803d" : "#dc2626") : "#64748b"};

  font-size: 12px;

  font-weight: 700;

  cursor: pointer;

  transition: 0.2s ease;

  input {
    position: absolute;

    opacity: 0;

    width: 1px;

    height: 1px;
  }

  &:focus-within {
    outline: none;

    outline-offset: 2px;
  }

  &:hover {
    border-color: ${({ $isPass }) => ($isPass ? "#86efac" : "#fca5a5")};

    &:hover {
      color: ${({ $selected, $isPass }) =>
        $selected
          ? $isPass
            ? "#15803d"
            : "#dc2626"
          : $isPass
            ? "#86efac"
            : "#fca5a5"};
    }
  }

  svg {
    font-size: 16px;
  }
`;

export const InspectionList = styled.div`
  display: flex;

  flex-direction: column;

  gap: 14px;

  padding: 20px 24px;

  max-height: 570px;

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

export const InspectionCard = styled.div`
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

export const InspectionCardTop = styled.div`
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const InspectionIdentity = styled.div`
  display: flex;

  align-items: center;

  gap: 12px;

  min-width: 0;
`;

export const InspectionIcon = styled.div`
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

export const InspectionName = styled.h3`
  margin: 0 0 5px;

  color: #172033;

  font-size: 14px;

  font-weight: 800;

  overflow-wrap: anywhere;
`;

export const InspectionCategory = styled.p`
  margin: 0;

  color: #94a3b8;

  font-size: 11px;

  line-height: 1.5;
`;

export const StatusBadge = styled.span<{ $isPass: boolean }>`
  display: inline-flex;

  align-items: center;

  gap: 7px;

  flex-shrink: 0;

  padding: 7px 10px;

  border-radius: 7px;

  background: ${({ $isPass }) => ($isPass ? "#ecfdf5" : "#fef2f2")};

  color: ${({ $isPass }) => ($isPass ? "#059669" : "#dc2626")};

  font-size: 11px;

  font-weight: 700;
`;

export const InspectionDetail = styled.div<{ $isPass: boolean }>`
  margin-top: 20px;

  padding: 16px;

  border-radius: 9px;

  background: ${({ $isPass }) => ($isPass ? "#f0fdf4" : "#fef2f2")};
`;

export const DetailHeading = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 8px;

  color: #64748b;

  font-size: 11px;

  svg {
    font-size: 15px;
  }
`;

export const DetailValue = styled.div<{ $isPass: boolean }>`
  margin-top: 10px;

  color: ${({ $isPass }) => ($isPass ? "#059669" : "#dc2626")};

  font-size: 23px;

  font-weight: 800;
`;

export const DetailMessage = styled.p`
  margin: 10px 0 0;

  color: #64748b;

  font-size: 11px;

  line-height: 1.6;

  overflow-wrap: anywhere;
`;

export const InspectionCardFooter = styled.div`
  display: flex;

  align-items: center;

  gap: 9px;

  margin-top: 17px;

  padding-top: 16px;

  border-top: 1px solid #f1f5f9;

  > svg {
    flex-shrink: 0;

    color: #94a3b8;

    font-size: 12px;
  }

  span {
    flex-shrink: 0;

    color: #94a3b8;

    font-size: 11px;
  }

  strong {
    min-width: 0;

    color: #475569;

    font-size: 11px;

    font-weight: 700;

    overflow-wrap: anywhere;
  }
`;

export const PassRateCard = styled.div`
  display: flex;

  flex-direction: column;

  gap: 16px;

  width: 100%;

  padding: 22px 24px;

  background: #ffffff;

  border: 1px solid #e5eaf1;

  border-radius: 13px;

  box-sizing: border-box;
`;

export const PassRateHeader = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 16px;
`;

export const PassRateInfo = styled.div`
  display: flex;

  flex-direction: column;

  gap: 6px;
`;

export const PassRateTitle = styled.span`
  color: #172033;

  font-size: 14px;

  font-weight: 800;
`;

export const PassRateDescription = styled.span`
  color: #94a3b8;

  font-size: 11px;
`;

export const PassRateValue = styled.strong`
  color: #2563eb;

  font-size: 25px;

  font-weight: 800;

  font-variant-numeric: tabular-nums;
`;

export const PassRateTrack = styled.div`
  width: 100%;

  height: 10px;

  overflow: hidden;

  background: #e2e8f0;

  border-radius: 999px;
`;

export const PassRateFill = styled.div<{ $width: number }>`
  width: ${({ $width }) => `${Math.max(0, Math.min(100, $width))}%`};

  height: 100%;

  background: linear-gradient(90deg, #2563eb, #60a5fa);

  border-radius: 999px;

  transition: width 0.4s ease;
`;

export const PassRateFooter = styled.div`
  display: flex;

  justify-content: space-between;

  color: #94a3b8;

  font-size: 10px;
`;
