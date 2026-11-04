"use client";

// import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";

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
      // $isClosing={isClosing} 
      onClick={onClose}
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      transition={{duration:0.15}}
      >
        <S.AlertContainer
          // $isClosing={isClosing}
          initial={{y:8, opacity:0}}
          animate={{y:0, opacity:1}}
          exit={{y:8, opacity:0}}
          transition={{ duration: 0.15 }}
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
              {/* {title ??
                (isConfirm
                  ? "로그아웃 확인"
                  : type === "success"
                    ? "처리 완료"
                    : type === "error"
                      ? "처리 실패"
                      : "알림")} */}
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


// const [isClosing, setIsClosing] = useState(false);
// const [shouldRender, setShouldRender] = useState(false);

// if(!isOpen) return null;

/**
 * 모달 열기 / 닫기 상태
 */
// useEffect(() => {
//   if (isOpen) {
//     setShouldRender(true);
//     setIsClosing(false);
//   }
// }, [isOpen]);

// /**
//  * 모달 닫기
//  */
// const handleClose = () => {
//   if (isClosing) return;

//   setIsClosing(true);

//   setTimeout(() => {
//     setShouldRender(false);
//     onClose();
//   }, 200);
// };

// /**
//  * 확인 버튼
//  */
// const handleConfirm = () => {
//   if (isClosing) return;

//   setIsClosing(true);

//   setTimeout(() => {
//     setShouldRender(false);
//     onConfirm?.();
//   }, 200);
// };

// // 실제 DOM 제거
// if (!shouldRender) return null;