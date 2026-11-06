'use client';

import { useSchedule } from "@/context/ScheduleContext";
import * as S from '@/assets/css/components/alarm.style'
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
                {/* ⏰ */}
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
        rotate: [0, 12, -12, 9, -9, 0],
      }}
      transition={{
        duration: 0.7,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 0.5,
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transformOrigin: 'center center',
      }}
    >
      <svg
        viewBox="0 0 64 64"
        width="35"
        height="35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pinkClockBody" x1="15" y1="12" x2="48" y2="52">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.5" stopColor="#FFF0F5" />
            <stop offset="1" stopColor="#F6C4D9" />
          </linearGradient>

          <linearGradient id="pinkClockBell" x1="10" y1="3" x2="25" y2="18">
            <stop offset="0" stopColor="#FFE1ED" />
            <stop offset="1" stopColor="#E88DB2" />
          </linearGradient>

          <linearGradient id="pinkClockLeg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F5B1CC" />
            <stop offset="1" stopColor="#D96F9E" />
          </linearGradient>
        </defs>

        {/* 왼쪽 종 */}
        <path
          d="M12 17C8 14 9 7 15 6C20 5 24 9 24 15L12 17Z"
          fill="url(#pinkClockBell)"
          stroke="#D978A1"
          strokeWidth="1.5"
        />

        {/* 오른쪽 종 */}
        <path
          d="M52 17C56 14 55 7 49 6C44 5 40 9 40 15L52 17Z"
          fill="url(#pinkClockBell)"
          stroke="#D978A1"
          strokeWidth="1.5"
        />

        {/* 종 하이라이트 */}
        <path
          d="M13 10C15 8 18 9 19 11"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M45 11C46 9 49 8 51 10"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 짧은 다리 */}
        <path
          d="M20 48L17 53"
          stroke="url(#pinkClockLeg)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M44 48L47 53"
          stroke="url(#pinkClockLeg)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* 시계 본체 */}
        <circle
          cx="32"
          cy="32"
          r="19"
          fill="url(#pinkClockBody)"
          stroke="#D978A1"
          strokeWidth="1.8"
        />

        {/* 본체 빛 반사 */}
        <path
          d="M19 23C23 16 33 13 40 19"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* 시계 문자판 */}
        <circle
          cx="32"
          cy="32"
          r="14"
          fill="#FFF9FC"
          stroke="#F4D6E3"
          strokeWidth="1"
        />

        {/* 눈금 */}
        <path
          d="M32 20V22M32 42V44M20 32H22M42 32H44"
          stroke="#E9A1BE"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 시곗바늘 */}
        <path
          d="M32 23V32L39 36"
          stroke="#C45F8C"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="32" r="2.5" fill="#C45F8C" />

        {/* 반짝이 */}
        <path
          d="M54 23L55 20L56 23L59 24L56 25L55 28L54 25L51 24Z"
          fill="#F3A6C6"
        />
      </svg>
    </motion.div>
  );
}

