"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  useAuthStore,
  type UserRole,
} from "@/store/useAuthStore";
import EqualizerLoader from "@/ui/feedback/EqualizerLoading";

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
      router.replace("/forbidden");
    }
  }, [isInitialized, isAuth, role, requiredRole, router]);

  //인증 초기화 중
  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <EqualizerLoader message="인증 정보를 확인하고 있습니다"/>
      </div>
    );
  }
   // 인증되지 않았거나 권한이 없는 경우
  if (!hasAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <EqualizerLoader message="페이지 이동 중입니다"/>
      </div>
    );
  }

  return <>{children}</>;
}