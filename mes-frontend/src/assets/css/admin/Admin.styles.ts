import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;

  flex-direction: column;

  gap: 26px;

  width: 100%;

  min-width: 0;
`;

export const PageHeader = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  @media (max-width: 640px) {
    flex-direction: column;

    align-items: flex-start;
  }
`;

export const PageHeading = styled.div`
  display: flex;

  flex-direction: column;

  gap: 8px;
`;

export const Eyebrow = styled.span`
  color: #2563eb;

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 1.4px;
`;

export const PageTitle = styled.h1`
  margin: 0;

  color: #172033;

  font-size: 27px;

  font-weight: 800;

  letter-spacing: -0.8px;
`;

export const PageDescription = styled.p`
  margin: 0;

  color: #94a3b8;

  font-size: 13px;

  line-height: 1.6;
`;

export const RefreshButton = styled.button`
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 9px;

  height: 38px;

  padding: 0 15px;

  background: #ffffff;

  border: 1px solid #e2e8f0;

  border-radius: 9px;

  color: #475569;

  font-size: 12px;

  font-weight: 700;

  font-family: inherit;

  cursor: pointer;

  &:hover:not(:disabled) {
    background: #eff6ff;

    color: #2563eb;

    border-color: #bfdbfe;
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;

export const ContentGrid = styled.div`
  display: grid;

  grid-template-columns: minmax(300px, 0.85fr) minmax(0, 1.6fr);

  align-items: start;

  gap: 20px;

  min-width: 0;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const Panel = styled.section`
  min-width: 0;

  overflow: hidden;

  background: #ffffff;

  border: 1px solid #e5eaf1;

  border-radius: 14px;
`;

export const PanelHeader = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 12px;

  min-height: 96px;

  padding: 22px 24px;

  border-bottom: 1px solid #edf0f5;

  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 20px 16px;
  }
`;

export const PanelHeading = styled.div`
  display: flex;

  align-items: center;

  gap: 12px;

  min-width: 0;
`;

export const PanelIcon = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;

  width: 40px;

  height: 40px;

  background: #eff6ff;

  border-radius: 10px;

  color: #2563eb;

  font-size: 16px;
`;

export const PanelTitle = styled.h2`
  margin: 0 0 6px;

  color: #172033;

  font-size: 15px;

  font-weight: 800;
`;

export const PanelDescription = styled.p`
  margin: 0;

  color: #94a3b8;

  font-size: 11px;

  line-height: 1.5;
`;

export const Form = styled.form`
  display: flex;

  flex-direction: column;

  gap: 22px;

  padding: 26px 24px;

  @media (max-width: 640px) {
    padding: 22px 16px;
  }
`;

export const FormGroup = styled.div`
  display: flex;

  flex-direction: column;

  gap: 9px;

  min-width: 0;
`;

export const Label = styled.label`
  color: #334155;

  font-size: 12px;

  font-weight: 700;
`;

export const Required = styled.span`
  color: #ef4444;
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

  &:has(:disabled) {
    background: #f8fafc;
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

  &:disabled {
    cursor: not-allowed;

    color: #94a3b8;
  }
`;

export const NumberGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const FormFooter = styled.div`
  display: flex;

  flex-direction: column;

  gap: 14px;

  margin-top: 4px;
`;

export const FormHint = styled.span`
  color: #94a3b8;

  font-size: 11px;
`;

export const SubmitButton = styled.button`
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 10px;

  width: 100%;

  height: 45px;

  background: #2563eb;

  border: none;

  border-radius: 9px;

  color: #ffffff;

  font-size: 13px;

  font-weight: 700;

  font-family: inherit;

  cursor: pointer;

  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;

export const ItemCount = styled.span`
  flex-shrink: 0;

  padding: 7px 10px;

  background: #eff6ff;

  border-radius: 7px;

  color: #2563eb;

  font-size: 11px;

  font-weight: 700;
`;

export const ListToolbar = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 12px;

  padding: 18px 24px;

  border-bottom: 1px solid #f1f5f9;

  @media (max-width: 640px) {
    flex-direction: column;

    align-items: stretch;

    padding: 16px;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;

  align-items: center;

  gap: 10px;

  flex: 1;

  min-width: 0;

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

    flex: none;
  }
`;

export const SearchInput = styled.input`
  flex: 1;

  min-width: 0;

  border: none;

  outline: none;

  background: transparent;

  color: #172033;

  font-size: 12px;

  font-family: inherit;

  &::placeholder {
    color: #94a3b8;
  }
`;

export const ResultCount = styled.span`
  flex-shrink: 0;

  color: #94a3b8;

  font-size: 11px;
`;

export const EmptyState = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 12px;

  min-height: 250px;

  padding: 30px 16px;

  color: #94a3b8;

  text-align: center;

  > svg {
    font-size: 30px;

    color: #cbd5e1;
  }

  strong {
    color: #64748b;

    font-size: 13px;

    font-weight: 700;
  }

  span {
    font-size: 12px;

    line-height: 1.6;
  }
`;

export const RetryButton = styled.button`
  margin-top: 6px;

  padding: 9px 14px;

  border: 1px solid #bfdbfe;

  border-radius: 8px;

  background: #eff6ff;

  color: #2563eb;

  font-size: 12px;

  font-weight: 700;

  cursor: pointer;

  &:hover {
    background: #dbeafe;
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

export const StatusDot = styled.span`
  width: 7px;

  height: 7px;

  flex-shrink: 0;

  border-radius: 50%;

  background: currentColor;
`;

export const ScrollableList = styled.div`
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

export const ListCard = styled.div`
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

export const ListCardTop = styled.div`
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const ListIdentity = styled.div`
  display: flex;

  align-items: center;

  gap: 12px;

  min-width: 0;
`;

export const ListIcon = styled.div`
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

export const SummaryGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 18px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div`
  display: flex;

  align-items: center;

  gap: 18px;

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

  width: 52px;

  height: 52px;

  border-radius: 13px;

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

  font-size: 20px;
`;

export const SummaryContent = styled.div`
  display: flex;

  flex-direction: column;

  gap: 5px;

  span {
    color: #64748b;

    font-size: 12px;

    font-weight: 600;
  }

  strong {
    color: #172033;

    font-size: 27px;

    font-weight: 800;

    line-height: 1.2;
  }

  small {
    color: #94a3b8;

    font-size: 11px;
  }
`;

// Dashboard 전용 레이아웃: 기존 Admin.styles.ts 안에서 관리
export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100%;
  min-height: 0;
  min-width: 0;
`;

export const DashboardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DashboardTitle = PageTitle;
export const DashboardDescription = PageDescription;

export const CalendarLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  min-width: 0;
  min-height: 0;

  > * {
    flex: 1;
    min-height: 0;
    min-width: 0;
  }
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: 100%;
`;
