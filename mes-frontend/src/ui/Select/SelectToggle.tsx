
import React from 'react';
import { SelectTrigger} from './CustomSelect.style'
import { useSelectContext } from './Select';


export default function SelectToggle({children}:{children?:React.ReactNode}){
    
    const {isOpen, handleToggle, selectedLabel} = useSelectContext();
    
    return(
        <>
        <SelectTrigger onClick={handleToggle}>
            {selectedLabel}
            <span style={{fontSize:'0.7rem', color:'#94a3b8'}}>
                {isOpen ? '▲' : '▼'}
            </span>
            {children}
        </SelectTrigger>
        </>
    )
}