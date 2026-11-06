import styled  from "styled-components";
import {motion} from 'motion/react'

export const ToastContainer = styled(motion.div)`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 99999;

  display: flex;
  align-items: center;
  gap: 14px;

  width: 360px;
  min-height: 80px;
  padding: 18px 20px;

  
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  
  border: 1px solid rgba(220, 224, 232, 0.9);
  border-radius: 16px;
  
  box-shadow:
  0 10px 35px rgba(35, 45, 75, 0.10),
  0 2px 8px rgba(35, 45, 75, 0.04);
  
  animation: slideIn 0.35s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const ToastIcon = styled.div`
  display: flex;
  align-items: center;
  line-height: 1;
`;

export const ToastContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ToastTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #4e73df;
  margin-bottom: 5px;
`;

export const ToastMessage = styled.div`
  font-size: 13px;
  color: #738277;
  line-height: 1.5;
  word-break: break-word;
`;

export const ToastCloseBtn = styled.button`
  flex-shrink: 0;
  border: none;
  border-radius: 8px;
  padding: 7px 12px;

  background: #eef2ff;
  color: #4e73df;

  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #dce5ff;
  }
`;