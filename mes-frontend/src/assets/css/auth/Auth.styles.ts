"use client";

import { css, keyframes } from "styled-components";

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const authEyebrow = css`
  margin: 0 0 12px;
  color: #2563eb;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
`;

export const authDescription = css`
  margin: 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.7;
`;

export const authFieldLabel = css`
  color: #334155;
  font-size: 13px;
  font-weight: 600;
`;

export const authPasswordToggle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  &:hover {
    color: #2563eb;
  }
`;

export const authSubmitButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 52px;
  margin-top: 6px;
  border: none;
  border-radius: 10px;
  background: #2563eb;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
  &:hover:not(:disabled) {
    background: #1d4ed8;
    transform: translateY(-1px);
  }
  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;
