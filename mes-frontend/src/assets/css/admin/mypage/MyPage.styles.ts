import { motion } from "motion/react";
import styled from "styled-components";


export {
  PwContainer,
  PwCard,
  PwHeader,
  PwIcon,
  PwHeaderText,
  PwTitle,
  PwDescription,
  PwDivider,
  PwForm,
}from '@/assets/css/admin/mypage/ChangePassword.styles'
interface MyPageAnimationProps {
  $isClosing: boolean;
}

export const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.5);

  z-index: 999;
`;

export const MyPageContainer = styled(motion.div)`
  width: min(900px, calc(100vw - 32px));
  height: min(600px, calc(100vh - 32px));

  display: flex;
  min-width: 0;
  min-height: 0;

  background-color: ${({ theme }) => theme.colors.bg.elevated};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.modal};

  z-index: 1000;
  overflow: hidden;
  gap: 24px;

`;

export const MyPageSidebar = styled.div`
  width: 180px;
  background-color: ${({ theme }) => theme.colors.bg.canvas};
  border-right: 1px solid ${({ theme }) => theme.colors.border.default};
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SidebarMainTitle = styled.h2`
  margin: 0 12px;
  padding: 0 4px 20px 13px;
  font-size: ${({theme})=> theme.typography.fontSize.h2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.text.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;

export const SidebarDivider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  margin: 0 12px;
`;

export const SidebarSection = styled.div`
  margin-bottom: 24px;
`;

export const SidebarTitle = styled.h4`
  margin: 16px 0;
  padding: 0 12px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.disabled};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

interface SidebarItemProps {
  $isActive: boolean;
  $isLogout?: boolean;
}

export const SidebarItem = styled.li<SidebarItemProps>`
  display: block;
  padding: 10px;
  margin-left: 4px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.surface};
    color: ${({ $isLogout, theme }) =>
      $isLogout ? theme.colors.status.danger.text : theme.colors.primary.default};
    border-right: ${({ $isLogout, theme }) =>
      $isLogout
        ? `3px solid ${theme.colors.status.danger.text}`
        : `3px solid ${theme.colors.primary.default}`};
  }

  ${(props) =>
    props.$isActive &&
    `
      background-color: #e7f5ff;
      color: #2563eb;
      border-right: 3px solid #2563eb;
      font-weight: 600;

      &:hover {
        background-color: #e7f5ff;
        color: #2563eb;
        border-right: 3px solid #2563eb;
      }
    `}
  ${({ $isActive, theme }) =>
    $isActive &&
    `
      background-color: ${theme.colors.primary.subtle};
      color: ${theme.colors.primary.default};
      border-right: 3px solid ${theme.colors.primary.default};
      font-weight: 600;

      &:hover {
        background-color: ${theme.colors.primary.subtle};
        color: ${theme.colors.primary.default};
        border-right: 3px solid ${theme.colors.primary.default};
      }
    `}
`;

export const MT30 = styled.div`
  margin-top: 30px;
`;

export const MainContent = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 24px;
  overflow: hidden;
`;

export const ContentScroll = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 8px;
  padding-bottom: 70px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #dee2e6;
    background-color: ${({ theme }) => theme.colors.border.input};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #ced4da;
    background-color: ${({ theme }) => theme.colors.text.disabled};
  }
`;

export const ContentTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: ${({ theme }) => theme.typography.fontSize.h2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PopupList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  flex: 1;
`;

export const PopupItem = styled.li`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  cursor: pointer;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.bg.surface};

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.canvas};
  }

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  }
`;

export const Icon = styled.span`
  display: flex;
  align-items: center;
  font-size: 18px;
`;

export const ItemText = styled.span`
  padding-left: 10px;
  border-left: 1px solid ${({ theme }) => theme.colors.border.default};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 15px;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 5px;

  background-color: transparent;
  border: none;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 24px;
  font-weight: 500;

  cursor: pointer;

  transform: rotate(45deg);

  transition: transform 0.25s ease-in-out;

  &:hover {
    transform: rotate(135deg);
  }
`;

// DefaultInfo

export const DeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 4px;
`;

export const DeProfileCard = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bg.surface};
`;

export const DeProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 64px;
  height: 64px;

  flex-shrink: 0;

  border-radius: ${({ theme }) => theme.radius.circle};

  background-color: ${({ theme }) => theme.colors.primary.subtle};
  color: ${({ theme }) => theme.colors.primary.default};
  border: ${({theme})=> 
  theme.mode === 'light'
  ? 'transparent'
  : `1px solid ${theme.colors.border.default}`
  };
  font-size: 22px;
`;

export const DeProfileText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

export const DeUserName = styled.h4`
  margin: 0;

  font-size: 17px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const DeUserRole = styled.p`
  margin: 5px 0 0;

  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DeSection = styled.section`
  margin-top: 24px;
`;

export const DeSectionTitle = styled.h4`
  margin: 0 0 10px;

  font-size: 13px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DeInfoCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.bg.surface};

  overflow: hidden;
`;

export const DeInfoItem = styled.div`
  display: flex;
  align-items: center;

  min-height: 58px;

  padding: 10px 16px;

  background-color: ${({ theme }) => theme.colors.bg.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  & + & {
    border-top: 1px solid
      ${({ theme }) =>
        theme.mode === "light"
         ? theme.colors.border.default ?? "#e0e0e0"
         : "rgba(148, 163, 184, 0.16)"};
  }
`;

export const DeInfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;

  flex-shrink: 0;

  border-radius: 7px;

  background-color: ${({ theme }) => theme.colors.bg.canvas};
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 13px;
`;

export const DeInfoContent = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 12px;

  gap: 3px;
`;

export const DeInfoLabel = styled.span`
  font-size: 11px;
  font-weight: 500;

  color: ${({ theme }) => theme.colors.text.disabled};
`;

export const DeInfoValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: 500;

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const DeSecurityCard = styled.div`
  display: flex;
  align-items: center;

  gap: 14px;

  padding: 16px 18px;

  background-color: ${({ theme }) => theme.colors.bg.surface};

  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 10px;
`;

export const DeSecurityIcon = styled.div`
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.bg.canvas};

  border-radius: ${({ theme }) => theme.radius.md};

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 15px;

  flex-shrink: 0;
`;

export const DeSecurityContent = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4px;

  flex: 1;
`;

export const DeSecurityTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const DeSecurityDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.caption};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DeSecurityButton = styled.button`
  padding: 8px 14px;

  background-color: ${({ theme }) => theme.colors.bg.canvas};

  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 6px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  font-weight: 500;

  cursor: pointer;

  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.subtle};
    color: ${({ theme }) => theme.colors.primary.default};
  }
`;

export const DeEditActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  width: 100%;
  grid-column: 1 / -1;
`;

export const DeSaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: -10px;

  padding: 10px 22px;

  border: none;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.colors.primary.default};
  color: ${({ theme }) => theme.colors.text.inverse};

  font-size: 13px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};

  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border.input};
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;

interface DeEditFieldProps {
  $fullWidth?: boolean;
}

export const DeEditGrid = styled.form`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px 18px;

  padding: 5px 10px;
`;

export const DeEditField = styled.div<DeEditFieldProps>`
  display: flex;
  flex-direction: column;
  gap: 9px;

  min-width: 0;

  grid-column: ${({ $fullWidth }) => ($fullWidth ? "1 / -1" : "auto")};
`;

export const DeEditLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.text.secondary};

  svg {
    color: ${({ theme }) => theme.colors.text.disabled};
    font-size: 13px;
  }
`;

export const DeEditInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;

  border: 1px solid ${({ theme }) => theme.colors.border.input};
  border-radius: 7px;

  outline: none;
  background: ${({ theme }) => theme.colors.bg.surface};

  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 13px;

  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.border.focus};
  }
`;

export const InfoContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin-top: -30px;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  padding: 8px 0 24px;
`;

export const InfoCard = styled.div`
  width: 100%;
  max-width: 620px;
  min-width: 0;

  padding: 24px;
  box-sizing: border-box;

  background-color: ${({ theme }) => theme.colors.bg.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 10px;

  box-shadow: ${({ theme }) => theme.shadows.subtle};
`;
