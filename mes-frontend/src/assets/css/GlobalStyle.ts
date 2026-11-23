"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Thin.woff2') format('woff2');
    font-weight: 100;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraLight.woff2') format('woff2');
    font-weight: 200;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Light.woff2') format('woff2');
    font-weight: 300;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Regular.woff2') format('woff2');
    font-weight: 400;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Medium.woff2') format('woff2');
    font-weight: 500;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Bold.woff2') format('woff2');
    font-weight: 700;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraBold.woff2') format('woff2');
    font-weight: 800;
    font-display: swap;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Black.woff2') format('woff2');
    font-weight: 900;
    font-display: swap;
}
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    /* 테마 모드에 맞춰 브라우저 기본 스크롤바, 폼 컨트롤 색상 자동 전환 */
    color-scheme: ${({ theme }) => (theme.mode === 'light' ? 'light' : 'dark')};
    scrollbar-gutter: stable; 
  }

  body {
    font-family: 'Escoredream';
    background-color: ${({ theme }) => theme.colors.bg.canvas};
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.body};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.2s ease, color 0.2s ease;
  }
  a{
    color: inherit;
    text-decoration: none;
  }
  ol, ul, li {
    list-style: none;
  }

  button, input, select, textarea{
    font: inherit;
  }

  &::-webkit-scrollbar {
    width: 3px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.bg.canvas};
    border-radius: ${({ theme }) => theme.radius.round};
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border: 2px solid #f1f5f9;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.border.input};
    border: 1px solid ${({ theme }) => theme.colors.bg.canvas};
    border-radius: ${({ theme }) => theme.radius.round};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
    background: ${({ theme }) => theme.colors.text.disabled};
  }
  
`;
