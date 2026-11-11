import styled from "styled-components";
import { NoDrag } from "../Common.styles";

interface ActiveProps {
  $active?: boolean;
}

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 20px 0;
`;

export const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 32px;
  padding: 0 7px;
  background: #ffffff;
  border: 1px solid transparent;//#e2e8f0;
  border-radius: 9px;
  color: #475569;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background: #eff6ff;
    color: #2563eb;
    border-color: #bfdbfe;
  }

  &:disabled {
    background: #f8fafc;
    border-color: #e2e8f0;
    color: #cbd5e1;
    opacity: 0.6;
    cursor: default;
  }
`;

export const PageNumberGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${NoDrag}
`;

export const PageNumberBtn = styled.button<ActiveProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border-radius: 9px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  background-color: ${(props) => (props.$active ? '#2563eb' : '#ffffff')};
  color: ${(props) => (props.$active ? '#ffffff' : '#475569')};
  border: 1px solid ${(props) => (props.$active ? '#2563eb' : '#e2e8f0')};
  font-weight: ${(props) => (props.$active ? '700' : '500')};

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.$active ? '#1d4ed8' : '#eff6ff')};
    color: ${(props) => (props.$active ? '#ffffff' : '#2563eb')};
    border-color: ${(props) => (props.$active ? '#1d4ed8' : '#bfdbfe')};
  }
`;
