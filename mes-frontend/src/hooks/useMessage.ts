import { deleteMessage, getMessagesReceived, getMessagesSent, sendMessages, updateMessageIsRead } from "@/api/message.http"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useGetMessagesReceived = (employeeId?: string,enabled=true)=>{
    return useQuery({
        queryKey: ['messages', 'received', employeeId],
        queryFn:()=>getMessagesReceived(employeeId),
        refetchInterval:30_000,  //30초
        enabled
    })
}

export const useGetMessagesSent = (employeeId?: string, enabled=true)=>{
    return useQuery({
        queryKey: ['messages', 'sent', employeeId],
        queryFn:()=> getMessagesSent(employeeId),
        enabled,
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

export const useDeleteMessage = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id:number)=> deleteMessage(id),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey: ['messages', 'received']
            });
            queryClient.invalidateQueries({
                queryKey: ['messages', 'sent']
            });

        }
    })
};