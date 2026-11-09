'use client';
import styled from "styled-components";
import { motion } from 'motion/react';

export const ToastContainer = styled(motion.div)`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 99999;

  display: flex;
  align-items: center;
  gap: 14px;

  width: 360px;
  padding: 16px 18px;

  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);

  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 18px;

  box-shadow: 
    0 12px 32px rgba(15, 23, 42, 0.08), 
    0 2px 6px rgba(15, 23, 42, 0.03);
`;

export const ToastIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.12);
  color: #2563eb;
`;

export const ToastContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const ToastTitle = styled.div`
  font-size: 13.5px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ToastMessage = styled.div`
  font-size: 12.5px;
  color: #64748b;
  line-height: 1.4;
  letter-spacing: -0.3px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;

export const ToastCloseBtn = styled.button`
  flex-shrink: 0;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;

  /* 아주 연한 블루 틴트 그레이 */
  background: #eff6ff;
  color: #2563eb;

  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.2px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dbeafe;
  }

  &:active {
    transform: scale(0.96);
  }
`;

// export const ToastCloseBtn = styled.button`
//   flex-shrink: 0;
//   border: 1px solid #cbd5e1;
//   border-radius: 8px;
//   padding: 5px 12px;

//   background: transparent;
//   color: #475569;

//   font-size: 12px;
//   font-weight: 600;
//   letter-spacing: -0.2px;
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:hover {
//     background: rgba(15, 23, 42, 0.04);
//     border-color: #94a3b8;
//     color: #0f172a;
//   }

//   &:active {
//     transform: scale(0.96);
//   }
// `;