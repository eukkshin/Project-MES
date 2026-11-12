export interface Message {
    id: number,
    senderEmpId: string,
    senderName: string,
    receiverEmpId: string,
    receiverName: string;
    title:string,
    content: string,
    isRead: "Y" | "N",
    sentAt: string,
}

export interface MessageRequest {
    receiverEmpId: string,
    title:string,
    content: string,
}