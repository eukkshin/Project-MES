import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.h2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.5;
`;

export const ThemeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ThemeCard = styled.button<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 16px 18px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: ${({ $isSelected, theme }) =>
    $isSelected
      ? `2px solid ${theme.colors.primary.default}`
      : `1px solid ${theme.colors.border.default}`};
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary.subtle : theme.colors.bg.surface};
  box-shadow: ${({ $isSelected, theme }) =>
    $isSelected ? theme.shadows.elevated : theme.shadows.subtle};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.default};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.elevated};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.border.focus};
    outline-offset: 2px;
  }
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
`;

export const IconBadge = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 11px;
  font-size: 18px;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary.default : theme.colors.bg.canvas};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.text.inverse : theme.colors.primary.default};
  border: 1px solid
    ${({ $isSelected, theme }) =>
      $isSelected ? "transparent" : theme.colors.border.default};
  transition: all 0.2s ease;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const CardTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  strong {
    font-size: ${({ theme }) => theme.typography.fontSize.body};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const EnvTag = styled.span`
  padding: 2px 7px;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 11px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  background-color: ${({ theme }) => theme.colors.bg.canvas};
  color: ${({ theme }) => theme.colors.text.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
`;

export const CardDesc = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.4;
`;

export const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

/* 테마별 대표 컬러 3색 미리보기 스와치 */
export const SwatchGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 560px) {
    display: none;
  }
`;

export const ColorDot = styled.span<{ $bg: string }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ $bg }) => $bg};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
`;

export const CheckCircle = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 11px;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary.default : "transparent"};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: ${({ $isSelected, theme }) =>
    $isSelected ? "none" : `1.5px solid ${theme.colors.border.input}`};
  transition: all 0.2s ease;
`;

export const InfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.bg.canvas};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.text.secondary};

  strong {
    color: ${({ theme }) => theme.colors.primary.default};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  }
`;

export const ThemeInfoLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  svg {
    color: ${({ theme }) => theme.colors.primary.default};
    flex-shrink: 0;
  }
`;