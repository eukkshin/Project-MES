"use client";

import { useEffect } from "react";
import { FaTriangleExclamation, FaRotateRight, FaHouse } from "react-icons/fa6";
import Link from "next/link";
import * as S from "@/assets/css/error/nextError";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[Page Error]", error);
  }, [error]);

  return (
    <S.ErrorContainer>
      <S.ErrorCard>
        <S.ErrorIcon>
          <FaTriangleExclamation />
        </S.ErrorIcon>

        {/* <S.ErrorCode></S.ErrorCode> */}

        <S.ErrorTitle>
          페이지를 불러오지 못했습니다.
        </S.ErrorTitle>

        <S.ErrorDescription>
          일시적인 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해 주세요.
        </S.ErrorDescription>

        {error.digest && (
          <S.ErrorDigest>
            ERROR CODE : {error.digest}
          </S.ErrorDigest>
        )}

        <S.ButtonGroup>
          <S.RetryButton type="button" onClick={() => reset()}>
            <FaRotateRight />
            다시 시도
          </S.RetryButton>

          <S.HomeButton
            type="button"
            as={Link}
            href='/admin'
          >
            <FaHouse />
            홈으로 이동
          </S.HomeButton>
        </S.ButtonGroup>
      </S.ErrorCard>
    </S.ErrorContainer>
  );
}
