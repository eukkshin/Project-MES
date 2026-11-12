"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaBars,
  FaChevronRight,
  FaIndustry,
  FaRightFromBracket,
  FaUser,
  FaXmark,
} from "react-icons/fa6";

import MyPage from "@/app/(protected)/admin/mypage/Mypage";
import * as S from "@/assets/css/components/HeaderFooter.style";
import { useAlertStore } from "@/store/useAlertStore";
import { useAuthStore } from "@/store/useAuthStore";
import { AnimatePresence } from "motion/react";

const menuGroups = [
  {
    title: "WORKSPACE",
    items: [{ label: "대시보드", href: "/admin" }],
  },
  {
    title: "MES 업무",
    items: [
      { label: "라인공정제어", href: "/admin/process" },
      { label: "핵심부품 SCM", href: "/admin/components" },
      { label: "비전품질검사", href: "/admin/quality" },
      { label: "클린룸 & 설비", href: "/admin/cleanroom" },
      { label: "실시간 통합관제", href: "/admin/analytics" },
    ],
  },
  {
    title: "시스템 관리",
    items: [
      { label: "기준정보관리", href: "/master-data" },
      { label: "인사관리", href: "/admin/hr" },
      { label: "사내주소록", href: "/admin/employee" },
      { label: "시스템환경설정", href: "/settings" },
    ],
  },
];

const pageTitles: Record<string, string> = {
  "/admin": "대시보드",
  "/admin/process": "라인공정제어",
  "/admin/components": "핵심부품 SCM",
  "/admin/quality": "비전품질검사",
  "/admin/cleanroom": "클린룸 & 설비",
  "/admin/analytics": "실시간 통합관제",
  "/master-data": "기준정보관리",
  "/admin/hr": "인사관리",
  "/admin/employee": "사내주소록",
  "/settings": "시스템환경설정",
};

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const showAlert = useAlertStore(state=>state.showAlert);

  const username = useAuthStore(state=> state.username);
  const logout = useAuthStore(state=>state.logout);
  const isInitialized = useAuthStore(state=>state.isInitialized);
  const isAuth = useAuthStore(state=> state.isAuth);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);

  const currentPage =
    pageTitles[pathname] ||
    Object.entries(pageTitles)
      .filter(([path]) => path !== "/admin")
      .find(([path]) => pathname.startsWith(`${path}/`))?.[1] ||
    "관리자";

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
      logout();
      setIsMobileMenuOpen(false);
      router.replace("/");
  };

  const openLogoutConfirm = ()=>{
    showAlert(
      "정말 로그아웃하시겠습니까?",
      "info",
      "로그아웃 확인",
      () => handleLogout()
    )
  }
  
  return (
    <>
      <S.HeaderContainer>
        <S.HeaderLeft>
          <S.MobileMenuToggle
            type="button"
            aria-label="메뉴 열기"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <FaBars />
          </S.MobileMenuToggle>

          <S.Breadcrumb>
            <span>Workspace</span>
            <FaChevronRight />
            <strong>{currentPage}</strong>
          </S.Breadcrumb>
        </S.HeaderLeft>

        <S.UserSection>
          <S.UserAvatar>
            <FaUser />
          </S.UserAvatar>

          <S.UserInfoButton type="button" onClick={() => setIsMyPageOpen(true)}>
            <strong>{ !isInitialized ? "불러오는중..." : username || "사용자"}</strong>
            <span>내 정보 관리</span>
          </S.UserInfoButton>

          <S.HeaderDivider />

          <S.LogoutButton
            type="button"
            onClick={openLogoutConfirm}
            title="로그아웃"
          >
            <FaRightFromBracket />
            <span>로그아웃</span>
          </S.LogoutButton>
        </S.UserSection>
      </S.HeaderContainer>

      {isMobileMenuOpen && (
        <S.MobileOverlay onClick={() => setIsMobileMenuOpen(false)}>
          <S.MobileDrawer onClick={(e) => e.stopPropagation()}>
            <S.MobileDrawerHeader>
              <S.MobileBrand as={Link} href="/admin">
                <FaIndustry />
                Smart MES
              </S.MobileBrand>

              <S.MobileCloseButton
                type="button"
                aria-label="메뉴 닫기"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaXmark />
              </S.MobileCloseButton>
            </S.MobileDrawerHeader>

            <S.MobileDrawerContent>
              {menuGroups.map((group) => (
                <S.MobileMenuSection key={group.title}>
                  <S.MobileSectionTitle>{group.title}</S.MobileSectionTitle>

                  {group.items.map((item) => (
                    <S.MobileMenuLink
                      key={item.href}
                      as={Link}
                      href={item.href}
                      $active={pathname === item.href}
                    >
                      {item.label}
                    </S.MobileMenuLink>
                  ))}
                </S.MobileMenuSection>
              ))}
            </S.MobileDrawerContent>

            <S.MobileDrawerFooter>
              <S.MobileActionButton
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMyPageOpen(true);
                }}
              >
                <FaUser />
                마이페이지
              </S.MobileActionButton>

              <S.MobileActionButton
                type="button"
                $danger
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openLogoutConfirm();
                }}
              >
                <FaRightFromBracket />
                로그아웃
              </S.MobileActionButton>
            </S.MobileDrawerFooter>
          </S.MobileDrawer>
        </S.MobileOverlay>
      )}

      <AnimatePresence>
        {isMyPageOpen && isAuth && isInitialized &&
          <MyPage onClose={() => setIsMyPageOpen(false)} />}
      </AnimatePresence>
    </>
  );
};
