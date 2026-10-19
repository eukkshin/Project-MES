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

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  font-family: "Pretendard", sans-serif;
`;
export const BrandPanel = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 48%;
  min-height: 100vh;
  padding: 48px 56px;
  overflow: hidden;
  background:
    radial-gradient(circle at 80% 25%, rgba(37, 99, 235, 0.2), transparent 42%),
    linear-gradient(145deg, #101d35, #142744 70%, #0c1729);
  color: #ffffff;
  @media (max-width: 1024px) {
    width: 42%;
    padding: 36px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
export const BrandLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.5px;
`;
export const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #2563eb;
  color: white;
  font-size: 20px;
`;
export const BrandContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 540px;
  animation: ${fadeIn} 0.6s ease both;
`;
export const BrandBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  margin-bottom: 26px;
  border: 1px solid rgba(147, 197, 253, 0.2);
  border-radius: 100px;
  background: rgba(37, 99, 235, 0.12);
  color: #93c5fd;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
`;
export const BrandTitle = styled.h1`
  margin: 0 0 22px;
  font-size: clamp(32px, 3vw, 48px);
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -1.8px;
  span {
    color: #60a5fa;
  }
`;
export const BrandDescription = styled.p`
  margin: 0;
  color: #a9bbd2;
  font-size: 15px;
  line-height: 1.9;
`;
export const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 42px;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;
export const FeatureCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.045);
  color: #d7e3f3;
  font-size: 12px;
  font-weight: 500;
  i {
    color: #60a5fa;
    font-size: 16px;
  }
`;
export const BrandFooter = styled.div`
  position: relative;
  z-index: 1;
  color: #7d93b0;
  font-size: 12px;
`;
export const FormPanel = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 0;
  padding: 64px 32px;
  background: #ffffff;
  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;
export const FormContent = styled.div`
  width: 100%;
  max-width: 420px;
  animation: ${fadeIn} 0.45s ease both;
`;
export const MobileLogo = styled.div`
  display: none;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
  color: #172033;
  font-size: 20px;
  font-weight: 800;
  @media (max-width: 768px) {
    display: flex;
  }
`;
export const FormHeader = styled.div`
  margin-bottom: 38px;
`;
export const FormEyebrow = styled.p`
  ${authEyebrow}
`;
export const FormTitle = styled.h2`
  margin: 0 0 12px;
  color: #172033;
  font-size: clamp(26px, 3vw, 32px);
  font-weight: 800;
  letter-spacing: -1px;
`;
export const FormDescription = styled.p`
  ${authDescription}
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;
export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;
export const FieldLabel = styled.label`
  ${authFieldLabel}
`;
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  i:first-child {
    position: absolute;
    left: 16px;
    color: #94a3b8;
    font-size: 15px;
    pointer-events: none;
  }
`;
export const Input = styled.input`
  width: 100%;
  height: 52px;
  padding: 0 46px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  background: #ffffff;
  color: #172033;
  font-size: 14px;
  box-sizing: border-box;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  &::placeholder {
    color: #a0aec0;
  }
  &:hover {
    border-color: #cbd5e1;
  }
  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;
export const PasswordToggle = styled.button`
  ${authPasswordToggle}
  position: absolute;
  right: 14px;
`;
export const FormOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;
export const RememberLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 9px;
  color: #64748b;
  font-size: 13px;
  cursor: pointer;
  input {
    width: 16px;
    height: 16px;
    accent-color: #2563eb;
    cursor: pointer;
  }
`;
export const TextLink = styled.a`
  color: #2563eb;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
export const SubmitButton = styled.button`
  ${authSubmitButton}
`;
export const BottomText = styled.div`
  margin-top: 32px;
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
export const BottomFooter = styled.p`
  margin-top: 48px;
  text-align: center;
  color: #94a3b8;
  font-size: 11px;
`;
