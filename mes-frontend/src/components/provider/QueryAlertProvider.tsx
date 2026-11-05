'use client'

import { useEffect, useState } from "react";
import { QueryClientProvider, QueryClient} from "@tanstack/react-query"
import { useAlertStore } from "@/store/useAlertStore";
import { useAuthStore } from "@/store/useAuthStore";
import AlertModal from "@/components/modal/AlertModal";
import { AnimatePresence } from "motion/react";

export default function QueryAlertProvider ({children}:{children: React.ReactNode}){
    
    const [queryClient] = useState(() => new QueryClient());

    const initializeAuth = useAuthStore((state)=> state.initializeAuth)
    
    //앱시작할때 로그인 상태 복구
    useEffect(()=>{
        initializeAuth();
    },[initializeAuth])
    
    return(
        <QueryClientProvider client={queryClient}>
            {children}
            <GlobalAlert/>
        </QueryClientProvider>
    )
}

function GlobalAlert(){
    const{isOpen, onConfirm, message, title, type, hideAlert }=useAlertStore();
  
    return(
        <AnimatePresence mode="wait">
        {isOpen &&(
            <AlertModal
            isOpen={isOpen}
            message={message}
            title={title}
            type={type}
            onConfirm={()=>{
              if(onConfirm){
                onConfirm();
              }
              hideAlert();
            }}
            onClose={hideAlert}
            />
        )}
        </AnimatePresence>
    )
  }
