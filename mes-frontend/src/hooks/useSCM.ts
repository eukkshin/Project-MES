
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createComponent, fetchComponents } from "@/api/mes.http";

// 부품 데이터 타입
export interface ComponentItem {
  id: number;
  componentName: string;
  category: string;
  stockQuantity: number;
  minThreshold: number;
  supplier: string;
  status: string;
}

// 부품 등록 데이터 타입
export interface ComponentForm {
  componentName: string;
  category: string;
  stockQuantity: number;
  minThreshold: number;
  supplier: string;
}

// API 응답 타입
interface ComponentResponse {
  success: boolean;
  components?: ComponentItem[];
  data?: ComponentItem[];
  message?: string;
}

const COMPONENTS_QUERY_KEY = ["scm-components"];

// 부품 목록 조회
export const useFetchComponents = (options?: {
    enabled?: boolean;
    refetchInterval?: number;
  }) => {
    return useQuery<ComponentItem[]>({
      queryKey: COMPONENTS_QUERY_KEY,
  
      queryFn: async () => {
        const payload = (await fetchComponents()) as ComponentResponse;
  
        if (!payload.success) {
          throw new Error(
            payload.message || "부품 목록 조회에 실패했습니다."
          );
        }
  
        const data = payload.components ?? payload.data ?? [];
  
        if (!Array.isArray(data)) {
          throw new Error("부품 목록 응답 형식이 올바르지 않습니다.");
        }
  
        return data;
      },
  
      enabled: options?.enabled ?? true,
      refetchInterval: options?.refetchInterval,
    });
  };
  
// 부품 등록
export const useCreateComponent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: ComponentForm) => createComponent(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COMPONENTS_QUERY_KEY,
      });
    },
  });
};
