"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaLock } from "react-icons/fa6";

import * as S from "@/assets/css/admin/mypage/ChangePassword.styles";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/api/http";

export default function ChangePassword() {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 새 비밀번호 일치 여부
  const isPasswordMatch =
    newPassword !== "" &&
    confirmPassword !== "" &&
    newPassword === confirmPassword;

  // 새 비밀번호 불일치 여부
  const isPasswordMismatch =
    confirmPassword !== "" && newPassword !== confirmPassword;

  const {mutate, isPending:isSubmitting} =useMutation({
    mutationFn: changePassword,
    onSuccess:()=>{
      alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.");
      router.push("/");
    },
    onError:(error:any)=>{
      console.error("비밀번호 변경 실패:", error);
      alert(error.response?.data || "비밀번호 변경에 실패했습니다.");
    }
  })

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 새 비밀번호 확인
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    // 기존 비밀번호와 새 비밀번호가 같은 경우
    if (oldPassword === newPassword) {
      alert("기존 비밀번호와 다른 비밀번호를 입력해주세요.");
      return;
    }

    mutate({
      oldPassword,
      newPassword,
    })

  }

  return (
    <S.PwContainer>
      <S.PwCard>
        <S.PwHeader>
          <S.PwIcon>
            <FaLock />
          </S.PwIcon>

          <S.PwHeaderText>
            <S.PwTitle>비밀번호 변경</S.PwTitle>

            <S.PwDescription>
              계정의 비밀번호를 변경할 수 있습니다.
            </S.PwDescription>
          </S.PwHeaderText>
        </S.PwHeader>

        <S.PwDivider />

        <S.PwForm onSubmit={handleChangePassword}>
          {/* 기존 비밀번호 */}
          <S.PwField>
            <S.PwLabel htmlFor="oldPassword">기존 비밀번호</S.PwLabel>

            <S.PwInput
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="기존 비밀번호를 입력하세요"
              required
            />
          </S.PwField>

          {/* 새 비밀번호 */}
          <S.PwField>
            <S.PwLabel htmlFor="newPassword">새 비밀번호</S.PwLabel>

            <S.PwInput
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호를 입력하세요"
              required
            />
          </S.PwField>

          {/* 새 비밀번호 확인 */}
          <S.PwField>
            <S.PwLabel htmlFor="confirmPassword">새 비밀번호 확인</S.PwLabel>

            <S.PwInput
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="새 비밀번호를 다시 입력하세요"
              required
            />

            {/* 비밀번호 일치 여부 */}
            {isPasswordMatch && (
              <S.PwValidation $isValid={true}>
                ✓ 새 비밀번호가 일치합니다.
              </S.PwValidation>
            )}

            {isPasswordMismatch && (
              <S.PwValidation $isValid={false}>
                ✕ 새 비밀번호가 일치하지 않습니다.
              </S.PwValidation>
            )}
          </S.PwField>

          {/* 안내 */}
          <S.PwNotice>
            <S.PwNoticeTitle>비밀번호 안내</S.PwNoticeTitle>

            <S.PwNoticeText>
              안전한 비밀번호 사용을 위해 기존 비밀번호와 다른 비밀번호를
              사용해주세요.
            </S.PwNoticeText>
          </S.PwNotice>

          {/* 변경 버튼 */}
          <S.PwButton
            type="submit"
            disabled={
              !oldPassword ||
              !newPassword ||
              !confirmPassword ||
              !isPasswordMatch ||
              isSubmitting
            }
          >
            {isSubmitting? '변경중': "비밀번호 변경하기"}
          </S.PwButton>
        </S.PwForm>
      </S.PwCard>
    </S.PwContainer>
  );
}
