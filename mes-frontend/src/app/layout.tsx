import type { Metadata } from "next";

import * as S from "@/assets/css/LayoutWrapper";
import ConditionalLayout from "@/components/provider/ConditionalLayout";
import  { ThemeProviderWrapper } from "@/components/provider/ThemeProviderWrapper";

import StyledComponentsRegistry from "@/lib/registry";
import QueryAlertProvider from "@/components/provider/QueryAlertProvider";
import { ScheduleProvider } from "@/context/ScheduleContext";
import { AlarmToast } from "@/components/calendar/sheduleAlarm/Alarm";
import ToastProvider from "@/context/ToastContext";
import MesAlertWatcher from "@/components/provider/MesAlertWatcher";

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
            <QueryAlertProvider>
              <ToastProvider>
              <ScheduleProvider>
                <AlarmToast/>
                <MesAlertWatcher/> {/* 로그인 후 모든 페이지에서 실시간 위험 수치 감시 */}
                <ConditionalLayout>{children}</ConditionalLayout>
              </ScheduleProvider>
              </ToastProvider>
            </QueryAlertProvider>
          </ThemeProviderWrapper>
        </StyledComponentsRegistry>
        
        <div id="portal-root" />
      </body>
    </html>
  );
}


