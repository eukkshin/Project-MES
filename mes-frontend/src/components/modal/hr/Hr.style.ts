import styled from "styled-components";

export const HRMoreMenu = styled.div`
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 2px;

  width: 180px;
  padding: 5px;

  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);

  border: 0.5px solid rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.05); 
    
  animation: appleFadeIn 0.15s cubic-bezier(0.25, 1, 0.5, 1);

  @keyframes appleFadeIn {
    from {
      opacity: 0;
      transform: scale(0.96) translateY(-2px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

export const HRMenuItem = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  padding: 8px 10px;

  border: none;
  border-radius: 7px;

  background: transparent;
  color: ${({ $danger }) => ($danger ? "#ff3b30" : "#1d1d1f")}; // 애플 시스템 레드 / 다크텍스트

  font-size: 12px;
  font-weight: 400;
  font-family: inherit;
  text-align: left;

  cursor: pointer;
  transition: background 0.1s ease, color 0.1s ease;

  svg {
    flex-shrink: 0;
    width: 13px;
    height: 13px;
    color: ${({ $danger }) => ($danger ? "#ff3b30" : "#86868b")};
  }

  &:hover {
    background: ${({ $danger }) => ($danger ? "#fff2f2" : "#0066cc")};
    color: ${({ $danger }) => ($danger ? "#d70015" : "#ffffff")};

    svg {
      color: ${({ $danger }) => ($danger ? "#d70015" : "#ffffff")};
    }
  }
`;

export const HRModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

export const HRModalContainer = styled.div`
  width: min(440px, 100%);
  max-height: min(600px, calc(100vh - 32px));
  overflow-y: auto;

  background: #ffffff;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  
  box-shadow: 
    0 24px 48px rgba(0, 0, 0, 0.18),
    0 0 1px rgba(0, 0, 0, 0.1);

  animation: appleModalPop 0.22s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes appleModalPop {
    from {
      opacity: 0;
      transform: scale(0.94) translateY(8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

// 💡 애플 스타일 헤더 (잡다한 배경색 빼고 순백색에 얇은 선으로 정갈하게)
export const HRModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 24px 16px 24px;
  background: #ffffff;
  border-bottom: 0.5px solid #f5f5f7; // 애플 기본 구분선 톤

  h2 {
    margin: 0;
    color: #1d1d1f;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.3px;
  }
`;

export const HRModalClose = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 50%; // 애플의 시그니처 원형 닫기 버튼 감성
  background: #f5f5f7;
  color: #86868b;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #e8e8ed;
    color: #1d1d1f;
  }
`;

// 💡 바디 영역 (여백을 넓게 주어 답답함 제거)
export const HRModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
  background: #ffffff;
`;

export const HRFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    color: #86868b;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  input,
  select {
    width: 100%;
    height: 40px;
    padding: 0 12px;
    
    background: #f5f5f7; // 애플 입력창 연한 배경 톤
    border: 0.5px solid transparent;
    border-radius: 8px;
    
    outline: none;
    color: #1d1d1f;
    font-size: 13px;
    font-family: inherit;
    box-sizing: border-box;
    transition: all 0.15s ease;

    &:focus {
      background: #ffffff;
      border-color: #0066cc;
      box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.12);
    }
  }
`;

export const HRModalHint = styled.p`
  margin: 0;
  color: #86868b;
  color: #475569;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
`;

export const HRModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px;
  background: #ffffff;
  border-top: 0.5px solid #f5f5f7;
`;

export const HRModalButton = styled.button<{
  $variant?: "primary" | "secondary" | "danger";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 36px;
  padding: 0 16px;
  border-radius: 8px; // 부드러운 사각형
  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s ease;

  border: 0.5px solid ${({ $variant }) =>
    $variant === "primary"
      ? "#0066cc"
      : $variant === "danger"
      ? "#ff3b30"
      : "rgba(0, 0, 0, 0.15)"};

  background: ${({ $variant }) =>
    $variant === "primary"
      ? "#0066cc"
      : $variant === "danger"
      ? "#ff3b30"
      : "#ffffff"};

  color: ${({ $variant }) =>
    $variant === "primary" || $variant === "danger" ? "#ffffff" : "#1d1d1f"};

  box-shadow: ${({ $variant }) =>
    $variant === "primary"
      ? "0 2px 6px rgba(0, 102, 204, 0.25)"
      : $variant === "danger"
      ? "0 2px 6px rgba(255, 59, 48, 0.25)"
      : "0 1px 2px rgba(0, 0, 0, 0.04)"};

  &:hover {
    opacity: 0.9;
    transform: translateY(-0.5px);
  }

  &:active {
    transform: translateY(0);
    opacity: 0.8;
  }
`;

export const HREmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 240px;
  color: #86868b;

  > svg {
    font-size: 28px;
    color: #d2d2d7;
  }

  strong {
    color: #1d1d1f;
    font-size: 13px;
    font-weight: 500;
  }

  span {
    font-size: 11px;
    color: #86868b;
  }
`;