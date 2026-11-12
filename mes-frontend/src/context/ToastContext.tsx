'use client';

import Toast from "@/components/toast/Toast";
import {AnimatePresence} from 'motion/react'
import * as S from '@/assets/css/components/Toastalarm.style'
import { createContext, useCallback, useContext, useState } from "react";

type ToastType = 'success' | 'error' | 'info';

export interface ToastInfo{
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextType{
    showToast: (message:string, type?:ToastType) => void;
}
const ToastContext = createContext<ToastContextType|undefined>(undefined);

export default function ToastProvider({children}:{children:React.ReactNode}){

    const [toasts, setToasts]= useState<ToastInfo[]>([]);

    const showToast = useCallback((message:string, type: ToastType = "info")=>{
        const id = Date.now()+Math.random();
        
        setToasts(prev=> [
            ...prev, { id, message,type,},
        ]);

        window.setTimeout(()=>{
            setToasts(prev=> prev.filter(toast=> toast.id !== id))
        },3000)
    }, []);

    const closeToast = (id:number)=>{
        setToasts(prev=> prev.filter(toast => toast.id !==id));
    }
    
    return(

        <ToastContext.Provider value={{showToast}}>
            {children}
            <S.ToastWrapper >
                <AnimatePresence>
                    {toasts.map(toast => (
                    <Toast 
                    key={toast.id}
                    toast={toast} 
                    onClose={()=>closeToast(toast.id)}/>
                    ))}
                </AnimatePresence>
            </S.ToastWrapper>
        </ToastContext.Provider>
    )
}

export function useToastContext() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("ToastProvider 내부에서만 사용할 수 있습니다.");
    }

    return context;
}