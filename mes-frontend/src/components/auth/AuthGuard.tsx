"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  useAuthStore,
  type UserRole,
} from "@/store/useAuthStore";
import EqualizerLoader from "@/ui/feedback/EqualizerLoading";
import { useAlertStore } from "@/store/useAlertStore";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export default function AuthGuard({
  children,
  requiredRole,
}: AuthGuardProps) {
  const router = useRouter();

  const isAuth = useAuthStore((state) => state.isAuth);
  const isInitialized = useAuthStore(
    (state) => state.isInitialized
  );
  const role = useAuthStore((state) => state.role);
  const showAlert = useAlertStore((state)=> state.showAlert);

  // 접근 가능 여부
  const hasAccess =
    isAuth && (!requiredRole || role === requiredRole);

  useEffect(() => {

    if (!isInitialized) return;

    // 비로그인 상태
    if (!isAuth) {
      router.replace("/");
      return;
    }

    // 로그인은 했지만 권한이 없는 경우
    if (requiredRole && role !== requiredRole) {
      showAlert("해당 메뉴에 대한 접근 권한이 없습니다.", 'error', "권한 부족",
        ()=>{
          router.replace("/admin");
        }
      )
    }
  }, [isInitialized, isAuth, role, requiredRole, router,showAlert]);

  //인증 초기화 중
  if (!isInitialized) {
    return <EqualizerLoader message="인증 정보를 확인하고 있습니다"/>;
  }
   // 인증되지 않았거나 권한이 없는 경우
  if (!hasAccess) {
    return <EqualizerLoader message="페이지 이동 중입니다"/>
  }

  return <>{children}</>;
}