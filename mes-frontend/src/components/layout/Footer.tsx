"use client";
import Link from "next/link";
import * as S from "@/assets/css/components/HeaderFooter.style";

export const Footer = () => {
  return (
    <S.FooterContainer>
      <S.FooterInfo>
        <strong>Smart MES System</strong> v1.2.0
        <br />© {new Date().getFullYear()} RH.
      </S.FooterInfo>

      <S.FooterLinks>
        <Link href="/support">기술지원</Link>
        <Link href="/terms">이용약관</Link>
        <Link href="/manual">사용자 매뉴얼</Link>
      </S.FooterLinks>
    </S.FooterContainer>
  );
};
