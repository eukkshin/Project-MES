import styled from "styled-components";

import { BoxShadow, FlexCenter, TransitionAll } from "../common/Common.styles";

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1.2rem;
  border: 1px solid #d1d3e2;
  border-radius: 10rem;
  outline: none;
  background-color: #fff;
  transition: all 0.15s ease-in-out;

  &:focus {
    border-color: #bac8f3;
    box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
  }

  &[readonly] {
    background-color: #eaecf4;
    cursor: default;
    user-select: none;
    &:focus {
      box-shadow: none;
    }
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -0.11rem;
    left: 1.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #4e73df;
  }

  &:not(:focus):not(:placeholder-shown) + label {
    color: #6e707e;
  }
`;

export const RadioGroup = styled.div`
  ${FlexCenter};
  gap: 1rem;
  padding: 0 1rem;
`;
export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: #6e707e;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  font-size: 0.8rem;
  color: #6e707e;
  cursor: pointer;
`;
