import styled, { keyframes, css } from 'styled-components';
export {
  PageContainer,
  PageHeading,
  Eyebrow,
  PageHeader,
  PageDescription,
  RefreshButton,
  ContentGrid,
  Panel,
  PanelHeader,
  PanelHeading,
  PanelIcon,
  PanelTitle,
  PanelDescription,
  Form,
  FormGroup,
  Label,
  Required,
  InputWrapper,
  Input,
  NumberGrid,
  FormFooter,
  FormHint,
  SubmitButton,
  ItemCount,
  ListToolbar,
  SearchWrapper,
  SearchInput,
  EmptyState,
  RetryButton,
  FilterSelect,
} from "./Admin.styles";

const pulseRing = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 199, 89, 0.6); }
  70% { transform: scale(1); box-shadow: 0 0 0 7px rgba(52, 199, 89, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 199, 89, 0); }
`;
const dangerGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.35);
    border-color: rgba(255, 59, 48, 0.6);
  }
  50% {
    box-shadow: 0 0 18px 2px rgba(255, 59, 48, 0.18);
    border-color: rgba(255, 59, 48, 0.95);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.35);
    border-color: rgba(255, 59, 48, 0.6);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 28px;
  max-width: 1640px;
  margin: 0 auto;
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PageDashTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 27px;
  font-weight: 800;
  letter-spacing: -0.8px;
`; 


export const MainTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 12px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.status.success.bg};
  color: ${({ theme }) => theme.colors.status.success.text};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.status.success.text};
    animation: ${pulseRing} 2s infinite;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SummaryGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1360px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.article`
 flex: 1;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;
  padding: 20px;
  background: ${({ theme }) => theme.colors.bg.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 20px;
  box-shadow: ${({ theme }) =>
    theme.mode === 'light'
      ? '0 2px 6px rgba(15, 23, 42, 0.03), 0 12px 28px rgba(15, 23, 42, 0.04)'
      : theme.shadows.subtle};
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) =>
      theme.mode === 'light' ? 'rgba(0, 113, 227, 0.28)' : 'rgba(102, 163, 224, 0.35)'};
    box-shadow: ${({ theme }) =>
      theme.mode === 'light'
        ? '0 8px 24px rgba(15, 23, 42, 0.06), 0 2px 6px rgba(0, 113, 227, 0.04)'
        : '0 8px 24px rgba(0, 0, 0, 0.45)'};
  }
`;

export const CardTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const SummaryIcon = styled.div<{
  $variant: 'blue' | 'green' | 'orange' | 'indigo';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 13px;
  font-size: 18px;
  background: ${({ theme, $variant }) => {
    if (theme.mode !== 'light') {
      return $variant === 'green'
        ? theme.colors.status.success.bg
        : $variant === 'orange'
          ? theme.colors.status.danger.bg
          : theme.colors.primary.subtle;
    }
    switch ($variant) {
      case 'blue':
        return 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)';
      case 'indigo':
        return 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)';
      case 'green':
        return 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)';
      case 'orange':
        return 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)';
    }
  }};
  color: ${({ theme, $variant }) => {
    if (theme.mode !== 'light') {
      return $variant === 'green'
        ? theme.colors.status.success.text
        : $variant === 'orange'
          ? theme.colors.status.danger.text
          : theme.colors.primary.default;
    }
    switch ($variant) {
      case 'blue':
        return '#0071e3'; 
      case 'indigo':
        return '#5856d6'; 
      case 'green':
        return '#28cd41';
      case 'orange':
        return '#ff3b30';
    }
  }};
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
`;

export const StatusPill = styled.span<{ $tone: 'success' | 'warning' | 'danger' | 'info' }>`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${({ theme, $tone }) => theme.colors.status[$tone].text};
  background-color: ${({ theme, $tone }) => theme.colors.status[$tone].bg};
`;

export const CardBottomRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
`;

export const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;

  span {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 26px;
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.035em;
    font-variant-numeric: tabular-nums;
  }

  small {
    color: ${({ theme }) => theme.colors.text.disabled};
    font-size: 11px;
    font-weight: 500;
  }
`;

/* 차트 2단 메인 그리드 (좌측 2 : 우측 1 비율) */
export const MainChartGrid = styled.section`
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 20px;

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

/* 하단 2단 그리드 (라인별 가동/수율 현황 + 불량 분석) */
export const BottomGrid = styled.section`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 20px;

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartPanel = styled.div`
  background: ${({ theme }) => theme.colors.bg.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 22px;
  padding: 24px;
  box-shadow: ${({ theme }) =>
    theme.mode === 'light'
      ? '0 2px 6px rgba(15, 23, 42, 0.03), 0 12px 28px rgba(15, 23, 42, 0.04)'
      : theme.shadows.subtle};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// export const PanelHeader = styled.div`
//   display: flex;
//   align-items: flex-start;
//   justify-content: space-between;
//   gap: 12px;
// `;

// export const PanelTitle = styled.h2`
//   font-size: 17px;
//   font-weight: 700;
//   letter-spacing: -0.02em;
//   color: ${({ theme }) => theme.colors.text.primary};
// `;

export const PanelSub = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 3px;
`;

export const ChartBox = styled.div`
  width: 100%;
  height: 300px;
`;

export const DonutWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

export const DonutCenterLabel = styled.div`
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;

  strong {
    display: block;
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: ${({ theme }) => theme.colors.text.primary};
    font-variant-numeric: tabular-nums;
  }

  span {
    font-size: 11px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const LineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LineRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 16px;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.bg.canvas};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.default};
  }
`;

export const LineRowHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 700;
  }

  span {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-variant-numeric: tabular-nums;
  }
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.border.default};
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $percent: number; $tone: 'success' | 'warning' | 'danger' }>`
  width: ${({ $percent }) => Math.min(Math.max($percent, 0), 100)}%;
  height: 100%;
  border-radius: 999px;
  background-color: ${({ theme, $tone }) => theme.colors.status[$tone].text};
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`;


const statusPulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(40, 205, 65, 0.5); }
  70% { box-shadow: 0 0 0 6px rgba(40, 205, 65, 0); }
  100% { box-shadow: 0 0 0 0 rgba(40, 205, 65, 0); }
`;

/* Apple Health / Settings 스타일의 인셋 그룹 컨테이너 */
export const AppleInsetGroup = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.bg.canvas};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 16px;
  overflow: hidden;
`;

export const AppleInsetItem = styled.div<{ $isAlert?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 16px;
  background-color: ${({ theme, $isAlert }) =>
    $isAlert
      ? theme.mode === 'light'
        ? 'rgba(255, 59, 48, 0.03)'
        : 'rgba(255, 69, 58, 0.08)'
      : 'transparent'};
  transition: background-color 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  }

  &:hover {
    background-color: ${({ theme }) =>
      theme.mode === 'light' ? 'rgba(0, 0, 0, 0.025)' : 'rgba(255, 255, 255, 0.04)'};
  }
`;

export const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 0;
  flex: 1;
`;

export const SquircleIconBox = styled.div<{ $tone: 'blue' | 'green' | 'amber' | 'red' | 'gray' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  font-size: 15px;
  background: ${({ theme, $tone }) => {
    if (theme.mode !== 'light') return theme.colors.bg.surface;
    switch ($tone) {
      case 'blue':
        return 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)';
      case 'green':
        return 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)';
      case 'amber':
        return 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)';
      case 'red':
        return 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)';
      default:
        return '#f1f5f9';
    }
  }};
  color: ${({ $tone }) => {
    switch ($tone) {
      case 'blue':
        return '#0071e3';
      case 'green':
        return '#28cd41';
      case 'amber':
        return '#ff9500';
      case 'red':
        return '#ff3b30';
      default:
        return '#8e8e93';
    }
  }};
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
`;

export const ItemMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;

  strong {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.text.primary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.secondary};
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

export const TagChip = styled.span`
  display: inline-block;
  padding: 1px 6px;
  border-radius: 5px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  background-color: ${({ theme }) => theme.colors.bg.surface};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

/* 펄스 도트가 포함된 Apple 스타일 상태 캡슐 */
export const AppleStatusCapsule = styled.div<{ $state: 'RUNNING' | 'MAINTENANCE' | 'STOP' }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 11px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.01em;
  flex-shrink: 0;
  background-color: ${({ theme, $state }) =>
    $state === 'RUNNING'
      ? theme.colors.status.success.bg
      : $state === 'MAINTENANCE'
        ? theme.colors.status.warning.bg
        : theme.colors.status.danger.bg};
  color: ${({ theme, $state }) =>
    $state === 'RUNNING'
      ? theme.colors.status.success.text
      : $state === 'MAINTENANCE'
        ? theme.colors.status.warning.text
        : theme.colors.status.danger.text};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: currentColor;
    animation: ${({ $state }) => ($state === 'RUNNING' ? statusPulse : 'none')} 2s infinite;
  }
`;

/* 우측 알람 패널용 수치 & 미니 재고 게이지 */
export const AlertMetricBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;

  strong {
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  small {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const MiniGaugeTrack = styled.div`
  width: 84px;
  height: 5px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.border.default};
  overflow: hidden;
`;

export const MiniGaugeFill = styled.div<{ $ratio: number; $critical: boolean }>`
  width: ${({ $ratio }) => Math.min(Math.max($ratio, 6), 100)}%;
  height: 100%;
  border-radius: 999px;
  background-color: ${({ $critical }) => ($critical ? '#ff3b30' : '#ff9500')};
  transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
`;

/* 모든 시스템 정상일 때 Apple 감성 클린 카드 */
export const AllClearBanner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;
  padding: 36px 20px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.bg.canvas};
  border: 1px dashed ${({ theme }) => theme.colors.border.default};

  strong {
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

//이상경보 알람

export const CriticalAlertBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 20px;
  border-radius: 16px;
  background: ${({ theme }) =>
    theme.mode === 'light'
      ? 'linear-gradient(135deg, rgba(255, 59, 48, 0.08) 0%, rgba(255, 149, 0, 0.08) 100%)'
      : 'linear-gradient(135deg, rgba(255, 69, 58, 0.18) 0%, rgba(255, 159, 10, 0.14) 100%)'};
  border: 1px solid rgba(255, 59, 48, 0.45);
  animation: ${slideDown} 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const AlertBannerLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  strong {
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.status.danger.text};
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

/* 2. AI 실시간 공정 인사이트 브리핑 바 */
export const AiInsightCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  border-radius: 18px;
  background: ${({ theme }) =>
    theme.mode === 'light'
      ? 'linear-gradient(135deg, #f8faff 0%, #eef4ff 100%)'
      : 'linear-gradient(135deg, rgba(88, 86, 214, 0.14) 0%, rgba(0, 113, 227, 0.12) 100%)'};
  border: 1px solid
    ${({ theme }) =>
      theme.mode === 'light' ? 'rgba(0, 113, 227, 0.2)' : 'rgba(102, 163, 224, 0.28)'};
`;

export const AiBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: #ffffff;
  background: linear-gradient(135deg, #0071e3 0%, #5856d6 100%);
  flex-shrink: 0;
`;

export const AiMessageText = styled.p`
  flex: 1;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.primary};

  strong {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary.default};
  }
`;

/* 3. 위험 임계치 도달 시 KPI 카드 글로우 효과 확장 */
export const DangerPulseOverlay = styled.div<{ $active: boolean }>`
  display: flex;
  align-self: stretch;
  border-radius: 20px;
  min-width: 0;
  ${({ $active }) =>
    $active &&
    css`
      animation: ${dangerGlow} 2.2s infinite ease-in-out;
    `}
`;



