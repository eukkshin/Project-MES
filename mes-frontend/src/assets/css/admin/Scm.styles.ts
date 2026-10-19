import styled from "styled-components";

export {
  PageHeader,
  PageHeading,
  Eyebrow,
  PageTitle,
  PageDescription,
  RefreshButton,
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
  NumberGrid,
  FormFooter,
  FormHint,
  SubmitButton,
  ItemCount,
  ListToolbar,
  SearchInput,
  ResultCount,
  EmptyState,
  RetryButton,
  StatusDot,
  SummaryGrid,
  SummaryCard,
  SummaryIcon,
  SummaryContent,
} from "./Admin.styles";

export const PageContainer = styled.div`
  display: flex;

  flex-direction: column;

  gap: 26px;

  width: 100%;
`;

export const ContentGrid = styled.div`
  display: grid;

  grid-template-columns: minmax(300px, 0.85fr) minmax(0, 1.6fr);

  align-items: start;

  gap: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const InputWrapper = styled.div`
  display: flex;

  align-items: center;

  gap: 11px;

  width: 100%;

  height: 45px;

  padding: 0 14px;

  border: 1px solid #e2e8f0;

  border-radius: 9px;

  background: #ffffff;

  box-sizing: border-box;

  transition: border-color 0.2s ease;

  > svg {
    flex-shrink: 0;

    color: #94a3b8;

    font-size: 14px;
  }

  &:focus-within {
    border-color: #2563eb;

    > svg {
      color: #2563eb;
    }
  }
`;

export const Input = styled.input`
  flex: 1;

  min-width: 0;

  height: 100%;

  border: none;

  outline: none;

  background: transparent;

  color: #172033;

  font-size: 13px;

  font-family: inherit;

  &::placeholder {
    color: #a8b3c3;
  }

  &[type="number"] {
    font-variant-numeric: tabular-nums;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;

  align-items: center;

  gap: 10px;

  width: 100%;

  max-width: 330px;

  height: 39px;

  padding: 0 12px;

  border: 1px solid #e2e8f0;

  border-radius: 8px;

  background: #ffffff;

  box-sizing: border-box;

  > svg {
    flex-shrink: 0;

    color: #94a3b8;

    font-size: 12px;
  }

  &:focus-within {
    border-color: #2563eb;
  }

  @media (max-width: 640px) {
    max-width: none;
  }
`;

export const ComponentList = styled.div`
  display: flex;

  flex-direction: column;

  gap: 14px;

  padding: 20px 24px;

  max-height: 610px;

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

export const ComponentCard = styled.div`
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

export const ComponentCardTop = styled.div`
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const ComponentIdentity = styled.div`
  display: flex;

  align-items: center;

  gap: 12px;

  min-width: 0;
`;

export const ComponentIcon = styled.div`
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

export const ComponentName = styled.h3`
  margin: 0 0 5px;

  color: #172033;

  font-size: 14px;

  font-weight: 800;

  overflow-wrap: anywhere;
`;

export const ComponentCategory = styled.p`
  margin: 0;

  color: #94a3b8;

  font-size: 11px;
`;

export const StatusBadge = styled.span<{
  $warning: boolean;
}>`
  display: inline-flex;

  align-items: center;

  gap: 7px;

  flex-shrink: 0;

  padding: 7px 10px;

  border-radius: 7px;

  background: ${({ $warning }) => ($warning ? "#fff7ed" : "#ecfdf5")};

  color: ${({ $warning }) => ($warning ? "#ea580c" : "#059669")};

  font-size: 11px;

  font-weight: 700;
`;

export const StockSection = styled.div`
  margin-top: 20px;

  padding: 16px;

  background: #f8fafc;

  border-radius: 9px;
`;

export const StockHeading = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  flex-wrap: wrap;

  gap: 8px;

  color: #94a3b8;

  font-size: 11px;
`;

export const StockValue = styled.div`
  display: flex;

  align-items: baseline;

  gap: 5px;

  margin-top: 10px;

  color: #172033;

  font-size: 25px;

  font-weight: 800;

  font-variant-numeric: tabular-nums;

  span {
    color: #94a3b8;

    font-size: 12px;

    font-weight: 500;
  }
`;

export const ProgressTrack = styled.div`
  width: 100%;

  height: 7px;

  margin-top: 13px;

  background: #e2e8f0;

  border-radius: 999px;

  overflow: hidden;
`;

export const ProgressFill = styled.div<{
  $width: number;

  $warning: boolean;
}>`
  width: ${({ $width }) => `${Math.max(0, Math.min(100, $width))}%`};

  height: 100%;

  border-radius: 999px;

  background: ${({ $warning }) => ($warning ? "#f97316" : "#2563eb")};

  transition: width 0.3s ease;
`;

export const StockMessage = styled.p<{
  $warning: boolean;
}>`
  margin: 10px 0 0;

  color: ${({ $warning }) => ($warning ? "#ea580c" : "#64748b")};

  font-size: 11px;

  line-height: 1.5;
`;

export const ComponentCardFooter = styled.div`
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

    overflow-wrap: anywhere;
  }
`;
