import styled, {keyframes} from "styled-components";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const shrinkBar = keyframes`
  from { width: 100%; }
  to { width: 0%; }
`;

export const LiveAlertToast = styled.div`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 9999;
  overflow: hidden;

  display: flex;
  align-items: flex-start;
  gap: 12px;
  max-width: 380px;
  padding: 16px 18px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.bg.elevated};
  border: 1px solid rgba(255, 59, 48, 0.5);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(12px);
  animation: ${slideUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  /* 6초 타이머 인디케이터 바 */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    background-color: #ff3b30;
    animation: ${shrinkBar} 6s linear forwards;
  }

  strong {
    display: block;
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.status.danger.text};
    margin-bottom: 3px;
  }

  p {
    font-size: 12px;
    line-height: 1.45;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const AlertIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  font-size: 15px;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  color: #ff3b30;
`;

export const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: 2px;
  font-size: 14px;
  line-height: 1;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;