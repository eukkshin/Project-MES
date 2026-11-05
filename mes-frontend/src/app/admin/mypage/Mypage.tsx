"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import * as S from "@/assets/css/admin/mypage/MyPage.styles";

import ChangePassword from "./change-password/ChangePassword";
import DefaultInfo from "./default-info/DefaultInfo";
import { useAlertStore } from "@/store/useAlertStore";
import { useAuthStore } from "@/store/useAuthStore";

interface MyPageProps {
  onClose: () => void;
}

export default function MyPage({ onClose }: MyPageProps) {
  const router = useRouter();
  const showAlert =useAlertStore(state=> state.showAlert);
  const logout = useAuthStore(state=> state.logout);
  const [activeMenu, setActiveMenu] = useState("기본정보");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

//   useEffect(() => {
//   const scrollbarWidth =
//     window.innerWidth - document.documentElement.clientWidth;

//   document.body.style.overflow = "hidden";
//   document.body.style.paddingRight = `${scrollbarWidth}px`;

//   return () => {
//     document.body.style.overflow = "";
//     document.body.style.paddingRight = "";
//   };
// }, []);

 
  const openLogoutModal = () => {
    showAlert(
      "정말 로그아웃하시겠습니까?",
      'info',
      '로그아웃확인',
      ()=> handleLogout(),
    )
  };

  const handleLogout = () => {
    logout();
    onClose();
    router.replace("/");
  };

  return (
    <>
      <S.Backdrop 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:0.2}}
        onClick={onClose}>
        <S.MyPageContainer
          initial={{scale:0.96, opacity:0}}
          animate={{scale:1, opacity:1}}
          exit={{scale:0.96, opacity:0}}
          transition={{ duration: 0.2,  ease: [0.22, 1, 0.36, 1]}}
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

            <S.CloseButton onClick={onClose}>+</S.CloseButton>
          </S.MainContent>
        </S.MyPageContainer>
      </S.Backdrop>
    </>
  );
}
