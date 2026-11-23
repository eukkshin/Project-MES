"use client";

import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  height: 76px;
  padding: 0 36px;

  background: ${({ theme }) => theme.colors.bg.surface};
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: 66px;
    padding: 0 16px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
`;

export const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;

  color: #94a3b8;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.secondary};

  svg {
    flex-shrink: 0;
    font-size: 10px;
  }

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 480px) {
    span {
      display: none;
    }
    svg {
      display: none;
    }
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 38px;
  flex-shrink: 0;

  border-radius: 11px;
  background: #eff6ff;
  color: #2563eb;
  background: ${({ theme }) => theme.colors.primary.subtle};
  color: ${({ theme }) => theme.colors.primary.default};
  border: ${({theme})=> 
  theme.mode === 'light'
  ? 'none'
  : `1px solid ${theme.colors.border.default}`
  };
  font-size: 15px;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const UserInfoButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;

  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: inherit;

  strong {
    color: #172033;
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 13px;
    font-weight: 700;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  span {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 11px;
  }

  &:hover strong {
    color: ${({ theme }) => theme.colors.primary.default};
  }

  @media (max-width: 480px) {
    span {
      display: none;
    }
  }
`;

export const HeaderDivider = styled.div`
  width: 1px;
  height: 26px;
  margin: 0 8px;
  background: #e2e8f0;
  background: ${({ theme }) => theme.colors.border.default};

  @media (max-width: 480px) {
    display: none;
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;

  height: 38px;
  padding: 0 14px;

  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 9px;
  background: ${({ theme }) => theme.colors.bg.surface};

  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  font-family: inherit;
  cursor: pointer;

  &:hover {
    background: #fef2f2;
    border-color: #fecaca;
    color: #dc2626;
  }

  @media (max-width: 480px) {
    width: 36px;
    padding: 0;

    span {
      display: none;
    }
  }
`;
const isLightMode = (theme?: { mode?: string }) =>
  theme?.mode === "light" || !theme?.mode;

export const MobileMenuToggle = styled.button`
  display: none;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 38px;

  border-radius: 9px;

  border: 1px solid
    ${({ theme }) =>
      isLightMode(theme)
        ? "#e2e8f0"
        : theme?.colors?.border?.default ?? "#334155"};
  background: ${({ theme }) =>
    isLightMode(theme)
      ? "#ffffff"
      : theme?.colors?.bg?.surface ?? "#1e293b"};

  color: ${({ theme }) =>
    isLightMode(theme)
      ? "#334155"
      : theme?.colors?.text?.primary ?? "#f8fafc"};

  font-size: 17px;
  cursor: pointer;

  @media (max-width: 1024px) {
    display: flex;
  }
`;

export const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.55);

  @media (max-width: 700px) {
    display: none;
  }
  @media (min-width: 1025px) {
    display: none;
  }
`;

export const MobileDrawer = styled.aside`
  display: flex;
  flex-direction: column;

  width: min(250px, 75vw);
  height: 100%;

  background: #111e32;
  color: #ffffff;
  box-shadow: 12px 0 36px rgba(0, 0, 0, 0.2);
`;

export const MobileDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  min-height: 76px;
  padding: 0 22px;

  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (min-width: 1025px) {
    display: none;
  }
`;

export const MobileBrand = styled.a`
  display: flex;
  align-items: center;
  gap: 11px;

  color: #ffffff;
  font-size: 17px;
  font-weight: 800;
  text-decoration: none;

  svg {
    color: #60a5fa;
    font-size: 20px;
  }
`;

export const MobileCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);

  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
`;

export const MobileDrawerContent = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: 24px 14px;

  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.35) transparent;

  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(148, 163, 184, 0.35);
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(148, 163, 184, 0.35);
  }

`;

export const MobileMenuSection = styled.div`
  margin-bottom: 26px;
`;

export const MobileSectionTitle = styled.p`
  margin: 0 12px 12px;

  color: #8191a9;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
`;

export const MobileMenuLink = styled.a<{ $active: boolean }>`
  display: flex;
  align-items: center;

  min-height: 42px;
  padding: 0 14px;
  margin-bottom: 4px;

  border-radius: 8px;
  text-decoration: none;

  background: ${({ $active }) => ($active ? "#2563eb" : "transparent")};

  color: ${({ $active }) => ($active ? "#ffffff" : "#b8c5d6")};

  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};

  &:hover {
    background: ${({ $active }) =>
      $active ? "#2563eb" : "rgba(255,255,255,0.07)"};
    color: #ffffff;
  }
`;

export const MobileDrawerFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

export const MobileActionButton = styled.button<{
  $danger?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 12px;

  width: 100%;
  min-height: 42px;
  padding: 0 12px;

  border: none;
  border-radius: 8px;
  background: transparent;

  color: ${({ $danger }) => ($danger ? "#fca5a5" : "#cbd5e1")};

  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.07);
  }
`;

/* Footer */

export const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  min-height: 72px;
  padding: 16px 36px;

  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  background: ${({ theme }) => theme.colors.bg.surface};
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    padding: 20px 16px;
  }
`;

export const FooterInfo = styled.div`
  color: #94a3b8;
  font-size: 12px;
  line-height: 1.7;
  /* color: ${({ theme }) => theme.colors.text.secondary}; */
  font-size: ${({ theme }) => theme.typography.fontSize.caption};

  strong {
    color: #64748b;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  font-size: 12px;

  a {
    color: #94a3b8;
    text-decoration: none;

    &:hover {
      color: #2563eb;
    }
  }
`;


export const MessageButton = styled.button<{$unread:boolean, $count:string}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  background: transparent;
  background-color: #3b82f6;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #fff;
    color: #2563eb;
  }

  &::after{
    content: "${({$count})=> $count}";
    display: ${({$unread})=> $unread ? 'flex' : 'none'};
    position: absolute;
    top: -5px;
    right: -7px;
    min-width: 15px;
    height: 15px;
    padding: 0 4px;
    align-items: center;
    justify-content:center;

    border: 1px solid #fff;
    border-radius: 999px;
    background: #ef4444;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.15);
  }
`;