
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
  ItemCount,
  ListToolbar,
  SearchWrapper,
  SearchInput,
  EmptyState,
  RetryButton,
  FilterSelect,
} from "./Admin.styles";

export const HRContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  min-width: 0;
`;

export const HRSummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const HRSummaryCard = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 0;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e5eaf1;
  border-radius: 13px;
  box-sizing: border-box;
`;

export const HRSummaryIcon = styled.div<{
  $variant: "blue" | "green" | "orange" | "gray";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 12px;

  background: ${({ $variant }) =>
    ({
      blue: "#eff6ff",
      green: "#ecfdf5",
      orange: "#fff7ed",
      gray: "#f1f5f9",
    })[$variant]};

  color: ${({ $variant }) =>
    ({
      blue: "#2563eb",
      green: "#059669",
      orange: "#ea580c",
      gray: "#64748b",
    })[$variant]};

  font-size: 18px;
`;

export const HRSummaryContent = styled.div`
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
    font-size: 25px;
    font-weight: 800;
    line-height: 1.2;
  }

  small {
    color: #94a3b8;
    font-size: 10px;
  }
`;

export const HRPanel = styled.section`
  min-width: 0;
  overflow: visible;
  background: #ffffff;
  border: 1px solid #e5eaf1;
  border-radius: 14px;
`;

export const HRPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 22px 24px;
  border-bottom: 1px solid #edf0f5;

  @media (max-width: 640px) {
    padding: 18px 16px;
  }
`;

export const HRPanelTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  h2 {
    margin: 0;
    color: #172033;
    font-size: 15px;
    font-weight: 800;
  }

  p {
    margin: 0;
    color: #94a3b8;
    font-size: 11px;
  }
`;

export const HRItemCount = styled.span`
  flex-shrink: 0;
  padding: 7px 11px;
  background: #eff6ff;
  border-radius: 7px;
  color: #2563eb;
  font-size: 11px;
  font-weight: 700;
`;

export const HRToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 24px;
  border-bottom: 1px solid #f1f5f9;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
  }
`;

export const HRSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
  max-width: 350px;
  height: 40px;
  padding: 0 13px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #ffffff;
  box-sizing: border-box;

  > svg {
    flex-shrink: 0;
    color: #94a3b8;
    font-size: 13px;
  }

  &:focus-within {
    border-color: #2563eb;
  }

  @media (max-width: 700px) {
    max-width: none;
  }
`;

export const HRSearchInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 100%;
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

export const HRFilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  flex-wrap: wrap;

  @media (max-width: 700px) {
    justify-content: flex-end;
  }
`;

export const HRFilterSelect = styled.select`
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

export const ResetButton= styled.button`
    display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  color: #64748b;
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

export const HRTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
  }
`;

export const HRTable = styled.table`
  width: 100%;
  min-width: 850px;
  border-collapse: collapse;
  text-align: left;

  thead {
    background: #f8fafc;
  }

  th {
    height: 48px;
    padding: 0 16px;
    color: #94a3b8;
    font-size: 11px;
    font-weight: 700;
    white-space: nowrap;
  }

  td {
    height: 68px;
    padding: 10px 16px;
    border-top: 1px solid #f1f5f9;
    color: #475569;
    font-size: 12px;
    white-space: nowrap;
  }

  tbody tr {
    transition: background 0.15s ease;

    &:hover {
      background: #f8fbff;
    }
  }

  th:first-child,
  td:first-child {
    padding-left: 24px;
  }

  th:last-child,
  td:last-child {
    padding-right: 24px;
    text-align: center;
  }
`;

export const HRAdminCheck = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
  color: #6b91c5;
  font-size: 13px;
  vertical-align: middle;
`;

export const HREmployeeIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;

  > div:last-child {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  strong {
    color: #172033;
    font-size: 13px;
    font-weight: 700;
  }

  span {
    color:  #8B9FC2;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.2px;
  }
`;

export const HRAvatar = styled.div<{$role: string;}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${({ $role }) =>
    $role === "ADMIN" ? "#EDE7F6" : "#eff6ff"};
  color: ${({ $role }) =>
    $role === "ADMIN" ? "#7956A8" : "#2563eb"};
  font-size: 13px;
  font-weight: 800;
`;

export const HRStatusBadge = styled.span<{
  $status: "active" | "leave" | "resigned";
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;

  background: ${({ $status }) =>
    $status === "active"
      ? "#ecfdf5"
      : $status === "leave"
        ? "#fff7ed"
        : "#f1f5f9"};

  color: ${({ $status }) =>
    $status === "active"
      ? "#059669"
      : $status === "leave"
        ? "#ea580c"
        : "#64748b"};

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

export const HRMoreWrapper = styled.div`
  display: inline-flex;
`;

export const HRMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 7px;
  background: transparent;
  color: #64748b;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background: #eff6ff;
    color: #2563eb;
  }
`;

export const HRMoreMenu = styled.div`
  position: fixed;
  z-index: 99999;

  display: flex;
  flex-direction: column;
  gap: 3px;

  width: 190px;
  padding: 6px;

  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 14px;
  box-shadow: 
    0 4px 20px -2px rgba(15, 23, 42, 0.06),
    0 2px 6px -1px rgba(15, 23, 42, 0.03),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5); 
    
  animation: menuFadeIn 0.15s ease-out;

  @keyframes menuFadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const HRMenuItem = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;

  width: 100%;
  padding: 11px 10px;

  border: none;
  border-radius: 7px;

  background: transparent;
  color: ${({ $danger }) => ($danger ? "#dc5252" : "#475569")};

  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  text-align: left;

  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease;

  svg {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    color: ${({ $danger }) => ($danger ? "#e16b6b" : "#64748b")};
    transition: color 0.18s ease;
  }

  &:hover {
    background: ${({ $danger }) => ($danger ? "#fff1f1" : "#f1f5f9")};
    color: ${({ $danger }) => ($danger ? "#dc2626" : "#2563eb")};

    svg {
      color: ${({ $danger }) => ($danger ? "#dc2626" : "#2563eb")};
    }
  }

  &:focus-visible {
    outline: 2px solid #93c5fd;
    outline-offset: -2px;
  }
`;

export const HRMenuDivider = styled.div`
  height: 1px;
  margin: 4px 5px;
  background: #edf0f4;
`;

export const HRModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(15, 23, 42, 0.45);
`;

export const HRModalContainer = styled.div`
  width: min(460px, 100%);
  max-height: min(650px, calc(100vh - 32px));
  overflow-y: auto;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.2);
`;

export const HRModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 24px;
  border-bottom: 1px solid #edf0f5;

  h2 {
    margin: 0;
    color: #172033;
    font-size: 16px;
    font-weight: 800;
  }
`;

export const HRModalClose = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 7px;
  background: #f1f5f9;
  color: #64748b;
  cursor: pointer;

  &:hover {
    background: #e2e8f0;
  }
`;

export const HRModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
`;

export const HRFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: #334155;
    font-size: 12px;
    font-weight: 700;
  }

  input,
  select {
    width: 100%;
    height: 42px;
    padding: 0 12px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    outline: none;
    background: #ffffff;
    color: #172033;
    font-size: 12px;
    font-family: inherit;
    box-sizing: border-box;

    &:focus {
      border-color: #2563eb;
    }
  }
`;

export const HRModalHint = styled.p`
  margin: 0;
  color: #536692;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.8;
`;

export const HRModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 9px;
  padding: 16px 24px;
  border-top: 1px solid #edf0f5;
`;

export const HRModalButton = styled.button<{
$variant?: "primary" | "secondary" | "danger";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 38px;
  padding: 0 16px;
  border: 1px solid
    ${({ $variant }) =>
      $variant === "primary"
        ? "#2563eb"
        : $variant === "danger"
          ? "#ef4444"
          : "#e2e8f0"};
  border-radius: 8px;
  background: ${({ $variant }) =>
    $variant === "primary"
      ? "#2563eb"
      : $variant === "danger"
        ? "#ef4444"
        : "#ffffff"};
  color: ${({ $variant }) =>
    $variant === "primary" || $variant === "danger"
      ? "#ffffff"
      : "#64748b"};
  font-size: 11px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    opacity: 0.88;
  }
`;

export const HREmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 240px;
  color: #94a3b8;

  > svg {
    font-size: 28px;
    color: #cbd5e1;
  }

  strong {
    color: #64748b;
    font-size: 13px;
  }

  span {
    font-size: 11px;
  }
`;



