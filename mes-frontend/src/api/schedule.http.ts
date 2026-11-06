import { api } from "@/lib/axios";
import type { ApiSchedule, ScheduleRequest } from "@/types/schedule";

// 일정 목록 조회
export const getSchedules = async (): Promise<ApiSchedule[]> => {
  const response = await api.get("/api/schedules");
  return response.data.schedules;
};

// 일정 등록
export const createSchedule = async (data: ScheduleRequest) => {
  const response = await api.post("/api/schedules", data);
  return response.data;
};

//공용 일정 등록
export const createPublicSchedule = async (data: ScheduleRequest) => {
  const response = await api.post("/api/schedules/public", data);
  return response.data;
};

// 일정 수정
export const updateSchedule = async (id: number,data: Partial<ScheduleRequest>) => {
  const response = await api.patch(`/api/schedules/${id}`, data);
  return response.data;
};

// 일정 삭제
export const deleteSchedule = async (id: number) => {
  const response = await api.delete(`/api/schedules/${id}`);
  return response.data;
};
