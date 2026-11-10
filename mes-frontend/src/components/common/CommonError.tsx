
import * as S from "@/assets/css/error/nextError";
import Link from "next/link";
import { FaHouse, FaRotateRight, FaTriangleExclamation } from "react-icons/fa6";

interface CommonErrorProps{
    message?: string;
    reset: ()=>void;
}

export default function CommonError({message, reset}:CommonErrorProps){
    return(

    <S.ErrorContainer>
      <S.ErrorCard>
        <S.ErrorIcon>
          <FaTriangleExclamation />
        </S.ErrorIcon>

        <S.ErrorTitle>
          페이지를 불러오지 못했습니다.
        </S.ErrorTitle>

        <S.ErrorDescription>
        {message? message : (
            <>
            일시적인 오류가 발생했습니다.
            <br />
            잠시 후 다시 시도해 주세요.
            </>
        )}
        </S.ErrorDescription>

        <S.ButtonGroup>
          <S.RetryButton type="button" onClick={reset}>
            <FaRotateRight />
            다시 시도
          </S.RetryButton>

          <S.HomeButton
            type="button"
            as={Link}
            href='/admin'
            replace
          >
            <FaHouse />
            홈으로 이동
          </S.HomeButton>
        </S.ButtonGroup>
      </S.ErrorCard>
    </S.ErrorContainer>
    )
}