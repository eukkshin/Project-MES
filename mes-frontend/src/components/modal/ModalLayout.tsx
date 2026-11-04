"use client";

import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

import * as S from "@/assets/css/components/modal/ModalLayout.styles";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ANIMATION_DURATION = 250;

export default function ModalLayout({
  isOpen,
  onClose,
  title,
  children,
}: ModalLayoutProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setShouldRender(false);
    }, ANIMATION_DURATION);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!shouldRender) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldRender]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <S.ModalOverlay $isOpen={isOpen} onClick={onClose}>
      <S.ModalContainer
        $isOpen={isOpen}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <S.ModalHeader>
          <S.ModalTitle>{title}</S.ModalTitle>

          <S.CloseButton type="button" onClick={onClose} aria-label="닫기">
            <FaXmark />
          </S.CloseButton>
        </S.ModalHeader>

        <S.ModalBody>{children}</S.ModalBody>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
}
