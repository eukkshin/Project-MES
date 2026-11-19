import { createInspection, getInspections } from "@/api/mes.http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { InspectionItem } from "@/types/mes";

export const QUERY_KEY = ["inspections"] as const;

export const useGetInspections =({
    refetchInterval,
}: {refetchInterval?:number}={})=>{

    return(
        useQuery<InspectionItem[]>({
            queryKey:QUERY_KEY,
            queryFn: async()=>{
                const data = await getInspections();

                if(!Array.isArray(data)){
                    throw new Error("검사 이력 조회에 실패했습니다.");
                }
            return data;
            },
            refetchInterval,
        })
    )
}

export const useCreateInspections =()=> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:createInspection,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey: QUERY_KEY,
            })
        }
    })
}