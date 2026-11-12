'use client';
import { useState } from "react";
import { useGetMessagesReceived, useGetMessagesSent, useSendMessage, useUpdateMessageIsRead } from "@/hooks/useMessage";
import { EmployeeDirectory } from "@/types/hr";
import ModalLayout from "./ModalLayout";
import * as S from '@/assets/css/components/modal/MessageModal.styles'
import { FaPaperPlane, FaInbox, FaRegPaperPlane, FaSpinner, FaPenToSquare, FaChevronRight, FaRegUser, FaRegEnvelopeOpen, FaArrowLeft } from "react-icons/fa6";
import { useToastContext } from "@/context/ToastContext";
import type { Message } from "@/types/message";

type MessageTab = "write" | "received" | "sent";

interface MessageModalProps{
    receiver: EmployeeDirectory | null;
    onClose: ()=>void;
}

const formatMessageDate = (date:string)=>{
    return new Intl.DateTimeFormat('ko-KR', {
        year:'numeric',
        month:'numeric',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(new Date(date));
};


export default function MessageModal({
    receiver,
    onClose,
}:MessageModalProps){

    const { showToast }=useToastContext();
    const { mutate, isPending } = useSendMessage();
    const {data: receivedMessages=[], isLoading: isReceivedLoading } = useGetMessagesReceived();
    const {data: sentMessages=[], isLoading:isSentLoading} = useGetMessagesSent();
    const {mutate: updateIsReadMutate} = useUpdateMessageIsRead();

    const [title, setTitle]= useState('');
    const [content, setContent] = useState('');

    const [activeTab, setActiveTab] = useState<MessageTab>("write");
    const [selectedMessage, setSelectedMessage] = useState<Message|null>(null);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if(!receiver || !title.trim() || !content.trim()) return;

        mutate({
            receiverEmpId: receiver.id,
            title: title.trim(),
            content: content.trim(),
        },
        {
            onSuccess: ()=>{
                setTitle("");
                setContent("");
                onClose();
                showToast(`${receiver.name}님에게 쪽지가 전송되었습니다.`, 'success')
            },
            onError: (error)=>{
                 console.error("쪽지 전송 실패:", error);
            }
        },)
    };

    const handleMessageClick = (message:Message)=>{
        setSelectedMessage(message);
        if(message.isRead === 'N'){
            updateIsReadMutate(message.id, {
                onSuccess:()=>{
                    setSelectedMessage((prev)=> prev? {...prev,isRead:"Y"}: prev)
                }
            });
        }
    }

    return(
        <ModalLayout isOpen={true} onClose={onClose} title="사내 쪽지함"
        >
            <S.MessageWrapper>
                <S.MessageTabs>
                <S.MessageTab
                type="button"
                $active={activeTab==='write'}
                onClick={()=>{
                    setSelectedMessage(null);
                    setActiveTab("write")
                }}
                >   
                 <FaPenToSquare />
                    쪽지 보내기
                </S.MessageTab>

                <S.MessageTab 
                type="button"
                $active={activeTab==='received'}
                onClick={()=>{
                    setSelectedMessage(null);
                    setActiveTab("received")
                }}
                >   
                 <FaInbox />
                    받은 쪽지함
                </S.MessageTab>

                <S.MessageTab 
                type="button"
                $active={activeTab==='sent'}
                onClick={()=>{
                    setSelectedMessage(null);
                    setActiveTab("sent")
                }}
                >   
                 <FaPaperPlane />
                    보낸 쪽지함
                </S.MessageTab>
                </S.MessageTabs>

                <S.MessageModalBody>
                {activeTab === 'write' && (
                    <S.MessageForm>
                        <S.MessageFormGroup>
                            <label>받는 사람</label>

                            <S.MessageReceiver>
                                <S.ReceiverAvatar>
                                    {receiver?.name.charAt(0)}
                                </S.ReceiverAvatar>
                                <S.ReceiverInfo>
                                    <strong>{receiver?.name}</strong>
                                    <span>{receiver?.id}</span>
                                </S.ReceiverInfo>
                            </S.MessageReceiver>
                        </S.MessageFormGroup>

                        <S.MessageFormGroup>
                        <label htmlFor="message-title">제목</label>

                        <S.MessageInput
                            id="message-title"
                            type="text"
                            placeholder="제목을 입력하세요."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        </S.MessageFormGroup>

                        <S.MessageFormGroup>
                        <label htmlFor="message-content">내용</label>

                        <S.MessageTextarea
                            id="message-content"
                            placeholder="쪽지 내용을 입력하세요."
                            rows={4}
                            maxLength={200}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <S.MessageCharCount>{content.length}/200</S.MessageCharCount>
                        </S.MessageFormGroup>

                        <S.MessageModalFooter>
                        <S.MessageSendButton type="submit" 
                        onClick={handleSend}
                        disabled={isPending || !title.trim() ||!content.trim() ||!receiver }>
                           {isPending? <FaSpinner/> : <FaPaperPlane/>}
                        </S.MessageSendButton>
                        </S.MessageModalFooter>
                    </S.MessageForm>
                )}

                {activeTab === "received" && (
                    selectedMessage ? (
                         // 쪽지 상세 화면
                        <S.MessageDetail>
                            <S.TopRow>
                                <S.MessageBackButton
                                    type="button"
                                    onClick={() => {
                                        setSelectedMessage(null);
                                        setActiveTab('received');
                                    }}
                                >
                                    <FaArrowLeft />
                                    받은 쪽지 목록
                                </S.MessageBackButton>

                            <S.ReadStatusBadge $isRead={selectedMessage.isRead==="Y"}>
                                <span>
                                <FaRegEnvelopeOpen />
                                {selectedMessage.isRead === "Y" ? "읽음" : "읽지 않음"}
                                </span>
                            </S.ReadStatusBadge>
                            </S.TopRow>
     
                        <S.MessageDetailHeader>
                            <S.DetailTitleRow>
                                <h3>{selectedMessage.title}</h3>
                             
                            
                            </S.DetailTitleRow>
    
                            <S.SenderInfoBox>
                                <S.SenderAvatar>
                                    <FaRegUser />
                                </S.SenderAvatar>

                                <S.SenderTextBox>
                                    <strong>{selectedMessage.senderName}</strong>
                                    <span>보낸 사람</span>
                                </S.SenderTextBox>
                                <S.MessageDate>
                                    {formatMessageDate(selectedMessage.sentAt)}
                                </S.MessageDate>
                            </S.SenderInfoBox>
    
                        </S.MessageDetailHeader>
    
                        <S.MessageDetailContent>
                            {selectedMessage.content}
                        </S.MessageDetailContent>
    
                        <S.MessageDetailFooter>
                            <span>
                            <FaRegEnvelopeOpen />
                            {selectedMessage.isRead === "Y" ? "읽음" : "읽지 않음"}
                            </span>
                        </S.MessageDetailFooter>
                        </S.MessageDetail> 
                    ) : (
                        <S.MessageListWrapper>
                            <S.MessageGuide>
                                <FaRegEnvelopeOpen />
                                쪽지를 클릭하면 내용을 확인하고 읽음으로 표시됩니다.
                            </S.MessageGuide>
    
                            {receivedMessages.length > 0 ? (
                            receivedMessages.map((message) => (
                                <S.MessageCard
                                key={message.id}
                                $unread={message.isRead === "N"}
                                onClick={() => handleMessageClick(message)}
                                >
                                <div className="card-top">
                                    <div className="title-area">
                                        {message.isRead === 'N' && (
                                            <span className="unread-dot"/>
                                        )}
                                        <strong>{message.title}</strong>
                                    </div>
                                    <span className="message-date">{formatMessageDate(message.sentAt)}</span>
                                </div>

                                    {/* <S.MessageDetailFooter>
                                <span>
                                <FaRegEnvelopeOpen />
                                {selectedMessage.isRead === "Y" ? "읽음" : "읽지 않음"}
                                </span>
                            </S.MessageDetailFooter> */}
    
                                <div className="card-bottom">
                                    <span className="sender"> 
                                        <FaRegUser/>
                                        {message.senderName}
                                    </span>
                                    <FaChevronRight className="arrow-icon"/>
                                </div>
                                </S.MessageCard>
                            ))
                            ) 
                            : (
                            <S.EmptyMessageState>
                                <FaInbox />
                                <strong>받은 쪽지가 없습니다.</strong>
                                <span>새로운 쪽지가 도착하면 여기에 표시됩니다.</span>
                            </S.EmptyMessageState>
                            )}
                        </S.MessageListWrapper>
                    ) 
                )}

                {activeTab === "sent" && (
                <S.MessageListWrapper>
                    {sentMessages.length > 0 ? (
                    sentMessages.map((message) => (
                        <S.MessageCard key={message.id}>
                        <div className="card-header">
                            <strong>{message.title}</strong>
                            <span>{message.sentAt}</span>
                        </div>

                        <p>{message.content}</p>
                        </S.MessageCard>
                    ))
                    ) : (
                    <S.EmptyMessageState>
                        <FaPaperPlane />
                        <strong>보낸 쪽지가 없습니다.</strong>
                        <span>보낸 쪽지 내역이 여기에 표시됩니다.</span>
                    </S.EmptyMessageState>
                    )}
                </S.MessageListWrapper>
                )} 
                </S.MessageModalBody>
            </S.MessageWrapper>
        </ModalLayout>
        );
}

           