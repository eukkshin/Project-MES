
import React from 'react';
import { SelectItem, SelectList} from './CustomSelect.style'
import { useSelectContext } from './Select';


export default function SelectMenu({children}:{children?:React.ReactNode}){
    
    const {isOpen,options,handleSelect,value} = useSelectContext();
    
    if(!isOpen) return null;

    return(
        <>
        <SelectList>
            {options.map(opt=>(
                <SelectItem 
                key={opt.value} 
                onClick={()=>handleSelect(opt.value)}
                $isSelected={opt.value === value}>
                    {opt.label}
                </SelectItem>
            ))}
            {children}
        </SelectList>
        </>
    )
}