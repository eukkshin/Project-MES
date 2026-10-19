import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(8px);
  }
`;

interface ModalAnimationProps {
  $isOpen: boolean;
}

export const ModalOverlay = styled.div<ModalAnimationProps>`
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(3px);

  box-sizing: border-box;

  animation: ${({ $isOpen }) =>
    $isOpen
      ? css`
          ${fadeIn} 0.2s ease-out forwards
        `
      : css`
          ${fadeOut} 0.2s ease-in forwards
        `};

  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const ModalContainer = styled.div<ModalAnimationProps>`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 520px;
  max-height: min(85vh, 800px);

  overflow: hidden;

  background: #ffffff;
  border: 1px solid #e5eaf1;
  border-radius: 16px;

  box-shadow:
    0 20px 60px rgba(15, 23, 42, 0.16),
    0 4px 16px rgba(15, 23, 42, 0.05);

  animation: ${({ $isOpen }) =>
    $isOpen
      ? css`
          ${slideUp} 0.25s ease-out forwards
        `
      : css`
          ${slideDown} 0.2s ease-in forwards
        `};

  @media (max-width: 480px) {
    max-height: 90vh;
    border-radius: 13px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  flex-shrink: 0;

  padding: 22px 26px;

  border-bottom: 1px solid #edf0f5;

  @media (max-width: 480px) {
    padding: 18px 20px;
  }
`;

export const ModalTitle = styled.h3`
  margin: 0;

  color: #172033;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.4px;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 32px;
  height: 32px;

  border: none;
  border-radius: 8px;

  background: transparent;

  color: #94a3b8;
  font-size: 16px;

  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #334155;
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const ModalBody = styled.div`
  flex: 1;
  min-height: 0;

  padding: 24px 26px;

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
    border-radius: 999px;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }
`;
