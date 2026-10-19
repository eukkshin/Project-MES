"use client";

import type { ReactNode } from "react";
import * as S from "@/assets/css/auth/Login.styles";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <S.Container>
      <S.BrandPanel>
        <S.BrandLogo>
          <S.LogoIcon>
            <i className="fa-solid fa-layer-group" />
          </S.LogoIcon>
          SMART MES
        </S.BrandLogo>

        <S.BrandContent>
          <S.BrandBadge>
            <i className="fa-solid fa-circle" />
            SMART MANUFACTURING PLATFORM
          </S.BrandBadge>

          <S.BrandTitle>
            제조 운영의
            <br />
            <span>새로운 기준.</span>
          </S.BrandTitle>

          <S.BrandDescription>
            생산부터 자재, 품질, 설비까지.
            <br />
            제조 현장의 모든 데이터를 하나의 플랫폼에서
            <br />
            효율적으로 관리하세요.
          </S.BrandDescription>

          <S.FeatureList>
            <S.FeatureCard>
              <i className="fa-solid fa-chart-line" />
              실시간 생산 현황
            </S.FeatureCard>

            <S.FeatureCard>
              <i className="fa-solid fa-boxes-stacked" />
              통합 자재 관리
            </S.FeatureCard>

            <S.FeatureCard>
              <i className="fa-solid fa-shield-halved" />
              체계적인 품질 관리
            </S.FeatureCard>
          </S.FeatureList>
        </S.BrandContent>

        <S.BrandFooter>
          © {new Date().getFullYear()} SMART MES. All rights reserved.
        </S.BrandFooter>
      </S.BrandPanel>

      <S.FormPanel>
        <S.FormContent>
          <S.MobileLogo>
            <S.LogoIcon>
              <i className="fa-solid fa-layer-group" />
            </S.LogoIcon>
            SMART MES
          </S.MobileLogo>

          {children}
        </S.FormContent>
      </S.FormPanel>
    </S.Container>
  );
}
