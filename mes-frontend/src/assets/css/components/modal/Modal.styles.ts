import { motion } from 'motion/react'
import styled from "styled-components";

interface AlertAnimationProps {
  $isClosing?: boolean;
}

export const AlertBackdrop = styled(motion.div)<AlertAnimationProps>`
  position: fixed;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(15, 23, 42, 0.35);

  z-index: 10000;

  /* animation: ${({ $isClosing }) =>
    $isClosing
      ? "fadeOut 0.2s ease-in forwards"
      : "fadeIn 0.15s ease-out forwards"};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  } */
`;

export const AlertContainer = styled(motion.div)<AlertAnimationProps>`
  width: 360px;

  padding: 28px 28px 24px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: #ffffff;

  border: 1px solid #e9ecef;
  border-radius: 12px;

  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.05);

  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: opacity;

  /* animation: ${({ $isClosing }) =>
    $isClosing
      ? "slideDown 0.2s ease-in forwards"
      : "slideUp 0.2s ease-out forwards"};

  @keyframes slideUp {
    from {
      transform: translateY(8px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }

    to {
      transform: translateY(8px);
      opacity: 0;
    }
  } */
`;

export const AlertIcon = styled.div<{
  $type: "success" | "error" | "info";
}>`
  width: 46px;
  height: 46px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 16px;

  border-radius: 50%;

  background: ${({ $type }) =>
    $type === "success"
      ? "#ecfdf3"
      : $type === "error"
        ? "#fef2f2"
        : "#eff6ff"};

  color: ${({ $type }) =>
    $type === "success"
      ? "#16a34a"
      : $type === "error"
        ? "#dc2626"
        : "#2563eb"};

  font-size: 20px;
`;

export const AlertContent = styled.div`
  width: 100%;
  text-align: center;
`;

export const AlertTitle = styled.h3`
  margin: 0 0 7px;

  color: #343a40;

  font-size: 15px;
  font-weight: 600;
`;

export const AlertMessage = styled.p`
  margin: 0;

  color: #868e96;

  font-size: 13px;
  line-height: 1.6;

  word-break: keep-all;
`;

export const AlertButtonGroup = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  gap: 8px;
  margin-top: 22px;
`;

export const AlertButton = styled.button`
  width: 100%;
  height: 40px;

  padding: 0 16px;

  border: none;
  border-radius: 7px;

  background: #2563eb;
  color: #ffffff;

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;

export const AlertConfirmButton = styled(AlertButton)`
  flex: 1;
  min-width: 0;
`;

export const AlertCancelButton = styled.button`
  flex: 1;
  min-width: 0;

  height: 40px;

  padding: 0 16px;

  border: 1px solid #dee2e6;
  border-radius: 7px;

  background: #ffffff;
  color: #495057;

  font-size: 13px;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    background: #f8f9fa;
  }
`;

export const AlertSingleButton = styled.div`
  width: 100%;
  margin-top: 28px;
`;
