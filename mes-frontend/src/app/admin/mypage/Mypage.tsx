"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import * as S from "@/assets/css/admin/mypage/MyPage.styles";
import AlertModal from "@/ui/modal/AlertModal";

import ChangePassword from "./change-password/ChangePassword";
import DefaultInfo from "./default-info/DefaultInfo";

interface MyPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyPage({ isOpen, onClose }: MyPageProps) {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState("기본정보");
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // 실제 DOM을 유지하기 위한 상태
  const [shouldRender, setShouldRender] = useState(false);

  // 닫히는 애니메이션 상태
  const [isClosing, setIsClosing] = useState(false);

  /**
   * MyPage 열기 / 닫기
   */
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);

      const token = localStorage.getItem("token");

      document.body.style.overflow = "hidden";

      if (!token) {
        alert("로그인이 필요합니다.");

        setShouldRender(false);
        onClose();
        router.push("/login");
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, router, onClose]);

  /**
   * MyPage 닫기
   */
  const handleClose = () => {
    // 이미 닫히는 중이면 중복 실행 방지
    if (isClosing) return;

    setIsClosing(true);

    // FadeOut 애니메이션이 끝난 후 실제로 제거
    setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, 200);
  };

  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    delete axios.defaults.headers.common["Authorization"];

    window.dispatchEvent(new Event("logout-success"));

    setLogoutModalOpen(false);

    handleClose();

    router.replace("/");
  };

  if (!shouldRender) return null;

  return (
    <>
      <S.Backdrop $isClosing={isClosing} onClick={handleClose}>
        <S.MyPageContainer
          $isClosing={isClosing}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 사이드바 */}
          <S.MyPageSidebar>
            <S.SidebarMainTitle>마이페이지</S.SidebarMainTitle>

            <S.SidebarSection>
              <S.SidebarTitle>사용자 정보</S.SidebarTitle>

              <S.SidebarMenu>
                <S.SidebarItem
                  $isActive={activeMenu === "기본정보"}
                  onClick={() => setActiveMenu("기본정보")}
                >
                  기본정보
                </S.SidebarItem>

                <S.SidebarItem
                  $isActive={activeMenu === "비밀번호 변경"}
                  onClick={() => setActiveMenu("비밀번호 변경")}
                >
                  비밀번호 변경
                </S.SidebarItem>
              </S.SidebarMenu>
            </S.SidebarSection>

            <S.SidebarDivider />

            <S.SidebarSection>
              <S.SidebarTitle>계정 설정</S.SidebarTitle>

              <S.SidebarMenu>
                <S.SidebarItem
                  $isActive={activeMenu === "계정 정보 변경"}
                  onClick={() => setActiveMenu("계정 정보 변경")}
                >
                  계정 정보 변경
                </S.SidebarItem>

                <S.SidebarItem
                  $isActive={activeMenu === "회원가입 정보 변경"}
                  onClick={() => setActiveMenu("회원가입 정보 변경")}
                >
                  회원가입 정보 변경
                </S.SidebarItem>

                <S.SidebarItem
                  $isActive={false}
                  $isLogout
                  onClick={openLogoutModal}
                >
                  로그아웃
                </S.SidebarItem>
              </S.SidebarMenu>
            </S.SidebarSection>
          </S.MyPageSidebar>

          {/* 메인 콘텐츠 */}
          <S.MainContent>
            <S.MT30 />

            {activeMenu === "기본정보" && <DefaultInfo />}

            {activeMenu === "비밀번호 변경" && <ChangePassword />}

            <S.CloseButton onClick={handleClose}>+</S.CloseButton>
          </S.MainContent>
        </S.MyPageContainer>
      </S.Backdrop>

      {/* 로그아웃 확인 */}
      <AlertModal
        isOpen={logoutModalOpen}
        message="정말 로그아웃하시겠습니까?"
        type="info"
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
