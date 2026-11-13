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

    //이미 확인한 쪽지 ID 저장하기
    const knownMessageIds =  useRef<Set<number>|null>(null);
    
    useEffect(()=>{
        if(!isSuccess) return;

        if(knownMessageIds.current === null){
            knownMessageIds.current = new Set(receivedMessages.map(message=> message.id))
            return;
        }

        const newMessages = receivedMessages.filter(message=> !knownMessageIds.current!.has(message.id))

        //새 쪽지 알림
        newMessages.forEach(message=> {
            showToast(`${message.senderName}님에게 새 쪽지가 도착했습니다`)
        })

        newMessages.forEach(message=>{
            knownMessageIds.current!.add(message.id);
        });
    },[receivedMessages, isSuccess, showToast])
    
    
    return <>{children}</>;
}