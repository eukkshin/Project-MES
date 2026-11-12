import { api } from "@/lib/axios";
import type { Message,MessageRequest } from "@/types/message";

export const sendMessages = async(data:MessageRequest):Promise<Message> => {
    const response = await api.post("/api/messages", data);
    return response.data.data;
}

export const getMessagesReceived = async():Promise<Message[]> => {
    const response = await api.get("/api/messages/received");
    return response.data.messages;
}

export const getMessagesSent = async():Promise<Message[]> => {
    const response = await api.get("/api/messages/sent");
    return response.data.messages;
}

export const updateMessageIsRead = async(id:number) => {
    const response = await api.patch(`/api/messages/${id}/read`);
    return response.data;
}

export const deleteMessage = async(id:number) => {
    const response = await api.delete(`/api/messages/${id}`);
    return response.data;
}

