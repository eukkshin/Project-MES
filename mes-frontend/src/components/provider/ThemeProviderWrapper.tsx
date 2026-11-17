'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@/assets/css/GlobalStyle';
import { darkTheme, highContrastTheme, lightTheme } from '@/assets/css/theme';

export type ThemeMode = 'light' | 'dark' | 'high-contrast';

interface ThemeContextValue {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  cycleThemeMode: () => void;
}

const STORAGE_KEY = 'mes-ui-theme-mode';

const THEME_MAP: Record<ThemeMode, DefaultTheme> = {
  light: lightTheme,
  dark: darkTheme,
  'high-contrast': highContrastTheme,
};

const ThemeModeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  // SSR 안전성을 위해 초기 상태는 기본값('light')으로 고정
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light');

  // 클라이언트 마운트 시 localStorage 또는 OS 다크 모드 설정 복원
  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (savedTheme && savedTheme in THEME_MAP) {
        setThemeModeState(savedTheme);
        return;
      }

      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setThemeModeState('dark');
      }
    } catch {
      // 시크릿 모드 등으로 localStorage 접근이 차단된 경우 기본 테마 유지
    }
  }, []);

  // 테마 변경 시 HTML 루트 속성과 localStorage 동기화
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    try {
      window.localStorage.setItem(STORAGE_KEY, themeMode);
    } catch {
      // 스토리지 쓰기 실패 방어
    }
  }, [themeMode]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  // 버튼 클릭 한 번으로 라이트 -> 다크 -> 고대비 순환 전환
  const cycleThemeMode = () => {
    setThemeModeState((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'high-contrast';
      return 'light';
    });
  };

  const contextValue = useMemo(
    () => ({ themeMode, setThemeMode, cycleThemeMode }),
    [themeMode]
  );

  const currentTheme = THEME_MAP[themeMode];

  return (
    <ThemeModeContext.Provider value={contextValue}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

/**
 * 하위 컴포넌트(Header 등)에서 현재 테마 조회 및 전환을 위해 사용하는 커스텀 훅
 */
export function useThemeMode(): ThemeContextValue {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode는 ThemeProviderWrapper 내부에서만 사용할 수 있습니다.');
  }
  return context;
}