
"use client";

import React from "react";

import * as S from "@/assets/css/Layout.style";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SideBar } from "@/components/layout/SideBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout ({ children }: LayoutProps){
  return (
    <S.PageWrapper>
      <S.LnbWrapper>
        <SideBar />
      </S.LnbWrapper>

      <S.Workspace>
        <S.TopArea>
          <Header />
        </S.TopArea>

        <S.ContentArea>{children}</S.ContentArea>

        <Footer />
      </S.Workspace>
    </S.PageWrapper>
  );
};
