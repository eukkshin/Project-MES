"use client";

import styled from "styled-components";

import {
  authDescription,
  authEyebrow,
  authFieldLabel,
  authPasswordToggle,
  authSubmitButton,
  fadeIn,
} from "./Auth.styles";

export const Container = styled.main`
  min-height: 100vh;

  padding: 28px 24px 80px;

  background:
    radial-gradient(
      circle at 50% -20%,

      rgba(37, 99, 235, 0.07),
      transparent 55%
    ),
    #f8fafc;

  font-family: "Pretendard", sans-serif;

  @media (max-width: 768px) {
    padding: 20px 16px 48px;
  }
`;

export const Header = styled.header`
  display: flex;

  align-items: center;

  justify-content: space-between;

  width: 100%;

  max-width: 1200px;

  margin: 0 auto;
`;

export const BrandLogo = styled.a`
  display: inline-flex;

  align-items: center;

  gap: 12px;

  color: #172033;

  font-size: 19px;

  font-weight: 800;

  letter-spacing: -0.5px;

  text-decoration: none;
`;

export const LogoIcon = styled.span`
  display: flex;

  align-items: center;

  justify-content: center;

  width: 42px;

  height: 42px;

  border-radius: 12px;

  background: #2563eb;

  color: #fff;

  font-size: 19px;
`;

export const HeaderLink = styled.a`
  color: #64748b;

  font-size: 13px;

  text-decoration: none;

  span {
    margin-left: 6px;

    color: #2563eb;

    font-weight: 700;
  }

  &:hover span {
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const Content = styled.div`
  width: 100%;

  max-width: 600px;

  margin: 68px auto 0;

  animation: ${fadeIn} 0.45s ease both;

  @media (max-width: 768px) {
    margin-top: 48px;
  }
`;

export const Intro = styled.div`
  margin-bottom: 36px;
`;

export const Eyebrow = styled.p`
  ${authEyebrow}
`;

export const Title = styled.h1`
  margin: 0 0 12px;

  color: #172033;

  font-size: clamp(28px, 4vw, 36px);

  font-weight: 800;

  letter-spacing: -1.3px;
`;

export const Description = styled.p`
  ${authDescription}
`;

export const Stepper = styled.div`
  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 12px;

  margin-bottom: 24px;
`;

export const StepItem = styled.div<{
  $active: boolean;

  $completed: boolean;
}>`
  display: flex;

  flex-direction: column;

  gap: 11px;

  min-width: 0;

  &::before {
    content: "";

    display: block;

    width: 100%;

    height: 4px;

    border-radius: 100px;

    background: ${({ $active, $completed }) =>
      $active || $completed ? "#2563eb" : "#e2e8f0"};

    transition: background 0.2s ease;
  }
`;

export const StepLabel = styled.div<{ $active: boolean }>`
  display: flex;

  align-items: center;

  gap: 7px;

  color: ${({ $active }) => ($active ? "#172033" : "#94a3b8")};

  font-size: 12px;

  font-weight: ${({ $active }) => ($active ? 700 : 500)};

  i {
    color: #2563eb;

    font-size: 13px;
  }
`;

export const StepNumber = styled.span<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? "#2563eb" : "#94a3b8")};

  font-weight: 700;
`;

export const Card = styled.section`
  padding: 36px;

  border: 1px solid #e2e8f0;

  border-radius: 18px;

  background: #ffffff;

  box-shadow: 0 16px 48px rgba(15, 23, 42, 0.035);

  @media (max-width: 768px) {
    padding: 26px 20px;
  }
`;

export const CardHeader = styled.div`
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 16px;

  margin-bottom: 30px;
`;

export const CardTitle = styled.h2`
  margin: 0 0 8px;

  color: #172033;

  font-size: 21px;

  font-weight: 800;

  letter-spacing: -0.5px;
`;

export const CardDescription = styled.p`
  margin: 0;

  color: #64748b;

  font-size: 13px;

  line-height: 1.6;
`;

export const StepCount = styled.span`
  flex-shrink: 0;

  padding-top: 4px;

  color: #94a3b8;

  font-size: 12px;

  font-weight: 600;
`;

export const Form = styled.form`
  display: flex;

  flex-direction: column;
`;

export const FormGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 22px 16px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div<{ $full?: boolean }>`
  display: flex;

  flex-direction: column;

  gap: 9px;

  min-width: 0;

  grid-column: ${({ $full }) => ($full ? "1 / -1" : "auto")};
`;

export const FieldLabel = styled.label`
  ${authFieldLabel}
`;

export const InputWrapper = styled.div`
  display: flex;

  align-items: center;

  width: 100%;

  height: 52px;

  padding: 0 16px;

  gap: 12px;

  border: 1px solid #e2e8f0;

  border-radius: 10px;

  background: #ffffff;

  box-sizing: border-box;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  > svg:first-child {
    flex-shrink: 0;

    width: 16px;

    height: 16px;

    color: #94a3b8;
  }

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus-within:not(:has(input:read-only)) {
    border-color: #2563eb;

    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);

    > svg:first-child {
      color: #2563eb;
    }
  }

  &:has(input:read-only) {
    background: #f8fafc;
  }
`;

export const Input = styled.input`
  flex: 1;

  min-width: 0;

  width: 100%;

  height: 100%;

  padding: 0;

  border: none;

  outline: none;

  background: transparent;

  color: #172033;

  font-size: 14px;

  font-family: inherit;

  &::placeholder {
    color: #a0aec0;
  }

  &:focus {
    outline: none;
  }

  &:read-only {
    cursor: default;
  }
`;

export const PasswordToggle = styled.button`
  ${authPasswordToggle}
  flex-shrink: 0;
  padding: 0;
`;

export const HelperText = styled.p<{ $error?: boolean }>`
  margin: 0;

  color: ${({ $error }) => ($error ? "#dc2626" : "#94a3b8")};

  font-size: 12px;

  line-height: 1.6;
`;

export const RadioGroup = styled.div`
  display: flex;

  align-items: center;

  flex-wrap: wrap;

  gap: 18px;

  min-height: 40px;
`;

export const RadioLabel = styled.label`
  display: inline-flex;

  align-items: center;

  gap: 8px;

  color: #475569;

  font-size: 13px;

  cursor: pointer;

  input {
    width: 16px;

    height: 16px;

    margin: 0;

    accent-color: #2563eb;

    cursor: pointer;
  }
`;

export const AddressRow = styled.div`
  display: flex;

  align-items: center;

  gap: 10px;

  width: 100%;

  min-width: 0;

  ${InputWrapper} {
    flex: 1;

    min-width: 0;
  }

  @media (max-width: 480px) {
    flex-direction: column;

    align-items: stretch;
  }
`;

export const AddressButton = styled.button`
  flex-shrink: 0;

  height: 52px;

  padding: 0 18px;

  border: 1px solid #dbeafe;

  border-radius: 10px;

  background: #eff6ff;

  color: #2563eb;

  font-size: 13px;

  font-weight: 700;

  font-family: inherit;

  cursor: pointer;

  &:hover {
    background: #dbeafe;
  }
`;

export const Divider = styled.div`
  width: 100%;

  height: 1px;

  margin: 32px 0 24px;

  background: #e2e8f0;
`;

export const ButtonRow = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 12px;
`;

export const BackButton = styled.button`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  height: 52px;

  padding: 0 22px;

  border: 1px solid #e2e8f0;

  border-radius: 10px;

  background: #ffffff;

  color: #475569;

  font-size: 14px;

  font-weight: 700;

  font-family: inherit;

  cursor: pointer;

  &:hover {
    background: #f8fafc;
  }
`;

export const SubmitButton = styled.button`
  ${authSubmitButton}
  display: inline-flex;
  min-width: 155px;
  width: auto;
  padding: 0 24px;
  margin-top: 0;
  font-family: inherit;

  @media (max-width: 480px) {
    min-width: 0;
    flex: 1;
  }
`;

export const BottomText = styled.div`
  margin-top: 28px;

  text-align: center;

  color: #64748b;

  font-size: 13px;

  a {
    margin-left: 6px;

    color: #2563eb;

    font-weight: 700;

    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Footer = styled.p`
  margin: 48px 0 0;

  text-align: center;

  color: #94a3b8;

  font-size: 11px;
`;
