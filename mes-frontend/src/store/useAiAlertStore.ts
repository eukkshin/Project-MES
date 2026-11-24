// mes-frontend/src/store/useAiAlertStore.ts
import { create } from "zustand";
import type { AnomalyAlertEvent } from "@/types/aiDashboard";

interface AiAlertState {
  // 실시간 수신된 이상 이벤트 목록 (최신순)
  events: AnomalyAlertEvent[];
  // 읽지 않은 이상 이벤트 수
  unreadCount: number;
  // SSE 연결 상태
  isConnected: boolean;
  // 마지막 수신된 이벤트 (토스트 또는 배너용)
  latestEvent: AnomalyAlertEvent | null;

  // 액션
  addEvent: (event: AnomalyAlertEvent) => void;
  dismissLatest: () => void;
  markAllAsRead: () => void;
  clearEvents: () => void;
  setIsConnected: (connected: boolean) => void;
}

export const useAiAlertStore = create<AiAlertState>((set) => ({
  events: [],
  unreadCount: 0,
  isConnected: false,
  latestEvent: null,

  addEvent: (event) =>
    set((state) => ({
      events: [event, ...state.events.filter((e) => e.id !== event.id)].slice(0, 50),
      unreadCount: state.unreadCount + 1,
      latestEvent: event,
    })),

  dismissLatest: () => set({ latestEvent: null }),

  markAllAsRead: () => set({ unreadCount: 0 }),

  clearEvents: () => set({ events: [], unreadCount: 0, latestEvent: null }),

  setIsConnected: (connected) => set({ isConnected: connected }),
}));
