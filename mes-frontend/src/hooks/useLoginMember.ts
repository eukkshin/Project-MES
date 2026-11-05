"use client";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { loginMember } from "@/api/auth.http";
import { useAuthStore } from "@/store/useAuthStore";
import { useAlertStore } from "@/store/useAlertStore";

export const useLoginMember = () => {
    
  const login = useAuthStore((state) => state.login);
  const { showAlert } = useAlertStore();

  return useMutation({
    mutationFn: loginMember,

    onSuccess: (data) => {
      if (!data.success) {
        showAlert(data.message || "로그인에 실패했습니다.", "error");
        return;
      }

      const token = data.token;

      if (!token) {
        showAlert("인증 토큰을 받지 못했습니다.", "error");
        return;
      }

      login(token, data.user.name);
    },

    onError: (error) => {
      let message = "서버 오류가 발생했습니다.";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.message ||
          "이메일 또는 비밀번호를 확인해주세요.";
      }

      showAlert(message, "error");
    },
  });
};