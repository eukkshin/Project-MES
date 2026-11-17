// src/store/useMesAlertStore.ts
import { create } from 'zustand';

export interface MesLiveAlert {
  title: string;
  description: string;
}

interface MesAlertState {
  liveAlert: MesLiveAlert | null;
  triggerLiveAlert: (alert: MesLiveAlert) => void;
  clearLiveAlert: () => void;
}

export const useMesAlertStore = create<MesAlertState>((set) => ({
  liveAlert: null,
  triggerLiveAlert: (alert) => set({ liveAlert: alert }),
  clearLiveAlert: () => set({ liveAlert: null }),
}));