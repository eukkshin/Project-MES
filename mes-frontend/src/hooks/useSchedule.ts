import { createSchedule, deleteSchedule, getSchedules, updateSchedule } from "@/api/schedule.http";
import type { ApiSchedule, ScheduleRequest } from "@/types/schedule";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//쿼리 키
export const scheduleKeys = {
  all: ['schedules'] as const,
}

// 일정 목록 조회
export const useGetSchedules = (enabled=true)=>{
  return useQuery<ApiSchedule[]>({
    queryKey: scheduleKeys.all,
    queryFn: getSchedules,
    enabled,
  })
}

// 일정 등록
export const useCreateSchedule = ()=>{
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchedule,
    onSuccess: ()=>{
      queryClient.invalidateQueries({
        queryKey: scheduleKeys.all,
      })
    },
  })
};

//일정 수정
export const useUpdateSchedule =()=>{
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, data}:{id:number, data:Partial<ScheduleRequest>})=> updateSchedule(id,data),
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey: scheduleKeys.all,
      })
    }
  })
}

//일정 삭제
export const useDeleteSchedule = ()=>{
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:  deleteSchedule,
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey: scheduleKeys.all,
      })
    }
  })
}