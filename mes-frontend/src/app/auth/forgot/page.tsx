import type { Metadata } from "next";
import Link from "next/link";

import * as S from "@/assets/css/auth/Forgot.styles";

export const metadata: Metadata = { title: "비밀번호 찾기" };

export default function ForgotPassword() {
  return (
    <S.Container>
      <S.Card>
        <S.Eyebrow>ACCOUNT RECOVERY</S.Eyebrow>
        <S.Title>비밀번호 찾기</S.Title>
        <S.Description>
          가입한 이메일 주소를 입력해 주세요. 비밀번호 재설정 안내를 받을 수
          있습니다.
        </S.Description>
        {/* 재설정 메일 발송 API 연결 전까지는 제출 기능을 활성화하지 않습니다. */}
        <S.Form>
          <S.FieldLabel htmlFor="forgot-email">이메일</S.FieldLabel>
          <S.Input
            id="forgot-email"
            type="email"
            placeholder="이메일 주소를 입력하세요"
            autoComplete="email"
            required
          />
          <S.SubmitButton type="button" disabled>
            재설정 메일 보내기
          </S.SubmitButton>
        </S.Form>
        <S.BottomText>
          <Link href="/member">회원가입</Link>
          <Link href="/">로그인으로 돌아가기</Link>
        </S.BottomText>
      </S.Card>
    </S.Container>
  );
}
