import styled, {keyframes} from "styled-components";

const modalCenterIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -60%) scale(0.9); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

const ringAnimation = keyframes`
  0% { transform: rotate(0deg); }
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-15deg); }
  60% { transform: rotate(10deg); }
  80% { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
`;

export const ToastContainer = styled.div`
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  z-index: 2147483647 !important;
  
  background-color: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding: 34px 44px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 420px;
  width: 90%;
  box-sizing: border-box;
  text-align: center;
  animation: ${modalCenterIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

export const ToastIcon = styled.div`
  font-size: 46px;
  line-height: 1;
  animation: ${ringAnimation} 0.6s ease-in-out infinite;
`;

export const ToastContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const ToastTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: -0.02em;
`;

export const ToastMessage = styled.div`
  font-size: 15px;
  color: #515154;
  line-height: 1.5;
  word-break: break-all;
`;

export const ToastCloseBtn = styled.button`
  margin-top: 12px;
  background-color: #0066cc;
  color: #ffffff;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  padding: 12px 32px;
  border-radius: 14px;
  width: 100%;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #0055b3;
  }
`;