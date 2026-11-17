import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
    fetchProcessHistory, 
    fetchProcessLines ,
    createProcessLine,
    updateLineStatus,
} from "@/api/mes.http";

export const useFetchProcessLines = ()=>{
    return useQuery({
        queryKey: ["process-lines"],
        queryFn:fetchProcessLines,
    })
}

export const useFetchProcessHistory = (lineId?:number)=>{
    return useQuery({
        queryKey: ["process-history", lineId],
        queryFn:()=> fetchProcessHistory(lineId),
    })
}

export const useCreateProcessLine = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProcessLine,
        onSuccess: ()=>{
            queryClient.invalidateQueries({
            queryKey: ["process-lines"],
        });
        },
        onError: (err)=>{
            console.error("라인 등록 오류:", err);
        }
    })
}

type UpdateStatusRequest =
    {id:number, status:string, reason?:string}

export const useUpdateLineStatus = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id,status,reason}: UpdateStatusRequest)=>
            updateLineStatus(id,status,reason),
        onSuccess:()=>{
        queryClient.invalidateQueries({queryKey: ["process-lines"]});
        queryClient.invalidateQueries({ queryKey: ["process-history"]});
        },
        onError:(err)=>{
            console.error("상태 변경 오류:", err);
        }

    })
}