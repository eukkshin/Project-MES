"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Temporal } from "@js-temporal/polyfill";
import type { ApiSchedule } from "@/types/schedule";
import { useGetSchedules } from "@/hooks/useSchedule";

interface ToastInfo {
  id: string;
  title: string;
  content: string;
}

interface ScheduleContextType {
  currentToast: ToastInfo | null;
  setCurrentToast: (toast: ToastInfo | null) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

const isAlarmEnabled = (value: ApiSchedule['alarmEnabled'])=>{
  return value === true || value === 1 || value === '1' || value === 'true';
}

export function ScheduleProvider({ children }: { children: React.ReactNode }) {

  // 최신 토스트 상태를 알람 감시 로직에서 참조
  const currentToastRef = useRef<ToastInfo|null>(null);
  const [currentToast, setCurrentToast] = useState<ToastInfo | null>(null);

  const updateCurrentToast = (toast: ToastInfo | null) => {
    currentToastRef.current = toast;
    setCurrentToast(toast);
  };
  
  const { data: schedules=[] } = useGetSchedules();

  // 알람이 이미 울린 일정을 중복해서 울리지 않도록 기록
  const triggeredAlarmsRef = useRef<Set<string>>(new Set());
  
 
  // 알람 소리 재생
  const playSingleTone = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as Window & {
          webkitAudioContext?: typeof AudioContext;
        }).webkitAudioContext;

      if (!AudioContextClass) return;

      const audioCtx = new AudioContextClass();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(
        587.33,
        audioCtx.currentTime,
      );

      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.currentTime + 0.6,
      );

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);

      osc.onended = () => {
        void audioCtx.close();
      };
    } catch (error) {
      console.error("알람 소리 재생 실패:", error);
    }
  };

  // 토스트가 열리면 소리는 5초만 재생
  useEffect(() => {
    if (!currentToast) return;

    playSingleTone();

    const interval = window.setInterval(() => {
      playSingleTone();
    }, 1200);

    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
    }, 5000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [currentToast]);

  // React Query 일정 데이터를 기준으로 알람 감시
  useEffect(() => {
    const checkAlarms = () => {
      const now = Temporal.Now.plainDateTimeISO();

      const today = now.toPlainDate().toString();

      const currentTime =
        `${String(now.hour).padStart(2, "0")}:` +
        `${String(now.minute).padStart(2, "0")}`;

      schedules.forEach((schedule) => {
        const alarmKey =
          `${schedule.id}-${schedule.scheduleDate}-${schedule.time}`;

        if (
          !isAlarmEnabled(schedule.alarmEnabled) ||
          schedule.scheduleDate !== today ||
          schedule.time?.slice(0, 5) !== currentTime ||
          schedule.status === "COMPLETED" ||
          triggeredAlarmsRef.current.has(alarmKey) ||
          currentToastRef.current !== null
        ) {
          return;
        }

        triggeredAlarmsRef.current.add(alarmKey);

        const toast = {
          id: String(schedule.id),
          title: schedule.title || "일정 알림",
          content: schedule.content || "예정된 시간이 되었습니다.",
        };
        updateCurrentToast(toast);
      });
    };

    checkAlarms();

    const interval = window.setInterval(checkAlarms, 10000);

    return () => window.clearInterval(interval);
  }, [schedules]);

  const ctxValue={ 
    currentToast, 
    setCurrentToast : updateCurrentToast,
  }

  return (
    <ScheduleContext.Provider value={ctxValue}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
}