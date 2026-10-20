
import React from 'react';
import { SelectTrigger, SelectTriggerLeft} from './CustomSelect.style'
import { useSelectContext } from './Select';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';


export default function SelectToggle({height,children}:{height?:string;children?:React.ReactNode}){
    
    const {isOpen, handleToggle, selectedLabel} = useSelectContext();
    
    return(
        <>
        <SelectTrigger onClick={handleToggle} $height={height} $isOpen={isOpen}>
            <SelectTriggerLeft>
                {children}
                {selectedLabel}
            </SelectTriggerLeft>
            <span>
                {isOpen ? <FaChevronUp fontSize={10}/> : <FaChevronDown fontSize={10}/>}
            </span>
        </SelectTrigger>
        </>
    )
}