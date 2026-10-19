"use client";

import { usePathname } from "next/navigation";

import * as S from "@/assets/css/LayoutWrapper";

import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hiddenPaths = ["/", "/member", "/find-id", "/forgot"];
  const isHidden = hiddenPaths.includes(pathname);

  return (
    <S.PageWrapper>
      <S.MainContent>{children}</S.MainContent>
    </S.PageWrapper>
  );
}
