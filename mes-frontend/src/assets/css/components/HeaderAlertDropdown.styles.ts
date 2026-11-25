"use client";

import Link from "next/link";
import styled, { keyframes } from "styled-components";

const dropDownIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-6px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const DropdownWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

export const BellTrigger = styled.button<{ $hasUnread: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.bg.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.subtle};
    border-color: ${({ theme }) => theme.colors.primary.default};
    color: ${({ theme }) => theme.colors.primary.default};
  }
`;

export const UnreadDotBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: ${({ theme }) => theme.radius.round};
  background-color: ${({ theme }) => theme.colors.status.danger.text};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: 1.5px solid ${({ theme }) => theme.colors.bg.surface};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 15px;
  text-align: center;
  font-variant-numeric: tabular-nums;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: min(372px, calc(100vw - 24px));
  max-height: min(460px, 70dvh);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1200;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.bg.elevated};
  color: ${({ theme }) => theme.colors.text.primary};
  box-shadow: ${({ theme }) => theme.shadows.modal};
  animation: ${dropDownIn} 0.16s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};

  strong {
    display: block;
    font-size: 14px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  small {
    display: block;
    margin-top: 2px;
    font-size: ${({ theme }) => theme.typography.fontSize.caption};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const CloseIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.canvas};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const MenuList = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MenuItemCard = styled.article<{ $read: boolean }>`
  padding: 11px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ $read, theme }) =>
    $read ? theme.colors.bg.canvas : theme.colors.primary.subtle};
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const CategoryTag = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.default};
`;

export const AlertLink = styled(Link)`
  display: block;
  margin: 5px 0 6px;
  font-size: 13px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  line-height: 1.4;

  &:hover {
    text-decoration: underline;
  }
`;

export const ReadActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary.default};
  font-size: 11px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  cursor: pointer;
`;

export const EmptyBox = styled.div`
  padding: 28px 16px;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const MenuFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.bg.canvas};
  font-size: 11px;

  a {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.primary.default};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-variant-numeric: tabular-nums;
  }
`;