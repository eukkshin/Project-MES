// src/styled.d.ts
// import "styled-components";

// import { ThemeType } from "./styles/theme";

// declare module "styled-components" {
//   export interface DefaultTheme extends ThemeType {
//     colors: {
//       primary: string;
//       background: string;
//       text: string;
//     };
//   }
// }

import 'styled-components';

interface StatusToken {
  text: string;
  bg: string;
  border: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark' | 'high-contrast';
    typography: {
      fontSize: {
        h1: string;
        h2: string;
        body: string;
        caption: string;
      };
      fontWeight: {
        regular: number;
        semiBold: number;
        bold: number;
      };
    };
    radius: {
      sm: string;
      md: string;
      round: string;
      circle: string;
    };
    colors: {
      primary: {
        default: string;
        hover: string;
        subtle: string;
      };
      secondary: {
        default: string;
        hover: string;
      };
      bg: {
        canvas: string;
        surface: string;
        elevated: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        inverse: string;
      };
      border: {
        default: string;
        input: string;
        focus: string;
      };
      status: {
        success: StatusToken;
        warning: StatusToken;
        danger: StatusToken;
        info: StatusToken;
      };
    };
    shadows: {
      subtle: string;
      elevated: string;
      modal: string;
    };
  }
}
