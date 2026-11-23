import styled from "styled-components";

export const PwContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  padding: 8px 0;
  margin-top: -30px;
`;

export const PwCard = styled.div`
  width: 100%;
  max-width: 620px;

  padding: 24px;

  background-color: ${({ theme }) => theme.colors.bg.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows.subtle};
`;

export const PwHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const PwIcon = styled.div`
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.bg.canvas};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.md};

  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 16px;

  flex-shrink: 0;

  > svg {
    position: relative;
    left: 2px; 
  }

`;

export const PwHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PwTitle = styled.h2`
  margin: 0;

  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PwDescription = styled.p`
  margin: 0;

  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const PwDivider = styled.div`
  width: 100%;
  height: 1px;

  margin: 20px 0;

  background-color: ${({ theme }) => theme.colors.border.default};
`;

export const PwForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PwField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const PwLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const PwInput = styled.input`
  width: 100%;
  height: 42px;

  padding: 0 13px;

  box-sizing: border-box;

  background-color: ${({ theme }) => theme.colors.bg.canvas};
  border: 1px solid ${({ theme }) => theme.colors.border.input};
  border-radius: 7px;

  outline: none;

  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.primary};

  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background-color 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.border.focus};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.border.focus};
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.mode === "light"
          ? "rgba(37, 99, 235, 0.12)"
          : "rgba(102, 163, 224, 0.2)"};
  }
`;

export const PwNotice = styled.div`
  padding: 13px 14px;

  background-color: ${({ theme }) => theme.colors.bg.canvas};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 7px;
`;

export const PwNoticeTitle = styled.div`
  margin-bottom: 4px;

  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const PwNoticeText = styled.p`
  margin: 0;

  font-size: 11px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const PwButton = styled.button`
  width: 100%;
  height: 42px;

  margin-top: 4px;

  border: none;
  border-radius: 7px;

  background-color: ${({ theme }) => theme.colors.primary.default};
  color: ${({ theme }) => theme.colors.text.inverse};

  font-size: 13px;
  font-weight: 500;

  cursor: pointer;

  transition:
    background-color 0.15s ease,
    transform 0.1s ease,
    filter 0.18s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }
  &:active:not(:disabled) {
      transform: translateY(1px);
    }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.border.input};
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;

export const PwValidation = styled.span<{ $isValid: boolean }>`
  font-size: 11px;
  font-weight: 500;

  color: ${({ theme, $isValid }) =>
    $isValid
      ? theme.colors.status.success.text
      : theme.colors.status.danger.text};
`;