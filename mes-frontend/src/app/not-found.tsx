"use client";

import Link from "next/link";
import * as S from "@/assets/css/error/nextError";
export default function NotFound() {
  return (
    <S.ErrorContainer>
      <S.ErrorCard>
        <S.ErrorIcon>
        <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <circle cx="12" cy="12" r="9.5" />
        <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2.2-2.5 3.5" />
        <circle cx="12" cy="16.5" r="0.7" fill="currentColor" />
        </svg>
        </S.ErrorIcon>

        <S.ErrorCode>404 NOT FOUND</S.ErrorCode>

        <S.ErrorTitle>요청하신 페이지를 찾을 수 없습니다.</S.ErrorTitle>

        <S.ErrorDescription>
          존재하지 않는 주소를 입력하셨거나,
          <br />
          페이지가 삭제 또는 이동되었을 수 있어요.
        </S.ErrorDescription>

        <S.ErrorDigest>ERROR_CODE: 404_PAGE_NOT_FOUND</S.ErrorDigest>

        <S.ButtonGroup>
          <S.RetryButton onClick={() => window.location.reload()}>
            새로고침
          </S.RetryButton>

          <Link href="/admin" passHref legacyBehavior>
            <S.HomeButton as="a" style={{ textDecoration: "none" }} >
              홈으로 가기
            </S.HomeButton>
          </Link>
        </S.ButtonGroup>
      </S.ErrorCard>
    </S.ErrorContainer>
  );
}