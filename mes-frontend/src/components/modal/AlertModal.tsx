"use client";

import { useEffect, useState } from "react";
import {
  FaCircleCheck,
  FaCircleExclamation,
  FaCircleQuestion,
} from "react-icons/fa6";

import * as S from "@/assets/css/components/modal/Modal.styles";

interface AlertModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  onConfirm?: () => void;
}

export default function AlertModal({
  isOpen,
  title,
  message,
  type = "info",
  onClose,
  onConfirm,
}: AlertModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  /**
   * 모달 열기 / 닫기 상태
   */
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  /**
   * 모달 닫기
   */
  const handleClose = () => {
    if (isClosing) return;

    setIsClosing(true);

    setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, 200);
  };

  /**
   * 확인 버튼
   */
  const handleConfirm = () => {
    if (isClosing) return;

    setIsClosing(true);

    setTimeout(() => {
      setShouldRender(false);
      onConfirm?.();
    }, 200);
  };

  // 실제 DOM 제거
  if (!shouldRender) return null;

  const isConfirm = !!onConfirm;

  return (
    <S.AlertBackdrop $isClosing={isClosing} onClick={handleClose}>
      <S.AlertContainer
        $isClosing={isClosing}
        onClick={(e) => e.stopPropagation()}
      >
        <S.AlertIcon $type={type}>
          {type === "success" ? (
            <FaCircleCheck />
          ) : type === "error" ? (
            <FaCircleExclamation />
          ) : (
            <FaCircleQuestion />
          )}
        </S.AlertIcon>

        <S.AlertContent>
          <S.AlertTitle>
            {title ??
              (isConfirm
                ? "로그아웃 확인"
                : type === "success"
                  ? "처리 완료"
                  : type === "error"
                    ? "처리 실패"
                    : "알림")}
          </S.AlertTitle>

          <S.AlertMessage>{message}</S.AlertMessage>
        </S.AlertContent>

        {onConfirm ? (
          <S.AlertButtonGroup>
            <S.AlertCancelButton onClick={handleClose}>
              취소
            </S.AlertCancelButton>

            <S.AlertConfirmButton onClick={handleConfirm}>
              확인
            </S.AlertConfirmButton>
          </S.AlertButtonGroup>
        ) : (
          <S.AlertSingleButton>
            <S.AlertButton onClick={handleClose}>확인</S.AlertButton>
          </S.AlertSingleButton>
        )}
      </S.AlertContainer>
    </S.AlertBackdrop>
  );
}
