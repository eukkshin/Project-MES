import { create } from "zustand";
import type { HeaderAlertCategory, HeaderAlertItem } from "@/components/layout/header/HeaderAlertDropdown";

export interface MesLiveAlert {
  id: string;
  category: HeaderAlertCategory;
  title: string;
  description: string;
}

interface MesAlertState {
  liveAlert: MesLiveAlert | null;
  alerts: HeaderAlertItem[];
  triggerLiveAlert: (
    alert: Omit<MesLiveAlert, "id"> & { id?: string },
  ) => void;
  clearLiveAlert: () => void;
  markAlertAsRead: (id: number | string) => void;
  clearAlerts: () => void;
}

const formatNowTime = () =>
  new Date().toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const useMesAlertStore = create<MesAlertState>((set) => ({
  liveAlert: null,
  alerts: [],

  triggerLiveAlert: (alert) => {
    const id = alert.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const nextLive: MesLiveAlert = {
      id,
      category: alert.category,
      title: alert.title,
      description: alert.description,
    };

    const nextHistoryItem: HeaderAlertItem = {
      id,
      category: alert.category,
      title: alert.title,
      message: alert.description,
      createdAt: formatNowTime(),
      isRead: false,
    };

    set((state) => ({
      liveAlert: nextLive,
      // 최신 알림이 맨 위에 오도록 누적(최대 30건 유지)
      alerts: [nextHistoryItem, ...state.alerts].slice(0, 30),
    }));
  },

  clearLiveAlert: () => set({ liveAlert: null }),

  markAlertAsRead: (id) =>
    set((state) => ({
      alerts: state.alerts.map((item) =>
        item.id === id ? { ...item, isRead: true } : item,
      ),
    })),

  clearAlerts: () => set({ alerts: [] }),
}));