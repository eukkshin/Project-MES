import type { Metadata } from "next";
import * as S from "@/assets/css/admin/Admin.styles";
import Calendar from "@/components/calendar/Calendar";

export const metadata: Metadata = {
  title: "일정관리 | Smart MES",
};

export default function AdminPage() {
  return (
      <S.DashboardContainer>
        <S.DashboardHeader>
          <S.Eyebrow>MES DASHBOARD</S.Eyebrow>
          <S.DashboardTitle>일정관리</S.DashboardTitle>
          <S.DashboardDescription>
            생산 및 운영 일정을 한눈에 확인하고 관리하세요.
          </S.DashboardDescription>
        </S.DashboardHeader>

        <S.CalendarLayout>
          <Calendar />
        </S.CalendarLayout>
      </S.DashboardContainer>
  );
}
