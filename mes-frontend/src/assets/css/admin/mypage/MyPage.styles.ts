import styled from "styled-components";

interface MyPageAnimationProps {
  $isClosing: boolean;
}

export const Backdrop = styled.div<MyPageAnimationProps>`
  position: fixed;
  inset: 0;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.5);

  z-index: 999;

  animation: ${({ $isClosing }) =>
    $isClosing
      ? "fadeOut 0.2s ease-in forwards"
      : "fadeIn 0.25s ease-out forwards"};

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
  }
`;

export const MyPageContainer = styled.div<MyPageAnimationProps>`
  width: 900px;
  height: 600px;

  display: flex;

  min-width: 0;
  min-height: 0;

  background-color: #fff;

  border-radius: 0.5rem;

  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);

  z-index: 1000;

  overflow: hidden;

  gap: 24px;

  animation: ${({ $isClosing }) =>
    $isClosing
      ? "slideDown 0.2s ease-in forwards"
      : "slideUp 0.3s ease-out forwards"};

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
  }
`;

export const MyPageSidebar = styled.div`
  width: 180px;
  background-color: #f8f9fa;
  border-right: 1px solid #eee;
  padding: 24px 16px;
  padding-right: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SidebarMainTitle = styled.h2`
  padding: 0 0 24px 8px;
  font-size: 18px;
  font-weight: 600;
  color: #000;
  border-bottom: 1px solid #eee;
`;

export const SidebarDivider = styled.div`
  border-bottom: 1px solid #eee;
  margin: 0;
`;

export const SidebarSection = styled.div`
  margin-bottom: 24px;
`;

export const SidebarTitle = styled.h4`
  margin: 16px 0 16px 0;
  font-size: 12px;
  color: #adb5bd;
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
  padding: 10px 0;
  margin-left: 4px;
  color: #475569;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #f1f5f9;
    color: ${({ $isLogout }) => ($isLogout ? "#fa5252" : "#2563eb")};
    border-right: ${({ $isLogout }) =>
      $isLogout ? "3px solid #fa5252" : "3px solid #2563eb"};
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
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #ced4da;
  }
`;

export const ContentTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export const PopupList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  flex: 1;
`;

export const PopupItem = styled.li`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  cursor: pointer;
  gap: 10px;
  background-color: #fff;

  &:hover {
    background-color: #f9f9f9;
  }

  & + & {
    border-top: 1px solid #eee;
  }
`;

export const Icon = styled.span`
  display: flex;
  align-items: center;
  font-size: 18px;
`;

export const ItemText = styled.span`
  padding-left: 10px;
  border-left: 1px solid #e0e0e0;
  color: #333;
  font-size: 15px;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 5px;

  background-color: transparent;
  border: none;

  color: #000;

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
  border: 1px solid #e9ecef;
  border-radius: 10px;
  background: #fff;
`;

export const DeProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 64px;
  height: 64px;

  flex-shrink: 0;

  border-radius: 50%;

  background-color: #e7f5ff;
  color: #2563eb;

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
  font-weight: 600;

  color: #212529;
`;

export const DeUserRole = styled.p`
  margin: 5px 0 0;

  font-size: 13px;
  color: #868e96;
`;

export const DeSection = styled.section`
  margin-top: 24px;
`;

export const DeSectionTitle = styled.h4`
  margin: 0 0 10px;

  font-size: 13px;
  font-weight: 600;

  color: #495057;
`;

export const DeInfoCard = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 10px;

  background-color: #fff;

  overflow: hidden;
`;

export const DeInfoItem = styled.div`
  display: flex;
  align-items: center;

  min-height: 58px;

  padding: 10px 16px;

  & + & {
    border-top: 1px solid #f1f3f5;
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

  background-color: #f8f9fa;
  color: #868e96;

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

  color: #adb5bd;
`;

export const DeInfoValue = styled.span`
  font-size: 14px;
  font-weight: 500;

  color: #343a40;
`;

export const DeSecurityCard = styled.div`
  display: flex;
  align-items: center;

  gap: 14px;

  padding: 16px 18px;

  background-color: #fff;

  border: 1px solid #e9ecef;
  border-radius: 10px;
`;

export const DeSecurityIcon = styled.div`
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #f8f9fa;

  border-radius: 8px;

  color: #495057;

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
  font-size: 14px;
  font-weight: 600;

  color: #343a40;
`;

export const DeSecurityDescription = styled.div`
  font-size: 12px;

  color: #868e96;
`;

export const DeSecurityButton = styled.button`
  padding: 8px 14px;

  background-color: #f1f3f5;

  border: none;
  border-radius: 6px;

  color: #495057;

  font-size: 12px;
  font-weight: 500;

  cursor: pointer;

  transition: background-color 0.15s ease;

  &:hover {
    background-color: #e9ecef;
  }
`;
