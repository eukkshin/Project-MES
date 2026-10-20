"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import * as S from "@/assets/css/auth/Login.styles";
import AuthLayout from "@/components/auth/AuthLayout";
import AlertModal from "@/ui/modal/AlertModal";

import type { ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginMember } from "@/api/http";

type AlertType = "success" | "error" | "info";

export default function LoginClientPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertType>("info");
  const [loginSucceeded, setLoginSucceeded] = useState(false);

  const showAlert = (message: string, type: AlertType = "info") => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate, isPending:isLoading }=useMutation({
    mutationFn: loginMember,
    onSuccess:(data)=>{
      if(!data.success){
        showAlert(data.message || "로그인에 실패했습니다.", "error");
        return;
      }
      const token = data.token;
      if (!token) {
        showAlert("인증 토큰을 받지 못했습니다.", "error");
        return;
      } 
      //zustand적용전 추후수정
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // useAuthStore.getState().login(token,data.role) //zustand적용시
      setLoginSucceeded(true);
      showAlert("로그인이 완료되었습니다!", "success");
    },
    onError:(error)=>{
      let message = "서버 오류가 발생했습니다.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || "이메일 또는 비밀번호를 확인해주세요.";
      } else if (error instanceof Error) {
        message = error.message;
      }
      showAlert(message, "error");
    },
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      showAlert("이메일과 비밀번호를 입력해주세요.", "error");
      return;
    }

    mutate({ email, password })

  };

  const handleCloseModal = () => {
    setAlertOpen(false);

    if (loginSucceeded) {
      setLoginSucceeded(false);
      router.push("/admin");
    }
  };

  return (
    <>
      <AuthLayout>
        <S.FormHeader>
          <S.FormEyebrow>WELCOME BACK</S.FormEyebrow>

          <S.FormTitle>다시 오신 것을 환영합니다</S.FormTitle>

          <S.FormDescription>
            계정에 로그인하고 스마트한 업무를 시작하세요.
          </S.FormDescription>
        </S.FormHeader>

        <S.Form onSubmit={handleSubmit}>
          <S.Field>
            <S.FieldLabel htmlFor="email">이메일 주소</S.FieldLabel>

            <S.InputWrapper>
              <i className="fa-regular fa-envelope" />

              <S.Input
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                autoComplete="username"
                value={formData.email}
                onChange={handleChange}
              />
            </S.InputWrapper>
          </S.Field>

          <S.Field>
            <S.FieldLabel htmlFor="password">비밀번호</S.FieldLabel>

            <S.InputWrapper>
              <i className="fa-solid fa-lock" />

              <S.Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />

              <S.PasswordToggle
                type="button"
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <i
                  className={
                    showPassword
                      ? "fa-regular fa-eye-slash"
                      : "fa-regular fa-eye"
                  }
                />
              </S.PasswordToggle>
            </S.InputWrapper>
          </S.Field>

          <S.FormOptions>
            <S.RememberLabel>
              <input type="checkbox" />
              로그인 유지
            </S.RememberLabel>

            <Link href="/forgot">비밀번호를 잊으셨나요?</Link>
          </S.FormOptions>

          <S.SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin" />
                로그인 중...
              </>
            ) : (
              <>
                로그인
                <i className="fa-solid fa-arrow-right" />
              </>
            )}
          </S.SubmitButton>
        </S.Form>

        <S.BottomText>
          아직 계정이 없으신가요?
          <Link href="/member">회원가입</Link>
        </S.BottomText>

        <S.BottomFooter>© SMART MES · Secure Enterprise Access</S.BottomFooter>
      </AuthLayout>

      <AlertModal
        isOpen={alertOpen}
        message={alertMessage}
        type={alertType}
        onClose={handleCloseModal}
      />
    </>
  );
}
