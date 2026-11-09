"use client";

import {
  FaCircleCheck,
  FaCircleExclamation,
  FaCircleQuestion,
} from "react-icons/fa6";

import * as S from "@/assets/css/components/modal/Modal.styles";

interface AlertModalProps {
  isOpen: boolean;
  message: string;
  title?: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  onConfirm?: () => void;
}

export default function AlertModal({
  isOpen,
  message,
  type = "info",
  title,
  onClose,
  onConfirm,
}: AlertModalProps) {

  const isConfirm = !!onConfirm;

  return (
      <S.AlertBackdrop 
      onClick={onClose}
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      transition={{duration:0.15}}
      >
        <S.AlertContainer
          initial={{y:8, opacity:0}}
          animate={{y:0, opacity:1}}
          exit={{y:8, opacity:0}}
          transition={{ duration: 0.2 }}
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
              { title ?? (
                type === 'success'
                ? '완료'
                : type === 'error'
                ? '오류'
                : '알림'
              )}
            </S.AlertTitle>
  
            <S.AlertMessage>{message}</S.AlertMessage>
          </S.AlertContent>
  
          {isConfirm ? (
            <S.AlertButtonGroup>
              <S.AlertCancelButton onClick={onClose}>
                취소
              </S.AlertCancelButton>
  
              <S.AlertConfirmButton onClick={onConfirm}>
                확인
              </S.AlertConfirmButton>
            </S.AlertButtonGroup>
          ) : (
            <S.AlertSingleButton>
              <S.AlertButton onClick={onClose}>확인</S.AlertButton>
            </S.AlertSingleButton>
          )}
        </S.AlertContainer>
      </S.AlertBackdrop>
  );
}

