import styled from "styled-components";
import { motion } from "motion/react";

export {
  PageContainer,
  PageHeader,
  PageHeading,
  Eyebrow,
  PageTitle,
  PageDescription,
  RefreshButton,
  ContentGrid,
  Panel,
  PanelHeader,
  PanelHeading,
  PanelIcon,
  PanelTitle,
  PanelDescription,
  ItemCount,
  ListToolbar,
  SearchWrapper,
  SearchInput,
  EmptyState,
  RetryButton,
  FilterSelect,
} from "@/assets/css/admin/Admin.styles";

export * from '@/assets/css/components/modal/MessageModal.styles'

// 쪽지함 전체 영역
export const MessagePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  min-width: 0;
`;

// // 받은 쪽지 / 보낸 쪽지 탭
// export const MessageTabs = styled.div`
//   display: flex;
//   flex-shrink: 0;

// `;

// export const MessageTab = styled.button<{ $active: boolean }>`
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 7px;
//   padding: 14px 20px;
//   border: none;
//   background: transparent;
//   color: ${({ $active }) => ($active ? "#2563eb" : "#64748b")};
//   font-size: 13px;
//   font-weight: ${({ $active }) => ($active ? 700 : 500)};
//   cursor: pointer;
// `;

// // 탭 밑줄 애니메이션
// export const MotionIndicator = styled(motion.div)`
//   position: absolute;
//   bottom: 0;
//   left: 12px;
//   width: calc(100% - 24px);
//   height: 2px;
//   background: #2563eb;
//   border-radius: 2px 2px 0 0;
// `;

export const MessageTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

export const MessageTab = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 18px;

  border: none;
  border-radius: 999px;

  background: ${({ $active }) =>
    $active ? "#2563eb" : "#f1f5f9"};

  color: ${({ $active }) =>
    $active ? "#ffffff" : "#64748b"};

  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? "#1d4ed8" : "#e2e8f0"};
  }
`;


// // Framer Motion을 활용한 애니메이션 인디케이터 바
// export const MotionIndicator = styled(motion.div)`
//   position: absolute;
//   bottom: -2px; // 컨테이너의 하단 라인과 겹치도록 배치
//   left: 0;
//   right: 0;
//   height: 3px;
//   background-color: #2563eb;
//   border-radius: 3px 3px 0 0;
// `;

// 왼쪽 목록 + 오른쪽 상세 내용
export const MessageContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.5fr);
  gap: 18px;
  min-width: 0;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const MessageListPanel = styled.section`
  min-width: 0;
  overflow: hidden;
  min-height: 0;
  max-height: 500px;
  overflow-y: auto;
  padding: 20px;
  background: #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

// export const MessageDetailPanel = styled.section`
//   display: flex;
//   flex-direction: column;
//   gap: 5px;
//   min-width: 0;
//   min-height: 450px;
//   background: #ffffff;
//   padding: 0 20px;

//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   height: 100%;
//   padding: 24px;
//   background: transparent; // 중첩 박스 느낌 제거를 위해 투명 또는 패널과 동일한 배경으로 설정
//   border: none;             // 테두리 제거
//   box-shadow: none;
// `;

export const MessageDetailPanelHeader= styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 96px;
  padding: 10px 20px;

  border-bottom: 1px solid #edf0f5;

  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 20px 16px;
  }
`;

export const UnreadDot = styled.span`
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 8px;
  border-radius: 50%;
  background: #3b82f6;
  vertical-align: middle;
`;

export const MessageDetailPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-height: 450px;
  overflow: hidden;
  padding: 24px 24px 16px 24px  ;
  background: transparent; 
  border: none;             
`;

export const DetailHeader = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DetailContent = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto ;
  padding: 10px 22px;
  color: #334155;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
`;

export const DetailFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid #f1f5f9;
  
  span {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    color: #16a34a;
  }
`;