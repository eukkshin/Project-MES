// mes-frontend/src/hooks/useAiBriefing.ts
import { useQuery } from "@tanstack/react-query";
import { getAiBriefing } from "@/api/ai.http";
import type { AiBriefingData } from "@/types/aiDashboard";

export interface UseAiBriefingOptions {
  enabled?: boolean;
}

/**
 * AI 관제 브리핑 TanStack Query 훅
 * - 사용자의 수동 요청(또는 초기 마운트 시 1회)에 의해서만 실행됩니다.
 * - 15초 데이터 폴링에 영향을 받지 않도록 refetchInterval을 비활성화합니다.
 */
export function useAiBriefing(options: UseAiBriefingOptions = {}) {
  const query = useQuery<AiBriefingData, Error>({
    queryKey: ["ai-briefing"],
    queryFn: getAiBriefing,
    enabled: options.enabled ?? true,
    staleTime: 60 * 1000, // 1분간 캐시 신선도 유지
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false, // 탭 전환 시 자동 재요청 방지
    refetchOnReconnect: false,
    retry: 1, // 실패 시 1회만 재시도
  });

  return {
    briefing: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetchBriefing: query.refetch,
  };
}
