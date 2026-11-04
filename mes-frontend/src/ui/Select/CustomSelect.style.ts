import { NoDrag } from "@/assets/css/common/Common.styles";
import styled from "styled-components";


export const CustomSelectContainer = styled.div<{$isOpen?:boolean; $width?: string;}>`
  position: relative;
  width: ${props => props.$width || '100%'};
  z-index: ${props=> props.$isOpen ? 9999: 1 };
 
`;

export const SelectTrigger = styled.div<{ $height?:string; $isOpen?:boolean}>`
  box-sizing: border-box;
  height: ${props=> props.$height || 'auto'};
  width: 100%;
  min-width: 120px;

  padding: 10px 15px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid ${props => props.$isOpen ? '#2563eb' : '#e2e8f0'};

  font-size: 13px;
  font-family: inherit;
  color: #475569;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;
  ${NoDrag}

  > div svg {
    flex-shrink: 0;
    color: ${props => props.$isOpen ? '#2563eb' : '#94a3b8'};
    font-size: 12px;
  }

  > svg{
    transform: rotate(${({$isOpen})=> $isOpen ? '180deg': '0deg'});
    transition: transform 0.3s ease;
  }
  

 
`;

export const SelectTriggerLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

   > svg{
    font-size: 10px;
  }
`;

export const SelectList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;

  font-family: inherit;

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
  font-size: 0.8rem;
  color: #475569;
  
  font-family: inherit;
  white-space: nowrap;

  
  ${({$isSelected})=> $isSelected && `
    color: #2563eb;
    background-color: #eff6ff;
    font-weight: 600;
  ` } 

  &:hover{
    background-color: #f8fafc;
  }
`;

