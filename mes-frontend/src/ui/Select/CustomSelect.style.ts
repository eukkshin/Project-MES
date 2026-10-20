import styled from "styled-components";


export const CustomSelectContainer = styled.div<{$isOpen?:boolean; $width?: string}>`
  position: relative;
  width: ${props => props.$width || '100%'};
  z-index: ${props=> props.$isOpen ? 9999: 1 };
`;

export const SelectTrigger = styled.div`
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 12px;
  font-family: inherit;
  color: #475569;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  &:hover{
      border-color: #bac8f3;
  }
`;

export const SelectList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;

  padding: 0; 
  margin: -1px 0 0 0;

  border-radius: 16px;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  list-style: none;
  box-shadow: 0 4px 6px rgba(0,0,0,.1);
  z-index: 99999;
  overflow: hidden;
  cursor: pointer;
`;

interface SelectItemProps {
    $isSelected?: boolean;
}

export const SelectItem = styled.li<SelectItemProps>`
  padding: 10px 20px;
  font-size: 0.85rem;
  color: #475569;
  
  ${({$isSelected})=> $isSelected && `
    color: #3b5998;
    background-color: #f8f9fc;
    font-weight: bold;
  ` } 

  &:hover{
    background-color: #f1f5f9;
  }
`;

