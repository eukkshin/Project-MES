// export const theme = {
//   colors: {
//     background: "#fff",
//     // background: "#536692",
//     primary: "#4e73df",
//     text: "#333",
//   },
// };

// export type ThemeType = typeof theme;

import { DefaultTheme } from 'styled-components';

/**
 * 1단계: 원시 팔레트 (Primitive Palette)
 * 컴포넌트에서 직접 참조하지 않고, 시맨틱 토큰 매핑에만 사용합니다.
 */
const palette = {
  blue: {
    50: '#eef5fc',
    100: '#d4e5f7',
    300: '#66a3e0', // 다크 모드용 고명도 블루
    400: '#3385d6', // 고대비 모드용 블루
    500: '#007bff', // Secondary 강조 블루
    600: '#004b9c', // MES 브랜드 기본 Primary
    700: '#003876', // Primary Hover / Active
  },
  gray: {
    0: '#ffffff',
    50: '#f8fafc',
    100: '#f4f6f8', // 라이트 모드 기본 캔버스 배경
    200: '#e0e0e0', // 기본 보더
    300: '#dcdcdc', // 입력창 보더
    500: '#888888', // 비활성/보조 텍스트
    600: '#666666', // 서브 텍스트
    800: '#333333',
    900: '#222222', // 기본 본문 텍스트
    950: '#0f172a', // 다크 모드 기본 배경
    1000: '#000000', // 고대비 모드 순수 블랙
  },
  status: {
    success: { main: '#4caf50', light: '#e8f5e9', dark: '#1b5e20', bright: '#81c784' },
    warning: { main: '#ff9800', light: '#fff3e0', dark: '#e65100', bright: '#ffb74d' },
    danger: { main: '#e53935', light: '#ffebee', dark: '#450a0a', bright: '#ff4d4d' },
    info: { main: '#1e88e5', light: '#e3f2fd', dark: '#0d47a1', bright: '#64b5f6' },
  },
} as const;

/**
 * 공통 디자인 토큰 (타이포그래피, 모서리, 그림자)
 * 기존 Project-MES 컴포넌트에서 추출한 규칙을 표준화했습니다.
 */
const baseTokens = {
  typography: {
    fontSize: {
      h1: '26px',      // 24px ~ 28px 대제목
      h2: '19px',      // 18px ~ 20px 섹션/모달 헤더
      body: '14px',    // 14px ~ 15px 기본 본문/테이블
      caption: '12px', // 12px ~ 13px 라벨/배지
    },
    fontWeight: {
      regular: 400,
      semiBold: 600,
      bold: 700,
    },
  },
  radius: {
    sm: '4px',   // 버튼, Input, Select
    md: '8px',   // 카드, 테이블 래퍼, 모달
    round: '20px',
    circle: '50%',
  },
} as const;

/**
 * 2단계: 테마별 시맨틱 토큰 (Semantic Tokens)
 */
export const lightTheme: DefaultTheme = {
  mode: 'light',
  ...baseTokens,
  colors: {
    primary: {
      default: palette.blue[600],
      hover: palette.blue[700],
      subtle: palette.blue[50],
    },
    secondary: {
      default: palette.blue[500],
      hover: palette.status.info.main,
    },
    bg: {
      canvas: palette.gray[100],
      surface: palette.gray[0],
      elevated: palette.gray[0],
    },
    text: {
      primary: palette.gray[900],
      secondary: palette.gray[600],
      disabled: palette.gray[500],
      inverse: palette.gray[0],
    },
    border: {
      default: palette.gray[200],
      input: palette.gray[300],
      focus: palette.blue[600],
    },
    status: {
      success: {
        text: palette.status.success.main,
        bg: palette.status.success.light,
        border: palette.status.success.main,
      },
      warning: {
        text: palette.status.warning.main,
        bg: palette.status.warning.light,
        border: palette.status.warning.main,
      },
      danger: {
        text: palette.status.danger.main,
        bg: palette.status.danger.light,
        border: palette.status.danger.main,
      },
      info: {
        text: palette.status.info.main,
        bg: palette.status.info.light,
        border: palette.status.info.main,
      },
    },
  },
  shadows: {
    subtle: '0 2px 4px rgba(0, 0, 0, 0.05)',
    elevated: '0 4px 12px rgba(0, 0, 0, 0.1)',
    modal: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
};

export const darkTheme: DefaultTheme = {
  mode: 'dark',
  ...baseTokens,
  colors: {
    primary: {
      default: palette.blue[300], // 어두운 배경 시인성을 위해 명도 상향
      hover: palette.blue[400],
      subtle: '#1e293b',
    },
    secondary: {
      default: palette.status.info.bright,
      hover: palette.blue[300],
    },
    bg: {
      canvas: palette.gray[950],
      surface: '#1e293b',
      elevated: '#334155',
    },
    text: {
      primary: palette.gray[50],
      secondary: '#cbd5e1',
      disabled: '#64748b',
      inverse: palette.gray[950],
    },
    border: {
      default: '#334155',
      input: '#475569',
      focus: palette.blue[300],
    },
    status: {
      success: {
        text: palette.status.success.bright,
        bg: '#052e16',
        border: palette.status.success.bright,
      },
      warning: {
        text: palette.status.warning.bright,
        bg: '#431407',
        border: palette.status.warning.bright,
      },
      danger: {
        text: '#fca5a5',
        bg: palette.status.danger.dark,
        border: '#fca5a5',
      },
      info: {
        text: palette.status.info.bright,
        bg: '#172554',
        border: palette.status.info.bright,
      },
    },
  },
  shadows: {
    subtle: '0 2px 4px rgba(0, 0, 0, 0.4)',
    elevated: '0 4px 12px rgba(0, 0, 0, 0.5)',
    modal: '0 8px 24px rgba(0, 0, 0, 0.65)',
  },
};

export const highContrastTheme: DefaultTheme = {
  mode: 'high-contrast',
  ...baseTokens,
  colors: {
    primary: {
      default: palette.blue[400],
      hover: palette.blue[300],
      subtle: '#001a33',
    },
    secondary: {
      default: '#66b3ff',
      hover: '#99ccff',
    },
    bg: {
      canvas: palette.gray[1000],
      surface: palette.gray[1000],
      elevated: '#121212',
    },
    text: {
      primary: palette.gray[0],
      secondary: '#e5e5e5',
      disabled: '#a3a3a3',
      inverse: palette.gray[1000],
    },
    border: {
      default: palette.gray[0], // 고대비 환경에서 영역 경계 명확화
      input: palette.gray[0],
      focus: '#ffff00',
    },
    status: {
      success: {
        text: '#00ff66',
        bg: palette.gray[1000],
        border: '#00ff66',
      },
      warning: {
        text: '#ffcc00',
        bg: palette.gray[1000],
        border: '#ffcc00',
      },
      danger: {
        text: palette.status.danger.bright,
        bg: palette.gray[1000],
        border: palette.status.danger.bright,
      },
      info: {
        text: '#33ccff',
        bg: palette.gray[1000],
        border: '#33ccff',
      },
    },
  },
  shadows: {
    subtle: 'none', // 고대비 모드에서는 그림자 대신 명확한 border 사용
    elevated: 'none',
    modal: '0 0 0 2px #ffffff',
  },
};