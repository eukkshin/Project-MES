"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBuilding,
  FaCheck,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaIdBadge,
  FaIndustry,
  FaLocationDot,
  FaLock,
  FaPhone,
  FaUser,
} from "react-icons/fa6";

import * as S from "@/assets/css/auth/Register.styles";
import AlertModal from "@/components/modal/AlertModal";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  companyName: string;
  position: string;
  tel: string;
  address: string;
  detailAddress: string;
  gender: string;
}

interface DaumAddressData {
  roadAddress: string;
  jibunAddress: string;
}

interface DaumPostcode {
  open: () => void;
}

interface DaumWindow {
  daum?: {
    Postcode: new (options: {
      oncomplete: (data: DaumAddressData) => void;
    }) => DaumPostcode;
  };
}

type AlertType = "success" | "error" | "info";

interface AlertState {
  isOpen: boolean;
  message: string;
  type: AlertType;
  redirectOnClose: boolean;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  repeatPassword: "",
  companyName: "",
  position: "",
  tel: "",
  address: "",
  detailAddress: "",
  gender: "",
};

const steps = [
  { number: 1, label: "기본 정보" },
  { number: 2, label: "계정 보안" },
  { number: 3, label: "회사 정보" },
];

export default function MemberClientPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialForm);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [alertState, setAlertState] = useState<AlertState>({
    isOpen: false,
    message: "",
    type: "info",
    redirectOnClose: false,
  });

  const showAlert = (
    message: string,
    type: AlertType = "info",
    redirectOnClose = false,
  ) => {
    setAlertState({
      isOpen: true,
      message,
      type,
      redirectOnClose,
    });
  };

  const handleAlertClose = () => {
    const shouldRedirect = alertState.redirectOnClose;

    setAlertState((prev) => ({
      ...prev,
      isOpen: false,
      redirectOnClose: false,
    }));

    if (shouldRedirect) {
      router.push("/");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    if (currentStep === 1) {
      const { firstName, lastName, email, tel, gender } = formData;

      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !email.trim() ||
        !tel.trim() ||
        !gender
      ) {
        showAlert("기본 정보를 모두 입력해주세요.", "error");
        return false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        showAlert("올바른 이메일 주소를 입력해주세요.", "error");
        return false;
      }
    }

    if (currentStep === 2) {
      const { password, repeatPassword } = formData;

      if (!password || !repeatPassword) {
        showAlert("비밀번호를 모두 입력해주세요.", "error");
        return false;
      }

      if (password !== repeatPassword) {
        showAlert("비밀번호가 일치하지 않습니다.", "error");
        return false;
      }
    }

    if (currentStep === 3) {
      const { companyName, position, address, detailAddress } = formData;

      if (
        !companyName.trim() ||
        !position.trim() ||
        !address.trim() ||
        !detailAddress.trim()
      ) {
        showAlert("회사 정보를 모두 입력해주세요.", "error");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (alertState.isOpen || isSubmitting) return;

    if (!validateStep(step)) return;

    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (alertState.isOpen || isSubmitting) return;

    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleAddressSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const daum = (window as Window & DaumWindow).daum;

    if (!daum) {
      showAlert(
        "주소 검색 스크립트가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.",
        "error",
      );
      return;
    }

    new daum.Postcode({
      oncomplete: (data) => {
        const fullAddress = data.roadAddress || data.jibunAddress;

        setFormData((prev) => ({
          ...prev,
          address: fullAddress,
        }));
      },
    }).open();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting || alertState.isOpen) return;

    if (step < 3) {
      handleNext();
      return;
    }

    if (!validateStep(1)) {
      setStep(1);
      return;
    }

    if (!validateStep(2)) {
      setStep(2);
      return;
    }

    if (!validateStep(3)) {
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        formData,
      );

      if (response.data.success) {
        showAlert(
          "회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.",
          "success",
          true,
        );
      } else {
        showAlert(response.data.message || "회원가입에 실패했습니다.", "error");
      }
    } catch (error: unknown) {
      let errorMessage = "회원가입 중 오류가 발생했습니다.";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }

      showAlert(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.Container>
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />

      <S.Header>
        <S.BrandLogo as={Link} href="/">
          <S.LogoIcon>
            <FaIndustry />
          </S.LogoIcon>
          SMART MES
        </S.BrandLogo>

        <S.HeaderLink as={Link} href="/">
          이미 계정이 있으신가요?
          <span>로그인</span>
        </S.HeaderLink>
      </S.Header>

      <S.Content>
        <S.Intro>
          <S.Eyebrow>GET STARTED</S.Eyebrow>
          <S.Title>Smart MES 시작하기</S.Title>
          <S.Description>
            더 스마트한 제조 환경을 위한 첫걸음.
            <br />
            계정 및 회사 정보를 등록해주세요.
          </S.Description>
        </S.Intro>

        <S.Stepper>
          {steps.map((item) => (
            <S.StepItem
              key={item.number}
              $active={step === item.number}
              $completed={step > item.number}
            >
              <S.StepLabel $active={step === item.number}>
                {step > item.number ? (
                  <FaCheck />
                ) : (
                  <S.StepNumber $active={step === item.number}>
                    {String(item.number).padStart(2, "0")}
                  </S.StepNumber>
                )}
                {item.label}
              </S.StepLabel>
            </S.StepItem>
          ))}
        </S.Stepper>

        <S.Card>
          <S.CardHeader>
            <div>
              <S.CardTitle>
                {step === 1 && "기본 정보"}
                {step === 2 && "계정 보안"}
                {step === 3 && "회사 정보"}
              </S.CardTitle>

              <S.CardDescription>
                {step === 1 && "서비스 이용을 위한 기본 정보를 입력해주세요."}
                {step === 2 &&
                  "안전한 계정 사용을 위해 비밀번호를 설정해주세요."}
                {step === 3 &&
                  "MES에서 사용할 회사 및 근무 정보를 입력해주세요."}
              </S.CardDescription>
            </div>

            <S.StepCount>{step} / 3</S.StepCount>
          </S.CardHeader>

          <S.Form onSubmit={handleSubmit} noValidate>
            {step === 1 && (
              <S.FormGrid>
                <S.Field>
                  <S.FieldLabel htmlFor="lastName">성</S.FieldLabel>

                  <S.InputWrapper>
                    <FaUser />
                    <S.Input
                      id="lastName"
                      name="lastName"
                      placeholder="성 입력"
                      value={formData.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                    />
                  </S.InputWrapper>
                </S.Field>

                <S.Field>
                  <S.FieldLabel htmlFor="firstName">이름</S.FieldLabel>

                  <S.InputWrapper>
                    <FaUser />
                    <S.Input
                      id="firstName"
                      name="firstName"
                      placeholder="이름 입력"
                      value={formData.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                    />
                  </S.InputWrapper>
                </S.Field>

                <S.Field $full>
                  <S.FieldLabel htmlFor="email">이메일</S.FieldLabel>

                  <S.InputWrapper>
                    <FaEnvelope />
                    <S.Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="example@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </S.InputWrapper>
                </S.Field>

                <S.Field $full>
                  <S.FieldLabel htmlFor="tel">전화번호</S.FieldLabel>

                  <S.InputWrapper>
                    <FaPhone />
                    <S.Input
                      id="tel"
                      type="tel"
                      name="tel"
                      placeholder="010-1234-5678"
                      value={formData.tel}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                  </S.InputWrapper>
                </S.Field>

                <S.Field $full>
                  <S.FieldLabel>성별</S.FieldLabel>

                  <S.RadioGroup>
                    {[
                      { value: "male", label: "남성" },
                      { value: "female", label: "여성" },
                      { value: "other", label: "기타" },
                    ].map((item) => (
                      <S.RadioLabel key={item.value}>
                        <input
                          type="radio"
                          name="gender"
                          value={item.value}
                          checked={formData.gender === item.value}
                          onChange={handleChange}
                        />
                        {item.label}
                      </S.RadioLabel>
                    ))}
                  </S.RadioGroup>
                </S.Field>
              </S.FormGrid>
            )}

            {step === 2 && (
              <S.FormGrid>
                <S.Field $full>
                  <S.FieldLabel htmlFor="password">비밀번호</S.FieldLabel>

                  <S.InputWrapper>
                    <FaLock />
                    <S.Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="비밀번호를 입력해주세요"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />

                    <S.PasswordToggle
                      type="button"
                      aria-label={
                        showPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                      }
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </S.PasswordToggle>
                  </S.InputWrapper>

                  <S.HelperText>안전한 비밀번호를 설정해주세요.</S.HelperText>
                </S.Field>

                <S.Field $full>
                  <S.FieldLabel htmlFor="repeatPassword">
                    비밀번호 확인
                  </S.FieldLabel>

                  <S.InputWrapper>
                    <FaLock />
                    <S.Input
                      id="repeatPassword"
                      type={showRepeatPassword ? "text" : "password"}
                      name="repeatPassword"
                      placeholder="비밀번호를 다시 입력해주세요"
                      value={formData.repeatPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />

                    <S.PasswordToggle
                      type="button"
                      aria-label={
                        showRepeatPassword
                          ? "비밀번호 확인 숨기기"
                          : "비밀번호 확인 보기"
                      }
                      onClick={() => setShowRepeatPassword((prev) => !prev)}
                    >
                      {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
                    </S.PasswordToggle>
                  </S.InputWrapper>
                </S.Field>
              </S.FormGrid>
            )}

            {step === 3 && (
              <S.FormGrid>
                <S.Field>
                  <S.FieldLabel htmlFor="companyName">회사명</S.FieldLabel>

                  <S.InputWrapper>
                    <FaBuilding />
                    <S.Input
                      id="companyName"
                      name="companyName"
                      placeholder="회사명 입력"
                      value={formData.companyName}
                      onChange={handleChange}
                      autoComplete="organization"
                    />
                  </S.InputWrapper>
                </S.Field>

                <S.Field>
                  <S.FieldLabel htmlFor="position">직급</S.FieldLabel>

                  <S.InputWrapper>
                    <FaIdBadge />
                    <S.Input
                      id="position"
                      name="position"
                      placeholder="직급 입력"
                      value={formData.position}
                      onChange={handleChange}
                      autoComplete="organization-title"
                    />
                  </S.InputWrapper>
                </S.Field>

                <S.Field $full>
                  <S.FieldLabel htmlFor="address">주소</S.FieldLabel>

                  <S.AddressRow>
                    <S.InputWrapper>
                      <FaLocationDot />
                      <S.Input
                        id="address"
                        name="address"
                        placeholder="주소 검색을 이용해주세요"
                        value={formData.address}
                        readOnly
                      />
                    </S.InputWrapper>

                    <S.AddressButton
                      type="button"
                      onClick={handleAddressSearch}
                    >
                      주소 검색
                    </S.AddressButton>
                  </S.AddressRow>
                </S.Field>

                <S.Field $full>
                  <S.FieldLabel htmlFor="detailAddress">상세주소</S.FieldLabel>

                  <S.InputWrapper>
                    <FaLocationDot />
                    <S.Input
                      id="detailAddress"
                      name="detailAddress"
                      placeholder="상세주소 입력"
                      value={formData.detailAddress}
                      onChange={handleChange}
                      autoComplete="address-line2"
                    />
                  </S.InputWrapper>
                </S.Field>
              </S.FormGrid>
            )}

            <S.Divider />

            <S.ButtonRow>
              {step > 1 ? (
                <S.BackButton
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  <FaArrowLeft />
                  이전
                </S.BackButton>
              ) : (
                <div />
              )}

              <S.SubmitButton
                type="submit"
                disabled={isSubmitting || alertState.isOpen}
              >
                {isSubmitting
                  ? "처리 중..."
                  : step === 3
                    ? "회원가입 완료"
                    : "다음 단계"}

                {!isSubmitting && (step === 3 ? <FaCheck /> : <FaArrowRight />)}
              </S.SubmitButton>
            </S.ButtonRow>
          </S.Form>
        </S.Card>

        <S.BottomText>
          이미 계정이 있으신가요?
          <Link href="/">로그인</Link>
        </S.BottomText>

        <S.Footer>© 2026 Smart MES. All rights reserved.</S.Footer>
      </S.Content>

      <AlertModal
        isOpen={alertState.isOpen}
        message={alertState.message}
        type={alertState.type}
        onClose={handleAlertClose}
      />
    </S.Container>
  );
}
