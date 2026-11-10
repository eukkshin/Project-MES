"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import * as S from "@/assets/css/auth/Login.styles";
import AuthLayout from "@/components/auth/AuthLayout";

import type { ChangeEvent, FormEvent } from "react";
import { useAlertStore } from "@/store/useAlertStore";
import { useLoginMember } from "@/hooks/useLoginMember";
import { useAuthStore } from "@/store/useAuthStore";
import EqualizerLoader from "@/ui/feedback/EqualizerLoading";

export default function LoginClientPage() {
  const router = useRouter();
  const showAlert = useAlertStore((state)=>state.showAlert);
  const isInitialized = useAuthStore(state=>state.isInitialized);
  const isAuth = useAuthStore(state=>state.isAuth);
  const role = useAuthStore(state=>state.role);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(false);

 
  const { mutate, isPending: isLoading } = useLoginMember();

  useEffect(()=>{
    if(!isInitialized || !isAuth) return;
    if(role === 'ADMIN'){
      router.replace('/admin')
      return;
    }
    router.replace('/admin'); //추후에 수정!
  },[isInitialized, isAuth, role, router])

 
  useEffect(()=>{
    const savedEmail = localStorage.getItem('savedEmail');

    if(savedEmail){
      setFormData(prev=> ({
        ...prev,
        email: savedEmail
      }))
      setRememberEmail(true);
    }
  } ,[])

   if (!isInitialized || isAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <EqualizerLoader message="페이지 이동 중입니다..." />
      </div>
    );
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      showAlert("이메일과 비밀번호를 입력해주세요.", "error");
      return;
    }
   
    mutate(
      { email, password },
      {
        onSuccess: (data)=>{
          if(!data.success || !data.token) return;

          if(rememberEmail){
            localStorage.setItem('savedEmail', email);
          }else{
            localStorage.removeItem('savedEmail');
          }

          //로그인후 경로이동
          const redirectPath = sessionStorage.getItem('postLoginRedirect');
          sessionStorage.removeItem('postLoginRedirect');

          const destination =
            redirectPath?.startsWith('/') &&
            !redirectPath?.startsWith('//')
              ? redirectPath
              : '/admin';
          showAlert(
            "로그인이 완료되었습니다.", "success", undefined,
            ()=> router.replace(destination)
          );
        },
      }
    )
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
              <input type="checkbox" 
              checked={rememberEmail}
              onChange={(e)=> setRememberEmail(e.target.checked)}
              />
                아이디 저장
            </S.RememberLabel>
            
            <S.ForgotPasswordLink
              href="/forgot">비밀번호를 잊으셨나요?
            </S.ForgotPasswordLink>
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
          <Link href="/auth/member">회원가입</Link>
        </S.BottomText>

        <S.BottomFooter>© SMART MES · Secure Enterprise Access</S.BottomFooter>
      </AuthLayout>

    </>
  );
}
