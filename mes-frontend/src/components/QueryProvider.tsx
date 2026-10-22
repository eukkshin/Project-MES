
'use client'

import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/api/http"

import { useAlertStore } from "@/store/useAlertStore";
import AlertModal from "@/ui/modal/AlertModal";
import { AnimatePresence } from "motion/react";

export default function QueryAlertProvider ({children}:{children: React.ReactNode}){

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
