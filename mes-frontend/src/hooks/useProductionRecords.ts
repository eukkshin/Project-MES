import { getProductionRecord,createProductionRecord } from "@/api/mes.http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ProductionRecord } from "@/types/mes";
export type { ProductionRecord };


const QUERY_KEY = ["analyticsRecords"] as const;

export const useGetProductionRecord =({
    refetchInterval,
}: {refetchInterval?:number}={})=>{

    return(
        useQuery<ProductionRecord[]>({
            queryKey:QUERY_KEY,
            queryFn: async()=>{
                const data = await getProductionRecord();

                if(!Array.isArray(data)){
                    throw new Error("잘못된 생산 실적 데이터 형식입니다.");
                }
                return [...data].sort(
                    (a,b)=> Number(b.id)-Number(a.id)
                );
            },
            refetchInterval,
        })
    )
}

export const useCreateProductionRecord =()=> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:createProductionRecord,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey: QUERY_KEY,
            })
        }
    })
}