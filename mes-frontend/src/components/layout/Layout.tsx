"use client";

import React from "react";

import * as S from "@/assets/css/Layout.style";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { SideBar } from "./SideBar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
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
