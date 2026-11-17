'use client';

import { useEffect, useState } from "react";
import * as S from "@/assets/css/admin/mypage/MyPage.styles";
import { useGetUserProfile } from "@/hooks/useRegister";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
  FaUserEdit,
} from "react-icons/fa";
import EqualizerLoader from "@/ui/feedback/EqualizerLoading";

interface EditForm {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  companyName: string;
  position: string;
  address: string;
  detailAddress: string;
  gender: string;
}

const initialForm: EditForm = {
  firstName: "",
  lastName: "",
  email: "",
  tel: "",
  companyName: "",
  position: "",
  address: "",
  detailAddress: "",
  gender: "",
};

export function EditInfoPage() {

  const { data: user, isLoading, isError } = useGetUserProfile();

  const [form, setForm] = useState<EditForm>(initialForm);

  useEffect(() => {
    if (!user) return;

    setForm({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      tel: user.tel ?? "",
      companyName: user.companyName ?? "",
      position: user.position ?? "",
      address: user.address ?? "",
      detailAddress: user.detailAddress ?? "",
      gender: user.gender ?? "",
    });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = ()=>{
    //저장
  }

  if (isLoading) return <EqualizerLoader message="사용자 정보를 불러오는 중..."/>
  if (isError || !user) return <div>사용자 정보를 불러오지 못했습니다.</div>;

  return (
    <>
    <S.InfoContainer>
        <S.InfoCard>
            <S.PwHeader>
                <S.PwIcon>
                    <FaUserEdit/>
                </S.PwIcon>
                   <S.PwHeaderText>
                <S.PwTitle>계정정보 변경</S.PwTitle>
                <S.PwDescription>
                  계정 정보를 변경할 수 있습니다.
                </S.PwDescription>
              </S.PwHeaderText>
            </S.PwHeader>
        <S.PwDivider />

        <S.DeEditGrid onSubmit={handleSave}>
            <S.DeEditField>
                <S.DeEditLabel><FaUser /> 성</S.DeEditLabel>
                <S.DeEditInput
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                />
            </S.DeEditField>

            <S.DeEditField>
                <S.DeEditLabel><FaUser /> 이름</S.DeEditLabel>
                <S.DeEditInput
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                />
            </S.DeEditField>

            <S.DeEditField>
                <S.DeEditLabel><FaEnvelope /> 이메일</S.DeEditLabel>
                <S.DeEditInput
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                />
            </S.DeEditField>

            <S.DeEditField>
                <S.DeEditLabel><FaPhone /> 전화번호</S.DeEditLabel>
                <S.DeEditInput
                name="tel"
                value={form.tel}
                onChange={handleChange}
                />
            </S.DeEditField>

            <S.DeEditField $fullWidth>
            <S.DeEditLabel><FaMapMarkerAlt /> 주소</S.DeEditLabel>
            <S.DeEditInput
            name="address"
            value={form.address}
            onChange={handleChange}
            />
            </S.DeEditField>

            <S.DeEditField $fullWidth>
                <S.DeEditLabel><FaMapMarkerAlt /> 상세 주소</S.DeEditLabel>
                <S.DeEditInput
                name="detailAddress"
                value={form.detailAddress}
                onChange={handleChange}
                />
            </S.DeEditField>

        <S.DeEditActions>
                <S.DeSaveButton type="submit">
                    <FaSave />
                    변경사항 저장
                </S.DeSaveButton>
            </S.DeEditActions>
        </S.DeEditGrid>

        </S.InfoCard>
    </S.InfoContainer>
    </>
  );
}