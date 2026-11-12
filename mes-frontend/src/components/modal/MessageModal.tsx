'use client';
import { useState } from "react";
import { useDeleteMessage, useGetMessagesReceived, useGetMessagesSent, useSendMessage, useUpdateMessageIsRead } from "@/hooks/useMessage";
import { EmployeeDirectory } from "@/types/hr";
import ModalLayout from "./ModalLayout";
import * as S from '@/assets/css/components/modal/MessageModal.styles'
import { FaPaperPlane, FaInbox, FaSpinner, FaPenToSquare, FaChevronRight, FaRegUser, FaRegEnvelopeOpen, FaRegEnvelope, FaChevronLeft, FaTrash } from "react-icons/fa6";
import { useToastContext } from "@/context/ToastContext";
import type { Message } from "@/types/message";
import EqualizerLoader from "@/ui/feedback/EqualizerLoading";
import { useAlertStore } from "@/store/useAlertStore";

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
    const showAlert = useAlertStore(state=> state.showAlert);
    const { mutate: deleteMutate, isPending: isDeleting} = useDeleteMessage();
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
                showToast(`${receiver.name}님에게 쪽지가 전송되지못했습니다.`, 'error')
            }
        },)
    };

    const handleMessageClick = (message:Message)=>{
        setSelectedMessage(message);
        if(message.isRead === 'N'){
            updateIsReadMutate(message.id, {
                onSuccess:()=>{
                    setSelectedMessage((prev)=> prev? {...prev,isRead:"Y"}: prev)
                },
                onError:(error)=>{
                    console.error("읽음 처리 실패:", error);
                    showToast("읽음 처리에 실패했습니다.", "error");
                }
            });
        }
    }

    const handleDelete = (id:number)=>{
        showAlert("쪽지를 삭제하시겠습니까?", 'error', '삭제 확인', 
            ()=>deleteMutate(id,{
                onSuccess:()=>{
                    setSelectedMessage(null);
                    showToast('쪽지가 삭제되었습니다.', 'success');
                },
                onError: (error)=>{
                    console.error("쪽지 삭제 실패:", error);
                    showToast("쪽지 삭제에 실패했습니다.", "error");
                }
            })
        )
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
                {activeTab === 'write' && (
                  <S.MotionIndicator
                  layoutId="messageTabIndicator"
                  transition={{
                    type: "tween",
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  />
                )}
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
                {activeTab === 'received' && (
                  <S.MotionIndicator
                  layoutId="messageTabIndicator"
                  transition={{
                    type: "tween",
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  />
                )}
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
                {activeTab === 'sent' && (
                  <S.MotionIndicator
                  layoutId="messageTabIndicator"
                  transition={{
                    type: "tween",
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  />
                )}
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

                {/* 쪽지 상세 화면 */}
                {activeTab === "received" && (
                    selectedMessage ? (
                        <S.MessageDetail>
                            <S.MessageBackButton
                                type="button"
                                onClick={() => {
                                    setSelectedMessage(null);
                                    setActiveTab('received');
                                }}
                            >
                                <FaChevronLeft />
                                받은 쪽지 목록
                            </S.MessageBackButton>
     
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
                            {selectedMessage.isRead === "Y" ? (
                                <span>
                                <FaRegEnvelopeOpen />
                                읽음
                                </span>
                            ) : (
                                <span>
                                <FaRegEnvelope />
                                읽지 않음
                                </span>
                            )}
                            <S.DeleteButton 
                            type="button"
                            disabled={isDeleting}
                            onClick={()=>handleDelete(selectedMessage.id)}
                            >
                               {isDeleting? <FaSpinner/>: <FaTrash/>} 
                            </S.DeleteButton>
                        </S.MessageDetailFooter>
                        </S.MessageDetail> 
                    ) : (
                        <S.MessageListWrapper>
                            {isReceivedLoading ? (
                                <EqualizerLoader message="받은 쪽지를 불러오는 중"/>
                            ):(
                            receivedMessages.length > 0 ? (
                            <>
                            <S.MessageGuide>
                                <FaRegEnvelopeOpen />
                                쪽지를 클릭하면 내용을 확인하고 읽음으로 표시됩니다.
                            </S.MessageGuide>
                            {receivedMessages.map((message) => (
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
                                    <S.ReadStatusBadge>
                                        <span>
                                        {message.isRead === "Y" ?   <FaRegEnvelopeOpen /> : <FaRegEnvelope/>}
                                        </span>
                                    </S.ReadStatusBadge>
                                </div>

                                <div className="card-bottom">
                                    <span className="sender"> 
                                        <FaRegUser/>
                                        <strong>{message.senderName}</strong>
                                        {message.senderEmpId}
                                    </span>
                                    <S.MessageDate>{formatMessageDate(message.sentAt)}</S.MessageDate>
                                    <FaChevronRight className="arrow-icon"/>
                                </div>
                                </S.MessageCard>
                            ))}
                            </>)
                            : (
                            <S.EmptyMessageState>
                                <FaInbox />
                                <strong>받은 쪽지가 없습니다.</strong>
                                <span>새로운 쪽지가 도착하면 여기에 표시됩니다.</span>
                            </S.EmptyMessageState>
                            ))}
                        </S.MessageListWrapper>
                    ) 
                )}

                {activeTab === "sent" && (
                    selectedMessage ? (
                        <S.MessageDetail>
                        <S.MessageBackButton
                          type="button"
                          onClick={() => {
                            setSelectedMessage(null)
                            setActiveTab('sent');
                          }}
                        >
                          <FaChevronLeft />
                          보낸 쪽지 목록
                        </S.MessageBackButton>
                  
                        <S.MessageDetailHeader>
                          <S.DetailTitleRow>
                            <h3>{selectedMessage.title}</h3>
                          </S.DetailTitleRow>
                  
                          <S.SenderInfoBox>
                            <S.SenderAvatar>
                              <FaRegUser />
                            </S.SenderAvatar>
                  
                            <S.SenderTextBox>
                              <strong>{selectedMessage.receiverName}</strong>
                              <span>받는 사람</span>
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
                          {selectedMessage.isRead === "Y" ? (
                            <span>
                              <FaRegEnvelopeOpen />
                              읽음
                            </span>
                          ) : (
                            <span>
                              <FaRegEnvelope />
                              읽지 않음
                            </span>
                          )}
                          <S.DeleteButton
                            type="button"
                            disabled={isDeleting}
                            onClick={()=>handleDelete(selectedMessage.id)}
                            >
                            {isDeleting? <FaSpinner/>: <FaTrash/>} 
                          </S.DeleteButton>
                        </S.MessageDetailFooter>
                      </S.MessageDetail>
                    ):(
                    <S.MessageListWrapper>
                        {isSentLoading ? (
                                <EqualizerLoader message="보낸 쪽지를 불러오는 중"/>
                            ):(
                        sentMessages.length > 0 ? (
                        sentMessages.map((message) => (
                            <S.MessageCard 
                            key={message.id}
                            $unread={message.isRead==='N'}
                            onClick={()=> setSelectedMessage(message)}
                            >
                                <div className="card-top">
                                    <div className="title-area">
                                        {message.isRead === 'N' && (
                                            <span className="unread-dot"/>
                                        )}
                                        <strong>{message.title}</strong>
                                    </div>
                                    <S.ReadStatusBadge>
                                        <span>
                                        {message.isRead === "Y" 
                                        ? <FaRegEnvelopeOpen /> 
                                        : <FaRegEnvelope/>}
                                        </span>
                                    </S.ReadStatusBadge>
                                </div>

                                <div className="card-bottom">
                                    <span className="sender"> 
                                        <FaRegUser/>
                                        <strong>{message.receiverName}</strong>
                                        {message.receiverEmpId}
                                    </span>
                                    <S.MessageDate>{formatMessageDate(message.sentAt)}</S.MessageDate>
                                    <FaChevronRight className="arrow-icon"/>
                                </div>
                            </S.MessageCard>
                        ))
                        ) : (
                        <S.EmptyMessageState>
                            <FaPaperPlane />
                            <strong>보낸 쪽지가 없습니다.</strong>
                            <span>보낸 쪽지 내역이 여기에 표시됩니다.</span>
                        </S.EmptyMessageState>
                        ))}
                    </S.MessageListWrapper>
                    ) )}
                </S.MessageModalBody>
            </S.MessageWrapper>
        </ModalLayout>
        );
}

           