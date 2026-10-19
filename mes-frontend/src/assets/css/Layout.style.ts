import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: #f5f7fb;
  font-family: "Pretendard", sans-serif;
`;

export const LnbWrapper = styled.aside`
  position: sticky;
  top: 0;

  width: 260px;
  height: 100vh;
  flex-shrink: 0;

  background: #111e32;
  z-index: 100;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const Workspace = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  min-height: 100vh;
`;

export const TopArea = styled.div`
  position: sticky;
  top: 0;
  z-index: 90;
`;

export const ContentArea = styled.main`
  flex: 1;
  min-width: 0;
  width: 100%;
  padding: 32px 36px;

  background: #f5f7fb;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;
