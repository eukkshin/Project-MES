import { api } from "@/lib/axios";
import type { Message,MessageRequest } from "@/types/message";

export const sendMessages = async(data:MessageRequest):Promise<Message> => {
    const response = await api.post("/api/messages", data);
    return response.data.data;
};

// 받은 쪽지 조회
export const getMessagesReceived = async(employeeId?:string):Promise<Message[]> => {
    const response = await api.get("/api/messages/received", {
        params: { employeeId },
    });
    return response.data.messages;
};

// 보낸 쪽지 조회
export const getMessagesSent = async(employeeId?:string):Promise<Message[]> => {
    const response = await api.get("/api/messages/sent",{
        params: { employeeId },
    });
    return response.data.messages;
};

export const updateMessageIsRead = async(id:number) => {
    const response = await api.patch(`/api/messages/${id}/read`);
    return response.data;
};

export const deleteMessage = async(id:number) => {
    const response = await api.delete(`/api/messages/${id}`);
    return response.data;
};

