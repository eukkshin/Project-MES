
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ComponentItem } from "@/types/mes";
import { getSCMComponents,createSCMComponent } from "@/api/mes.http";

const COMPONENTS_QUERY_KEY = ["scm-components"];

// 부품 목록 조회
export const useGetSCMComponents = (options?: {
    enabled?: boolean;
    refetchInterval?: number;
  }) => {
    return useQuery<ComponentItem[]>({
      queryKey: COMPONENTS_QUERY_KEY,
      queryFn: getSCMComponents,
      enabled: options?.enabled ?? true,
      refetchInterval: options?.refetchInterval,
    });
};
  
// 부품 등록
export const useCreateSCMComponent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSCMComponent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COMPONENTS_QUERY_KEY,
      });
    },
  });
};
