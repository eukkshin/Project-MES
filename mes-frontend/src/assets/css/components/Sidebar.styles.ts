import styled from "styled-components";

export const AsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: #ffffff;
`;

export const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;

  min-height: 88px;
  padding: 0 24px;

  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  color: inherit;
  text-decoration: none;
  box-sizing: border-box;
`;

export const BrandIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 42px;
  height: 42px;

  border-radius: 12px;
  background: #2563eb;
  color: #ffffff;
  font-size: 19px;
`;

export const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  strong {
    color: #ffffff;
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.4px;
  }

  span {
    color: #8191a9;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 1.2px;
  }
`;

export const Navigation = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: 26px 14px;

  scrollbar-width: thin;
  scrollbar-color: #334155 transparent;
`;

export const MenuSection = styled.div`
  margin-bottom: 30px;
`;

export const SectionTitle = styled.p`
  margin: 0 12px 12px;

  color: #8191a9;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.2px;
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;

  margin: 0;
  padding: 0;
  list-style: none;
`;

export const MenuItem = styled.a<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 13px;

  width: 100%;
  min-height: 44px;
  padding: 0 14px;

  border-radius: 9px;
  box-sizing: border-box;

  background: ${({ $active }) => ($active ? "#2563eb" : "transparent")};

  color: ${({ $active }) => ($active ? "#ffffff" : "#a7b4c8")};

  text-decoration: none;
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};

  transition:
    background 0.2s ease,
    color 0.2s ease;

  > svg:first-child {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }

  > span {
    flex: 1;
  }

  > svg:last-child:not(:first-child) {
    width: 11px;
    height: 11px;
  }

  &:hover {
    background: ${({ $active }) =>
      $active ? "#2563eb" : "rgba(255,255,255,0.07)"};
    color: #ffffff;
  }
`;

export const SidebarBottom = styled.div`
  padding: 16px;
  margin-top: auto;
`;

export const SystemIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;

  padding: 14px 12px;
  border-radius: 10px;

  background: rgba(255, 255, 255, 0.05);
  color: #b8c5d6;

  font-size: 12px;
  font-weight: 500;
`;

export const Version = styled.p`
  margin: 12px 0 0;
  text-align: center;

  color: #64748b;
  font-size: 11px;
`;

export const StatusDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.12);
`;
