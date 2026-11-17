import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface StyledButtonProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
}

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary.default};
    color: ${({ theme }) => theme.colors.text.inverse};
    border: 1px solid ${({ theme }) => theme.colors.primary.default};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary.hover};
      border-color: ${({ theme }) => theme.colors.primary.hover};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.primary.subtle};
    color: ${({ theme }) => theme.colors.primary.default};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.border.default};
    }
  `,
  outline: css`
    background-color: ${({ theme }) => theme.colors.bg.surface};
    color: ${({ theme }) => theme.colors.text.primary};
    border: 1px solid ${({ theme }) => theme.colors.border.input};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.bg.canvas};
      border-color: ${({ theme }) => theme.colors.primary.default};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.status.danger.text};
    color: ${({ theme }) => theme.colors.text.inverse};
    border: 1px solid ${({ theme }) => theme.colors.status.danger.border};

    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `,
};

const sizeStyles = {
  sm: css`
    padding: 6px 12px;
    font-size: ${({ theme }) => theme.typography.fontSize.caption};
  `,
  md: css`
    padding: 8px 16px;
    font-size: ${({ theme }) => theme.typography.fontSize.body};
  `,
  lg: css`
    padding: 12px 20px;
    font-size: ${({ theme }) => theme.typography.fontSize.body};
  `,
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  ${({ $variant = 'primary' }) => variantStyles[$variant]}
  ${({ $size = 'md' }) => sizeStyles[$size]}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.border.focus};
    outline-offset: 2px;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.bg.canvas};
    color: ${({ theme }) => theme.colors.text.disabled};
    border-color: ${({ theme }) => theme.colors.border.default};
    cursor: not-allowed;
  }
`;