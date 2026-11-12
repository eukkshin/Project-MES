import { FaSpinner } from 'react-icons/fa6';
import styled from "styled-components";

export const MessageWrapper = styled.div`
  margin: -24px -26px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 480px;
  max-height: calc(100dvh - 180px);

    @media (max-width: 480px) {
        margin: -20px;
    }
`;

export const MessageTabs = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
`;

export const MessageTab = styled.button<{ $active: boolean }>`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  
  padding: 14px 12px;
  border: none;
  background: transparent;
  
  color: ${({ $active }) => ($active ? "#2563eb" : "#64748b")};
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  cursor: pointer;
  position: relative;
  transition: color 0.15s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ $active }) => ($active ? "#2563eb" : "transparent")};
    border-radius: 2px 2px 0 0;
    transition: background 0.15s ease;
  }

  &:hover {
    color: #2563eb;
  }
`;


export const MessageModalBody = styled.div`
  flex: 1;
  min-height: 0;
  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 16px;
  
  background: #f1f4f8;
  overflow-y: auto;
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #e2e9df;
    border-radius: 10px;
  }
   &::-webkit-scrollbar-track {
    background: transparent;
  }

 
`;

export const ReceiverInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;

  .label {
    color: #64748b;
    font-size: 12px;
    font-weight: 600;
  }

  .target {
    color: #172033;
    font-size: 13px;
    font-weight: 700;
  }

  .dept {
    color: #94a3b8;
    font-size: 11px;
  }
`;


export const MessageForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

export const MessageFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: #334155;
    font-size: 12px;
    font-weight: 700;
  }
`;

export const MessageListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 260px;
`;

export const MessageGuide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 0 10px;
  font-size: 11px;
  color: #94a3b8;

  svg {
    font-size: 12px;
    color: #94a3b8;
  }
`;

export const MessageCard = styled.div<{ $unread: boolean }>`
  padding: 17px 20px;
  border: 1px solid ${({ $unread }) =>
    $unread ? "#dbeafe" : "#e9edf2"};
  border-radius: 14px;
  background: ${({ $unread }) =>
    $unread ? "#f8fbff" : "#ffffff"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #93c5fd;
    background: #f5f9ff;
    transform: translateY(-1px);
    box-shadow: 0 5px 16px rgba(37, 99, 235, 0.07);

    .arrow-icon {
      color: #3b82f6;
      transform: translateX(4px);
    }

    .sender svg {
      color: #3b82f6;
    }
  }

  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;

    > span {
      flex-shrink: 0;
      font-size: 11px;
      color: #94a3b8;
    }
  }

  .title-area {
    display: flex;
    align-items: center;
    gap: 9px;
    min-width: 0;

    strong {
      overflow: hidden;
      font-size: 14px;
      font-weight: ${({ $unread }) => $unread ? 700 : 500};
      color: #273449;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .unread-dot {
    width: 7px;
    height: 7px;
    flex-shrink: 0;
    border-radius: 50%;
    background: #3b82f6;
  }

  .card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sender {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    color: #64748b;

    svg {
      font-size: 12px;
      color: #94a3b8;
      transition: color 0.2s ease;
    }
  }

  .arrow-icon {
    font-size: 11px;
    color: #cbd5e1;
    transition: all 0.2s ease;
  }
`;

export const EmptyMessageState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex: 1;
  min-height: 260px;
  color: #94a3b8;

  svg {
    font-size: 28px;
    color: #cbd5e1;
  }

  strong {
    color: #64748b;
    font-size: 13px;
  }

  span {
    font-size: 11px;
  }
`;




export const MessageReceiver = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  min-height: 48px;
  padding: 9px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
  box-sizing: border-box;
`;

export const ReceiverAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 12px;
  font-weight: 800;
`;

export const ReceiverInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;

  strong {
    color: #172033;
    font-size: 12px;
    font-weight: 700;
  }

  span {
    color: #94a3b8;
    font-size: 10px;
  }
`;

export const MessageInput = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  background: #ffffff;
  color: #172033;
  font-size: 12px;
  font-family: inherit;
  box-sizing: border-box;
  transition: border-color 0.18s ease;

  &::placeholder {
    color: #a0aec0;
  }

  &:focus {
    border-color: #2563eb;
  }
`;

export const MessageTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  resize: none;

  line-height: 1.6;
  font-size: 12px;
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  background: #ffffff;
  color: #172033;
  font-family: inherit;
  box-sizing: border-box;

  white-space: pre-wrap;
  overflow-wrap: anywhere;
  transition: border-color 0.18s ease;

  &::placeholder {
    color: #a0aec0;
  }
  &:focus {
    border-color: #2563eb;
  }
`;

export const MessageCharCount = styled.span`
  display: block;
  text-align: right;
  font-size: 11px;
  color: #94a3b8;
  margin-top: -8px;
  padding-top: 4px;
`;


export const MessageModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 14px;
  margin-top: 2px;
  border-top: 1px solid #e2e8f0;
`;


export const MessageSendButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 105px;
  height: 40px;
  padding: 0 16px;
  border: 1px solid #2563eb;
  border-radius: 8px;
  background: #2563eb;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover:not(:disabled) {
    background: #1d4ed8;
    border-color: #1d4ed8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  svg {
    font-size: 12px;
  }
`;

//상세화면
export const MessageDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 300px;
`;

export const MessageBackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 4px 0;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #2563eb;
    svg{
      font-size: 13px;
      transform: translateX(-4px);
    }
  }
`;

export const MessageDetailHeader = styled.div`
  padding: 22px 22px 18px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px 12px 0 0;

  display: flex;
  flex-direction: column;
`;

export const DetailTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 800;
    color: #172033;
    letter-spacing: -0.2px;
  }
`;

export const ReadStatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  font-size: 10px;
  font-weight: 700;

  svg {
    font-size: 11px;
  }
  span {
    display: flex;
    align-items: center;
    color: #16a34a;
  }
 
`;

export const MessageDetailContent = styled.div`
 flex: 1;
  min-height: 170px;
  margin-top: -14px;
  padding: 22px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-top: none;
  border-radius: 0 0 12px 12px;

  color: #334155;
  font-size: 13px;
  line-height: 1.9;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
`;

export const SenderInfoBox = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
`;

export const SenderAvatar = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #eff6ff;
  color: #2563eb;
  font-size: 14px;
  flex-shrink: 0;
`;

export const SenderTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;

  strong {
    font-size: 12px;
    font-weight: 700;
    color: #172033;
  }

  span {
    font-size: 10px;
    color: #94a3b8;
  }
`;

export const MessageDate = styled.span`
  margin-left: auto;
  margin-right: 10px;
  font-size: 11px;
  color: #94a3b8;
  align-self: flex-end;
  letter-spacing: -0.3px;

`;

export const MessageDetailFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 4px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    color: #16a34a;
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 10px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  color: #d9534f;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
        background: #feecec;
        border-color: #f0d5d5;
    }

    &:active {
        transform: scale(0.97);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    svg {
        font-size: 13px;
    }
`;