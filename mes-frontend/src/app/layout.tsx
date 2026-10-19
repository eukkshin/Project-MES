import type { Metadata } from "next";

import * as S from "@/assets/css/LayoutWrapper";
import ConditionalLayout from "@/components/ConditionalLayout";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";

import StyledComponentsRegistry from "./lib/registry";

export const metadata: Metadata = {
  title: { template: "%s • MES", default: "MES 시스템" },
  description: "사내 MES 시스템입니다",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.min.css"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProviderWrapper>
            <ConditionalLayout>{children}</ConditionalLayout>
          </ThemeProviderWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
