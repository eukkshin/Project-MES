'use client';

import { useSchedule } from "@/context/ScheduleContext";
import * as S from '@/assets/css/components/Toastalarm.style'
import { motion } from 'motion/react'

export function AlarmToast(){

    const { currentToast, setCurrentToast } = useSchedule();

    if (!currentToast) return null;

    return (
        <S.ToastContainer style={{ zIndex: 99999 }}
           initial={{
                opacity: 0,
                x: 50,
                y: -12,
                scale: 0.92,
                filter: 'blur(8px)',
            }}
            animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
            }}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 22,
                mass: 0.8,
            }}
        >
            <S.ToastIcon>
                <AlarmClockIcon/>
            </S.ToastIcon>
            <S.ToastContent>
                <S.ToastTitle>{currentToast.title}</S.ToastTitle>
                <S.ToastMessage>{currentToast.content}</S.ToastMessage>
            </S.ToastContent>
            <S.ToastCloseBtn onClick={() => setCurrentToast(null)}>
                확인
            </S.ToastCloseBtn>
        </S.ToastContainer>
  );
}




function AlarmClockIcon() {
  return (
    <motion.div
      animate={{
        rotate: [0, 8, -8, 6, -6, 0],
      }}
      transition={{
        duration: 0.8,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 1.2,
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transformOrigin: 'top center',
      }}
    >
      {/* 애플 탈레스/시계 아이콘 감성을 담은 미니멀 벡터 아이콘 */}
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    </motion.div>
  );
}
