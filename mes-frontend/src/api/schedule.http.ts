import { api } from "@/lib/axios";
import type { Schedule } from "@/types/schedule";

// 일정 목록 조회
export const getSchedules = async () => {
  const response = await api.get("/api/schedules");
  return response.data;
};

// 일정 등록
export const createSchedule = async (scheduleData: Omit<Schedule, "id" | "createdAt">) => {
  const response = await api.post("/api/schedules", scheduleData);
  return response.data;
};

// 일정 수정
export const updateSchedule = async (
  id: number,
  scheduleData: Partial<Omit<Schedule, "id" | "createdAt">>
) => {
  const response = await api.patch(`/api/schedules/${id}`, scheduleData);
  return response.data;
};

// 일정 삭제
export const deleteSchedule = async (id: number) => {
  const response = await api.delete(`/api/schedules/${id}`);
  return response.data;
};
