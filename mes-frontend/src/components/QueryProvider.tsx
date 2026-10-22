
'use client'

import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/api/http"

import { useAlertStore } from "@/store/useAlertStore";
import AlertModal from "@/ui/modal/AlertModal";

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
    )
  }
