"use client";

import { useToastContext } from "@/context/ToastContext";
import { useGetMessagesReceived } from "@/hooks/useMessage";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useRef } from "react";

export default function MessageNotificationProvider({children,
}: {children: React.ReactNode;}) {

    const { showToast } =useToastContext();
    const isAuth = useAuthStore(state=> state.isAuth);
    const isInitialized = useAuthStore(state=> state.isInitialized);
    const { 
        data:receivedMessages=[], 
        isSuccess
    }= useGetMessagesReceived(isAuth && isInitialized);

    const knownMessageIds =  useRef<Set<number>|null>(null);
    
    useEffect(()=>{
        
    },[])
    
    
    return <>{children}</>;
}