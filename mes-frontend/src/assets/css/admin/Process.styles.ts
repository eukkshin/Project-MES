import styled from "styled-components";

export {
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
  Label,
  Required,
  FormFooter,
  FormHint,
  SubmitButton,
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

export const PageHeader = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  @media (max-width: 640px) {
    align-items: flex-start;

    flex-direction: column;
  }
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

export const FormGroup = styled.div`
  display: flex;

  flex-direction: column;

  gap: 9px;
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
`;

export const LineCount = styled.span`
  flex-shrink: 0;

  padding: 7px 10px;

  background: #eff6ff;

  border-radius: 7px;

  color: #2563eb;

  font-size: 11px;

  font-weight: 700;
`;

export const LineList = styled.div`
  display: flex;

  flex-direction: column;

  gap: 12px;

  padding: 20px 24px;

  max-height: 584px;

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
`;

export const LineType = styled.p`
  margin: 0;

  color: #94a3b8;

  font-size: 11px;
`;

export const StatusBadge = styled.span<{
  $status: "running" | "stopped" | "unknown";
}>`
  display: inline-flex;

  align-items: center;

  gap: 7px;

  flex-shrink: 0;

  padding: 7px 10px;

  border-radius: 7px;

  background: ${({ $status }) =>
    $status === "running"
      ? "#ecfdf5"
      : $status === "stopped"
        ? "#fff7ed"
        : "#f1f5f9"};

  color: ${({ $status }) =>
    $status === "running"
      ? "#059669"
      : $status === "stopped"
        ? "#ea580c"
        : "#64748b"};

  font-size: 11px;

  font-weight: 700;
`;

export const LineCardBottom = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 12px;

  margin-top: 18px;

  padding-top: 16px;

  border-top: 1px solid #f1f5f9;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const LineDetail = styled.div`
  display: flex;

  align-items: center;

  gap: 8px;

  min-width: 0;

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

    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;

    color: #475569;

    font-size: 11px;

    font-weight: 700;
  }
`;
