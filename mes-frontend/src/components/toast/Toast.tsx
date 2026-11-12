'use client';
import * as S from '@/assets/css/components/Toastalarm.style'
import type { ToastInfo } from '@/context/ToastContext';
import { FaCircleCheck, FaCircleInfo, FaCircleXmark } from 'react-icons/fa6';

interface ToastProps{
    toast: ToastInfo;
    onClose: ()=>void;
}
export default function Toast({toast, onClose}:ToastProps){
    
    return(
        <S.MessageToastContainer
            key={toast.id}
            initial={{
            opacity: 0,
            x: 50,
            y: -12,
            scale: 0.92,
            filter: "blur(8px)",
            }}
            animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            }}
            exit={{
            opacity: 0,
            x: 50,
            y: -12,
            scale: 0.92,
            }}
            transition={{
            type: "spring",
            stiffness: 260,
            damping: 22,
            mass: 0.8,
            }}
        >
            <S.MessageToastIcon $type={toast.type}>
            {toast.type === "success" 
                ? <FaCircleCheck/>
                : toast.type === 'error'
                ? <FaCircleXmark/>
                : <FaCircleInfo/>
                }
            </S.MessageToastIcon>

            <S.ToastContent>
            <S.ToastTitle>
                {toast.type === "success" 
                ? "전송 완료"
                : toast.type === 'error'
                ? "전송 실패"
                : "새로운 알림"
                }
            </S.ToastTitle>

            <S.ToastMessage>{toast.message}</S.ToastMessage>
            </S.ToastContent>

            <S.ToastCloseBtn
            type="button"
            onClick={onClose}
            >
            확인
            </S.ToastCloseBtn>
        </S.MessageToastContainer>
    )
}


  