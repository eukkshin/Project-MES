'use client';
import { useState } from 'react';
import { 
    FaArrowRotateRight, 
    FaInbox ,
    FaRegEnvelopeOpen,
    FaPaperPlane,
    FaEnvelope,
    FaRegUser,
    FaEnvelopeOpen,
    FaRegTrashCan,
    FaEnvelopeCircleCheck,
    FaMessage,
    FaRegCommentDots,
} from 'react-icons/fa6';
import * as S from './MessageBox.styles';
import type { Message } from '@/types/message';
import { useDeleteMessage, useGetMessagesReceived, useGetMessagesSent, useUpdateMessageIsRead } from '@/hooks/useMessage';
import { formatMessageDate } from '@/components/modal/MessageModal';
import { useToastContext } from '@/context/ToastContext';
import { useAlertStore } from '@/store/useAlertStore';

export default function MessageBox(){

    const {showToast} = useToastContext();
    const showAlert =useAlertStore(state=>state.showAlert);
    const {data: receivedMessages=[], refetch, isFetching, isPending} = useGetMessagesReceived();
    const {data: sentMessages =[], refetch:refetchSent, isFetching:isFetchingSent} = useGetMessagesSent();
    const { mutate }= useUpdateMessageIsRead();
    const { mutate: deleteMutate, isPending:isDeleting} = useDeleteMessage();
    const [activeTab, setActiveTab] = useState<"received"|"sent">("received");
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    const messages = activeTab === 'received' ? receivedMessages : sentMessages;

    const handleDelete = (id:number)=>{
        showAlert("쪽지를 삭제하시겠습니까?", 'error', '삭제 확인',
            ()=>{
                deleteMutate(id,{
                    onSuccess:()=>{
                        setSelectedMessage(null);
                        showToast('쪽지가 삭제되었습니다', 'success')
                    },
                    onError:(error)=>{
                        console.error('쪽지삭제실패', error)
                        showToast('쪽지삭제에 실패했습니다', 'error')
                    }
                });
            }
        )
    }

    const handleMessageClick = (message:Message)=>{
        setSelectedMessage(message);
        if (activeTab === "received" && message.isRead === "N") {
            mutate(message.id, {
                onSuccess:()=>{
                    setSelectedMessage(prev=> prev?.id=== message.id ? { ...prev, isRead:'Y'}: prev);
                },
                onError:(error)=>{
                    console.error("읽음 처리 실패:", error);
                    showToast("읽음 처리에 실패했습니다.", "error");
                }
            });
        }
    };

    return(
        <S.PageContainer>
            <S.PageHeader>
                <S.PageHeading>
                    <S.Eyebrow>MESSAGE BOX</S.Eyebrow>
                    <S.PageTitle>쪽지함</S.PageTitle>
                    <S.PageDescription>
                         주고받은 쪽지를 확인하고 관리할 수 있습니다.
                    </S.PageDescription>
                </S.PageHeading>

                    <S.RefreshButton
                    type="button"
                    onClick={() => {
                        if(activeTab === 'received'){
                            void refetch();
                        }else{
                            void refetchSent();
                        }
                    }}
                    disabled={isFetching || isFetchingSent}
                >
                    <FaArrowRotateRight />
                    {isFetching||isFetchingSent ? "조회 중..." : "새로고침"}
                </S.RefreshButton>
            </S.PageHeader>

            <S.MessagePageContainer>
                <S.MessageTabs>
                    <S.MessageTab $active={activeTab==='received'}
                    onClick={()=>{
                        setSelectedMessage(null);
                        setActiveTab('received')}}
                    >
                        <FaRegEnvelopeOpen/>
                        받은 쪽지
                    
                    </S.MessageTab>
                    <S.MessageTab $active={activeTab==='sent'}
                     onClick={()=>{
                        setSelectedMessage(null);
                        setActiveTab('sent')}}
                    >
                        <FaPaperPlane/>
                        보낸 쪽지
                    
                    </S.MessageTab>
                </S.MessageTabs>

                <S.MessageContentGrid>
                    <S.Panel>
                        <S.PanelHeader>
                            <S.PanelHeading>
                                <S.PanelIcon>
                                    {activeTab==='received'
                                    ? <FaEnvelope/>
                                    : <FaPaperPlane/> }
                                </S.PanelIcon>
                                <div>
                                <S.PanelTitle>쪽지 목록</S.PanelTitle>
                                <S.PanelDescription>
                                    {activeTab === 'received' 
                                    ? "확인할 쪽지를 선택하면 자동으로 읽음 처리됩니다."
                                    :  "내가 보낸 쪽지를 확인할 수 있습니다."}
                                </S.PanelDescription>
                                </div>
                            </S.PanelHeading>
                        </S.PanelHeader>
                        
                        <S.MessageListPanel>
                        {messages.length === 0 ? (
                            <S.EmptyMessageState>
                                <FaInbox/>
                                <p>
                                    {activeTab==='received'
                                    ? "받은 쪽지가 없습니다."
                                    :"보낸 쪽지가 없습니다."}
                                </p>
                            </S.EmptyMessageState>
                        ):(
                         messages.map(message=> {
                            const displayName = 
                            activeTab === 'received'
                            ? message.senderName
                            : message.receiverName;

                            return(
                            <S.MessageCard
                            key={message.id}
                            $unread={activeTab==='received' && message.isRead === 'N'}
                            onClick={()=>handleMessageClick(message)}
                            >
                                <S.DetailTitleRow>
                                     <h3>
                                        {activeTab === "received" && message.isRead === "N" && (
                                            <S.UnreadDot/>
                                        )}
                                        {message.title}
                                    </h3>
                                        <S.ReadStatusBadge>
                                            <span>{message.isRead === "Y" ? <FaEnvelopeOpen /> : <FaEnvelope />}</span>
                                        </S.ReadStatusBadge>
                                </S.DetailTitleRow>
    
                                <S.SenderInfoBox>
                                    <S.SenderAvatar>
                                        <FaRegUser />
                                    </S.SenderAvatar>
    
                                    <S.SenderTextBox>
                                        <strong>{displayName}</strong>
                                        <span>{activeTab === "received" ? "보낸 사람" : "받는 사람"}</span>
                                    </S.SenderTextBox>
    
                                    <S.MessageDate>
                                        {formatMessageDate(message.sentAt)}
                                    </S.MessageDate>
                                </S.SenderInfoBox>
        
                            </S.MessageCard>
                            )
                         })
                        )}
                        </S.MessageListPanel>
                    </S.Panel>

                    <S.Panel style={{height:'100%', minHeight:'500px'}}>
                         <S.PanelHeader>
                            <S.PanelHeading>
                                <S.PanelIcon>
                                    <FaRegCommentDots/>
                                </S.PanelIcon>
                                <div>
                                <S.PanelTitle>
                                    {activeTab=== 'received'? '받은 쪽지 상세': '보낸 쪽지 상세'}
                                </S.PanelTitle>
                                <S.PanelDescription>
                                  선택한 쪽지의 상세 내용을 확인할 수 있습니다.
                                </S.PanelDescription>
                                </div>
                            </S.PanelHeading>
                        </S.PanelHeader>

                        {selectedMessage? (
                            <S.MessageDetailPanel>
                                <S.DetailHeader>
                                    <S.DetailTitleRow>
                                        <h3>{selectedMessage.title}</h3>
                                    </S.DetailTitleRow>
                                    <S.SenderInfoBox>
                                        <S.SenderAvatar>
                                            <FaRegUser/>
                                        </S.SenderAvatar>
                                        <S.SenderTextBox>
                                            <strong>
                                                {activeTab === 'received'
                                                ? selectedMessage.senderName
                                                :selectedMessage.receiverName}
                                            </strong>
                                            <span>
                                                {activeTab === "received" ? "보낸 사람" : "받는 사람"} 
                                            </span>
                                            <S.MessageDate>
                                                {formatMessageDate(selectedMessage.sentAt)}
                                            </S.MessageDate>
                                        </S.SenderTextBox>
                                    </S.SenderInfoBox>
                                </S.DetailHeader>

                                <S.DetailContent>
                                    {selectedMessage.content}
                                </S.DetailContent>

                                <S.DetailFooter>
                                    <span>
                                    {selectedMessage.isRead === "Y"
                                        ? <><FaEnvelopeOpen /> 읽음</>
                                        : <><FaEnvelope /> 읽지 않음</>}
                                    </span>

                                    <S.DeleteButton
                                    type="button"
                                    onClick={() => handleDelete(selectedMessage.id)}
                                    >
                                    <FaRegTrashCan />
                                    </S.DeleteButton>
                                </S.DetailFooter>
                            </S.MessageDetailPanel>
                        ): (
                        <S.EmptyMessageState>
                            <FaRegEnvelopeOpen />
                            <strong>쪽지를 선택해 주세요.</strong>
                            <span>왼쪽 목록에서 쪽지를 클릭하면 내용을 확인할 수 있습니다.</span>
                        </S.EmptyMessageState>
                        )}
                    </S.Panel>
                </S.MessageContentGrid>
            </S.MessagePageContainer>
        </S.PageContainer>
    )
}