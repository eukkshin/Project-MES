"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaUser,
} from "react-icons/fa6";

import * as S from "@/assets/css/admin/mypage/MyPage.styles";

interface UserInfo {
  name: string;
  email: string;
  tel: string;
  companyName: string;
  position: string;
}

interface ProfileUser {
  firstName?: string;
  lastName?: string;
  email: string;
  tel?: string;
  companyName?: string;
  position?: string;
}

interface ProfileResponse {
  success: boolean;
  user: ProfileUser;
  message?: string;
}

export default function DefaultInfo() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setUser(null);
          return;
        }

        const response = await axios.get<ProfileResponse>(
          "http://localhost:4000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.data.success || !response.data.user) {
          throw new Error("사용자 정보 조회에 실패했습니다.");
        }

        const data = response.data.user;

        setUser({
          name:
            `${data.lastName ?? ""}${data.firstName ?? ""}`.trim() ||
            "이름 없음",
          email: data.email ?? "",
          tel: data.tel ?? "",
          companyName: data.companyName ?? "",
          position: data.position ?? "",
        });
      } catch (error) {
        console.error("사용자 정보 조회 실패:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>사용자 정보를 불러오는 중...</div>;
  }

  if (!user) {
    return <div>사용자 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <S.DeContainer>
      {/* 프로필 */}
      <S.DeProfileCard>
        <S.DeProfileImage>
          <FaUser />
        </S.DeProfileImage>

        <S.DeProfileText>
          <S.DeUserName>{user.name}</S.DeUserName>

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
