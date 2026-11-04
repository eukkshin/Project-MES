import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "@/api/schedule.http";

// import type { ScheduleRequest } from "@/types/schedule";

// Query Key
export const scheduleKeys = {
  all: ["schedules"] as const,
};

// 일정 목록 조회
export const useSchedules = () => {
  return useQuery({
    queryKey: scheduleKeys.all,
    queryFn: getSchedules,
  });
};

// 일정 등록
export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: scheduleKeys.all,
      });
    },
  });
};

// 일정 수정
export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<ScheduleRequest>;
    }) => updateSchedule(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: scheduleKeys.all,
      });
    },
  });
};

// 일정 삭제
export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: scheduleKeys.all,
      });
    },
  });
};