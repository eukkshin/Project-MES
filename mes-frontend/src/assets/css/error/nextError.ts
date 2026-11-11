
import styled from "styled-components";

export const ErrorContainer = styled.main`
  display: flex;
  align-items: center;

  flex-direction: column;
  padding-top: 190px;

  width: 100%;
  height: 100vh;

  box-sizing: border-box;

  background: #f6f8fc;

`;

export const ErrorCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 460px;
  padding: 48px 35px;

  border: 1px solid #e8edf5;
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.9);

  box-shadow:
    0 10px 40px rgba(30, 64, 175, 0.05),
    0 2px 8px rgba(15, 23, 42, 0.03);

  text-align: center;

  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 38px 22px;
  }
`;

export const ErrorIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 66px;
  height: 66px;
  margin-bottom: 22px;

  border: 1px solid #fee2e2;
  border-radius: 20px;

  background: #fff1f2;

  color: #ef4444;
  font-size: 25px;
`;

export const ErrorCode = styled.span`
  margin-bottom: 10px;

  color: #2563eb;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
`;

export const ErrorTitle = styled.h1`
  margin: 0;

  color: #172033;
  font-size: 21px;
  font-weight: 600;
  line-height: 1.5;

  word-break: keep-all;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const ErrorDescription = styled.p`
  margin: 13px 0 0;

  color: #94a3b8;
  font-size: 13px;
  line-height: 1.9;
`;

export const ErrorDigest = styled.span`
  margin-top: 22px;
  padding: 8px 12px;

  border: 1px solid #e9edf5;
  border-radius: 7px;

  background: #f8fafc;
  color: #94a3b8;

  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  margin-top: 26px;
`;

export const RetryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  height: 36px;
  padding: 0 13px;

  border: none;
  border-radius: 8px;

  background: #2563eb;
  color: #ffffff;

  font-size: 11px;
  font-weight: 700;
  font-family: inherit;

  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #1d4ed8;
  }
`;

export const HomeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  height: 36px;
  padding: 0 13px;

  border: 1px solid #e2e8f0;
  border-radius: 8px;

  background: #ffffff;
  color: #64748b;

  font-size: 11px;
  font-weight: 700;
  font-family: inherit;

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;
