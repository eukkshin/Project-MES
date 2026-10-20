'use client';

import { useState } from 'react';
import { createContext, useContext } from 'react';
import { CustomSelectContainer} from './CustomSelect.style'
import SelectToggle from './SelectToggle';
import SelectMenu from './SelectMenu';

interface Option{
    label: string;
    value: string;
}
interface CustomSelectProps{
    id: string;
    options: Option[];
    value: string;
    width?: string;
    onChange: (value:string)=> void;
    placeholder?:string;
    children: React.ReactNode;
    openSelectId?: string|null; //부모상태
    setOpenSelectId?: React.Dispatch<React.SetStateAction<string|null>>
}

interface SelectContextType{
    selectedLabel: string;
    options: Option[];
    value: string;
    handleSelect: (value:string)=>void;
    isOpen: boolean;
    handleToggle: ()=> void;
}
const SelectContext = createContext<SelectContextType|null>(null);

export const useSelectContext = ()=>{
    const ctx = useContext(SelectContext);
    if(!ctx){
        throw new Error('Select와 연관된 컴포넌트여야합니다')
    }
    return ctx;
}

export const Select = ({
    options, value, onChange, placeholder='선택해주세요',
    id, openSelectId, setOpenSelectId, width, children
}: CustomSelectProps)=>{

    //부모가 안 주면 자체적으로 쓸 수 있게 
    const [internalOpenId, setInternalOpenId] = useState<string | null>(null);

    const currentOpenId = openSelectId !== undefined ? openSelectId : internalOpenId
    const setCurrentOpenId = setOpenSelectId !== undefined ? setOpenSelectId :setInternalOpenId
    
    const isOpen = currentOpenId === id;

    const handleToggle = ()=>{
        setCurrentOpenId(prev=> prev === id ? null : id)
    }

    const handleSelect = (value:string)=>{
        onChange(value)
        setCurrentOpenId(null) //닫기
    }

    const selectedLabel= options.find(opt=> opt.value === value)?.label || placeholder;

    const selectValue={
        selectedLabel,
        options,
        value,
        handleSelect,
        isOpen,
        handleToggle
    }
    
    return(
        <SelectContext.Provider value={selectValue}>
         <CustomSelectContainer $isOpen={isOpen} $width={width}>
            {children}
        </CustomSelectContainer>
        </SelectContext.Provider>
    )
}

Select.Toggle = SelectToggle
Select.Menu = SelectMenu