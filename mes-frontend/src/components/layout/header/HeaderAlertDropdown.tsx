"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiBell, FiCheck, FiX } from "react-icons/fi";
import * as S from '@/assets/css/components/HeaderAlertDropdown.styles'

export type HeaderAlertCategory = "EQUIPMENT" | "QUALITY" | "SCM";

export interface HeaderAlertItem {
  id: number | string;
  category: HeaderAlertCategory;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

interface HeaderAlertDropdownProps {
  items: HeaderAlertItem[];
  onMarkRead?: (id: number | string) => void;
}

const getTargetPath = (category: HeaderAlertCategory) => {
  if (category === "EQUIPMENT") return "/admin/cleanroom";
  if (category === "QUALITY") return "/admin/quality";
  return "/admin/components";
};

export default function HeaderAlertDropdown({
  items,
  onMarkRead,
}: HeaderAlertDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  const unreadCount = items.filter((item) => !item.isRead).length;

  return (
    <S.DropdownWrapper ref={wrapperRef}>
      <S.BellTrigger
        type="button"
        $hasUnread={unreadCount > 0}
        aria-label={
          unreadCount > 0
            ? `실시간 알림, 읽지 않은 항목 ${unreadCount}개`
            : "실시간 알림"
        }
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <FiBell size={17} />
        {unreadCount > 0 && (
          <S.UnreadDotBadge>
            {unreadCount > 99 ? "99+" : unreadCount}
          </S.UnreadDotBadge>
        )}
      </S.BellTrigger>

      {open && (
        <S.DropdownMenu role="region" aria-label="실시간 알림 드롭다운">
          <S.MenuHeader>
            <div>
              <strong>실시간 관제 알림</strong>
              <small>설비 · 품질 · 재고 이상 징후</small>
            </div>
            <S.CloseIconButton
              type="button"
              aria-label="알림 메뉴 닫기"
              onClick={() => setOpen(false)}
            >
              <FiX size={15} />
            </S.CloseIconButton>
          </S.MenuHeader>

          <S.MenuList>
            {items.length === 0 ? (
              <S.EmptyBox>현재 감지된 실시간 알림이 없습니다.</S.EmptyBox>
            ) : (
              items.map((item) => (
                <S.MenuItemCard key={item.id} $read={item.isRead}>
                  <S.MetaRow>
                    <S.CategoryTag>{item.category}</S.CategoryTag>
                    <time>{item.createdAt}</time>
                  </S.MetaRow>
                  <S.AlertLink
                    href={getTargetPath(item.category)}
                    onClick={() => {
                      onMarkRead?.(item.id);
                      setOpen(false);
                    }}
                  >
                    {item.title}: {item.message}
                  </S.AlertLink>
                  {!item.isRead && (
                    <S.ReadActionButton
                      type="button"
                      onClick={() => onMarkRead?.(item.id)}
                    >
                      <FiCheck size={12} /> 읽음 처리
                    </S.ReadActionButton>
                  )}
                </S.MenuItemCard>
              ))
            )}
          </S.MenuList>

          <S.MenuFooter>
            <Link href="/admin/dashboard" onClick={() => setOpen(false)}>
              관제 대시보드 보기
            </Link>
            <span>미확인 {unreadCount}건</span>
          </S.MenuFooter>
        </S.DropdownMenu>
      )}
    </S.DropdownWrapper>
  );
}
