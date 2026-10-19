import styled from "styled-components";

export const PwContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  padding: 8px 0;
`;

export const PwCard = styled.div`
  width: 100%;
  max-width: 620px;

  padding: 24px;

  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 10px;
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

  background-color: #f8f9fa;
  border-radius: 8px;

  color: #495057;
  font-size: 16px;

  flex-shrink: 0;
`;

export const PwHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PwTitle = styled.h2`
  margin: 0;

  font-size: 16px;
  font-weight: 600;
  color: #343a40;
`;

export const PwDescription = styled.p`
  margin: 0;

  font-size: 12px;
  color: #868e96;
`;

export const PwDivider = styled.div`
  width: 100%;
  height: 1px;

  margin: 20px 0;

  background-color: #f1f3f5;
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
  color: #495057;
`;

export const PwInput = styled.input`
  width: 100%;
  height: 42px;

  padding: 0 13px;

  box-sizing: border-box;

  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 7px;

  outline: none;

  font-size: 13px;
  color: #343a40;

  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &::placeholder {
    color: #adb5bd;
  }

  &:hover {
    border-color: #ced4da;
  }

  &:focus {
    border-color: #94a3b8;
    box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.12);
  }
`;

export const PwNotice = styled.div`
  padding: 13px 14px;

  background-color: #f8f9fa;
  border: 1px solid #f1f3f5;
  border-radius: 7px;
`;

export const PwNoticeTitle = styled.div`
  margin-bottom: 4px;

  font-size: 12px;
  font-weight: 600;
  color: #495057;
`;

export const PwNoticeText = styled.p`
  margin: 0;

  font-size: 11px;
  line-height: 1.5;
  color: #868e96;
`;

export const PwButton = styled.button`
  width: 100%;
  height: 42px;

  margin-top: 4px;

  border: none;
  border-radius: 7px;

  background-color: #2563eb;
  color: #ffffff;

  font-size: 13px;
  font-weight: 500;

  cursor: pointer;

  transition:
    background-color 0.15s ease,
    transform 0.1s ease;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #adb5bd;
    cursor: not-allowed;
  }
`;

export const PwValidation = styled.span<{ $isValid: boolean }>`
  font-size: 11px;
  font-weight: 500;

  color: ${({ $isValid }) => ($isValid ? "#2f9e44" : "#e03131")};
`;
