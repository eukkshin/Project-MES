import { getMessagesReceived, getMessagesSent, sendMessages, updateMessageIsRead } from "@/api/message.http"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useGetMessagesReceived = ()=>{
    return useQuery({
        queryKey: ['messages', 'received'],
        queryFn:getMessagesReceived,
    })
}

export const useGetMessagesSent = ()=>{
    return useQuery({
        queryKey: ['messages', 'sent'],
        queryFn: getMessagesSent,
    })
}

export const useSendMessage= ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: sendMessages,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['messages', 'sent'],
            });
        }
    })
}

export const useUpdateMessageIsRead = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id:number)=> updateMessageIsRead(id),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey: ['messages', 'received'],
            });
        }
    })
}