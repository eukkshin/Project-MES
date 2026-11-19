
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getEquipments,
  createEquipment,
  updateEquipmentStatus,
} from "@/api/mes.http";
import type { EquipmentItem } from "@/types/mes";

// API 응답 타입
interface EquipmentResponse {
  success?: boolean;
  equipment?: EquipmentItem[];
  equipments?: EquipmentItem[];
  data?: EquipmentItem[];
}

// API 응답을 배열로 변환하는 함수
const extractEquipmentList = (
  res: EquipmentItem[] | EquipmentResponse
): EquipmentItem[] => {
  if (Array.isArray(res)) return res;

  if (res.success === false) {
    throw new Error("설비 조회에 실패했습니다.");
  }

  const data = res.equipments ?? res.equipment ?? res.data ?? [];

  if (!Array.isArray(data)) {
    throw new Error("설비 조회 응답 형식이 올바르지 않습니다.");
  }

  return data;
};

// 1. 설비 목록 조회
export const useGetEquipment = (options?: {
  enabled?: boolean;
  refetchInterval?: number;
}) => {
  return useQuery<EquipmentItem[]>({
    queryKey: ["equipment"],
    queryFn: getEquipments,
    enabled: options?.enabled ?? true,
    refetchInterval: options?.refetchInterval,
  });
};

// 2. 설비 등록
export const useCreateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEquipment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["equipment"],
      });
    },
    onError: (err) => {
      console.error("설비 등록 오류:", err);
    },
  });
};

// 3. 설비 상태 변경
interface UpdateEquipmentStatusRequest {
  id: number;
  nextStatus: string;
}

export const useUpdateEquipmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, nextStatus }: UpdateEquipmentStatusRequest) =>
      updateEquipmentStatus(id, nextStatus),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["equipment"],
      });
    },

    onError: (err) => {
      console.error("설비 상태 변경 오류:", err);
    },
  });
};
