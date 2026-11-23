import { ThemeMode, useThemeMode } from "@/components/provider/ThemeProviderWrapper";
import { FaCheck, FaEye, FaMoon, FaPalette, FaSun } from "react-icons/fa6";
import * as S from '@/assets/css/admin/mypage/ChangeTheme.styles'

interface ThemeOption{
    mode: ThemeMode;
    title: string;
    envLabel: string;
    description: string;
    icon: React.ReactNode;
    swatches: [string, string, string]
}

const THEME_OPTIONS: ThemeOption[] = [
    {
    mode: "light",
    title: "라이트 모드",
    envLabel: "일반 사무실",
    description: "주간 환경 및 일반 오피스 업무에 최적화된 밝고 정돈된 기본 테마입니다.",
    icon: <FaSun />,
    swatches: ["#f4f6f8", "#ffffff", "#004b9c"],
  },
  {
    mode: "dark",
    title: "다크 모드",
    envLabel: "야간 제어실",
    description: "어두운 관제실 환경에서 눈의 피로를 줄이고 차트·알람 시인성을 높입니다.",
    icon: <FaMoon />,
    swatches: ["#0f172a", "#1e293b", "#66a3e0"],
  },
  {
    mode: "high-contrast",
    title: "고대비 모드",
    envLabel: "강한 현장 조명",
    description: "순수 흑백 대비와 명확한 경계선으로 공장 현장 단말기의 가독성을 극대화합니다.",
    icon: <FaEye />,
    swatches: ["#000000", "#121212", "#3385d6"],
  },
]

export const ChangeTheme =()=>{

    const { themeMode, setThemeMode} = useThemeMode();

    const currentOption = 
    THEME_OPTIONS.find((item)=> item.mode === themeMode)  ?? THEME_OPTIONS[0];
    

    return(
       <S.Wrapper>
      <S.Header>
        <S.Title>화면 테마 설정</S.Title>
        <S.Description>
          작업 환경 및 조도에 맞는 색상 테마를 선택하면 즉시 반영되며 브라우저에 자동 저장됩니다.
        </S.Description>
      </S.Header>

      <S.ThemeList role="radiogroup" aria-label="화면 테마 선택">
        {THEME_OPTIONS.map((option) => {
          const isSelected = themeMode === option.mode;

          return (
            <S.ThemeCard
              key={option.mode}
              type="button"
              role="radio"
              aria-checked={isSelected}
              $isSelected={isSelected}
              onClick={() => setThemeMode(option.mode)}
            >
              <S.LeftGroup>
                <S.IconBadge $isSelected={isSelected}>{option.icon}</S.IconBadge>

                <S.TextBox>
                  <S.CardTitleRow>
                    <strong>{option.title}</strong>
                    <S.EnvTag>{option.envLabel}</S.EnvTag>
                  </S.CardTitleRow>
                  <S.CardDesc>{option.description}</S.CardDesc>
                </S.TextBox>
              </S.LeftGroup>

              <S.RightGroup>
                <S.SwatchGroup aria-hidden="true">
                  {option.swatches.map((hex, idx) => (
                    <S.ColorDot key={idx} $bg={hex} />
                  ))}
                </S.SwatchGroup>

                <S.CheckCircle $isSelected={isSelected}>
                  {isSelected && <FaCheck />}
                </S.CheckCircle>
              </S.RightGroup>
            </S.ThemeCard>
          );
        })}
      </S.ThemeList>

      <S.InfoBox>
        <S.ThemeInfoLabel>
          <FaPalette size={14}/>
          현재 적용된 테마: {" "}
           <strong>{currentOption.title} ({currentOption.envLabel})</strong>
        </S.ThemeInfoLabel>
        <span>자동 저장됨</span>
      </S.InfoBox>
    </S.Wrapper>
  );
}