"use client";

import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "@/assets/css/GlobalStyle";
import { theme } from "@/assets/css/theme";

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
