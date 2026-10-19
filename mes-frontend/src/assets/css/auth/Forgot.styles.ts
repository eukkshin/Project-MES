"use client";

import styled from "styled-components";

import {
  authDescription,
  authEyebrow,
  authFieldLabel,
  authSubmitButton,
  fadeIn,
} from "./Auth.styles";

export const Container = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  box-sizing: border-box;
  background:
    radial-gradient(
      circle at 50% -20%,
      rgba(37, 99, 235, 0.07),
      transparent 55%
    ),
    #f8fafc;
  font-family: "Pretendard", sans-serif;
`;
export const Card = styled.section`
  width: 100%;
  max-width: 460px;
  padding: 40px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 16px 48px rgba(15, 23, 42, 0.035);
  animation: ${fadeIn} 0.45s ease both;
  @media (max-width: 480px) {
    padding: 28px 22px;
  }
`;
export const Eyebrow = styled.p`
  ${authEyebrow}
`;
export const Title = styled.h1`
  margin: 0 0 12px;
  color: #172033;
  font-size: clamp(26px, 3vw, 32px);
  font-weight: 800;
  letter-spacing: -1px;
`;
export const Description = styled.p`
  ${authDescription}
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 32px;
`;
export const FieldLabel = styled.label`
  ${authFieldLabel}
`;
export const Input = styled.input`
  width: 100%;
  height: 52px;
  padding: 0 16px;
  box-sizing: border-box;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  background: #ffffff;
  color: #172033;
  font-size: 14px;
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
export const SubmitButton = styled.button`
  ${authSubmitButton}
  margin-top: 10px;
`;
export const BottomText = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 28px;
  color: #64748b;
  font-size: 13px;
  a {
    color: #2563eb;
    font-weight: 700;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
