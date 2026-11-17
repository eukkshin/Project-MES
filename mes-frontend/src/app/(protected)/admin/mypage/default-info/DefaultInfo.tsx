"use client";
import {
  FaBriefcase,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaUser,
} from "react-icons/fa6";

import * as S from "@/assets/css/admin/mypage/MyPage.styles";
import { useGetUserProfile } from "@/hooks/useRegister";
import EqualizerLoader from "@/ui/feedback/EqualizerLoading";

interface UserInfo {
  name: string;
  email: string;
  tel: string;
  companyName: string;
  position: string;
}


export default function DefaultInfo() {

    const {data:user, isLoading, isError} = useGetUserProfile();
    if (isLoading) {
      return <EqualizerLoader message="사용자 정보를 불러오는 중..."/>
    }
    if (isError || !user) {
      return <div>사용자 정보를 불러올 수 없습니다.</div>;
    }

    const userName =
    `${user?.lastName ?? ""}${user?.firstName ?? ""}`.trim() ||
    "이름 없음";

  return (
    <S.DeContainer>
      {/* 프로필 */}
      <S.DeProfileCard>
        <S.DeProfileImage>
          <FaUser />
        </S.DeProfileImage>

        <S.DeProfileText>
          <S.DeUserName>{userName}</S.DeUserName>

          <S.DeUserRole>
            {user.companyName || "-"} · {user.position || "-"}
          </S.DeUserRole>
        </S.DeProfileText>
      </S.DeProfileCard>

      {/* 계정 정보 */}
      <S.DeSection>
        <S.DeSectionTitle>계정 정보</S.DeSectionTitle>

        <S.DeInfoCard>
          <S.DeInfoItem>
            <S.DeInfoIcon>
              <FaEnvelope />
            </S.DeInfoIcon>

            <S.DeInfoContent>
              <S.DeInfoLabel>이메일</S.DeInfoLabel>
              <S.DeInfoValue>{user.email || "-"}</S.DeInfoValue>
            </S.DeInfoContent>
          </S.DeInfoItem>

          <S.DeInfoItem>
            <S.DeInfoIcon>
              <FaPhone />
            </S.DeInfoIcon>

            <S.DeInfoContent>
              <S.DeInfoLabel>전화번호</S.DeInfoLabel>
              <S.DeInfoValue>{user.tel || "-"}</S.DeInfoValue>
            </S.DeInfoContent>
          </S.DeInfoItem>

          <S.DeInfoItem>
            <S.DeInfoIcon>
              <FaBuilding />
            </S.DeInfoIcon>

            <S.DeInfoContent>
              <S.DeInfoLabel>회사</S.DeInfoLabel>
              <S.DeInfoValue>{user.companyName || "-"}</S.DeInfoValue>
            </S.DeInfoContent>
          </S.DeInfoItem>

          <S.DeInfoItem>
            <S.DeInfoIcon>
              <FaBriefcase />
            </S.DeInfoIcon>

            <S.DeInfoContent>
              <S.DeInfoLabel>직책</S.DeInfoLabel>
              <S.DeInfoValue>{user.position || "-"}</S.DeInfoValue>
            </S.DeInfoContent>
          </S.DeInfoItem>
        </S.DeInfoCard>
      </S.DeSection>
    </S.DeContainer>
  );
}
