// mes-frontend/src/components/dashboard/AiBriefingSection.tsx
'use client';

import React from 'react';
import {
  FaArrowRotateRight,
  FaCircleCheck,
  FaCircleExclamation,
  FaLightbulb,
  FaShieldHalved,
  FaTriangleExclamation,
  FaWandMagicSparkles,
} from 'react-icons/fa6';
import * as S from '@/assets/css/admin/DashChart.styles';
import { useAiBriefing } from '@/hooks/useAiBriefing';

export default function AiBriefingSection() {
  const { briefing, isLoading, isFetching, isError, error, refetchBriefing } =
    useAiBriefing();

  const handleRefresh = () => {
    void refetchBriefing();
  };

  // 분석 중 로딩 상태
  if (isLoading) {
    return (
      <S.AiSectionWrapper aria-busy="true">
        <S.AiSectionHeader>
          <S.AiHeaderLeft>
            <S.AiBadge>
              <FaWandMagicSparkles /> AI 관제 브리핑
            </S.AiBadge>
            <S.AiStatusBadge $status="HEALTHY">
              <FaArrowRotateRight className="fa-spin" /> 데이터 수집 및 분석 중...
            </S.AiStatusBadge>
          </S.AiHeaderLeft>
        </S.AiSectionHeader>
        <S.AiHeadlineBox>
          <h4>MES 생산·설비·품질·재고 지표 분석 진행 중</h4>
          <p>
            규칙 기반 분석 엔진이 실시간 공정 수율 및 설비 센서 데이터를 종합 평가하고
            있습니다. 잠시만 기다려 주세요.
          </p>
        </S.AiHeadlineBox>
      </S.AiSectionWrapper>
    );
  }

  // 오류 발생 시 전체 대시보드에 영향 주지 않는 격리된 오류 안내
  if (isError) {
    return (
      <S.AiSectionWrapper>
        <S.AiSectionHeader>
          <S.AiHeaderLeft>
            <S.AiBadge>
              <FaWandMagicSparkles /> AI 관제 브리핑
            </S.AiBadge>
            <S.AiStatusBadge $status="WARNING">
              <FaCircleExclamation /> 분석 일시 오류
            </S.AiStatusBadge>
          </S.AiHeaderLeft>
          <S.AiHeaderRight>
            <S.AiRefreshBtn type="button" onClick={handleRefresh}>
              <FaArrowRotateRight /> 다시 시도
            </S.AiRefreshBtn>
          </S.AiHeaderRight>
        </S.AiSectionHeader>
        <S.AiHeadlineBox>
          <h4>AI 브리핑 데이터를 불러오지 못했습니다.</h4>
          <p>{error?.message || '네트워크 연결 상태를 확인한 후 다시 시도해 주세요.'}</p>
        </S.AiHeadlineBox>
      </S.AiSectionWrapper>
    );
  }

  // 데이터가 없을 때
  if (!briefing) {
    return (
      <S.AiSectionWrapper>
        <S.AiSectionHeader>
          <S.AiHeaderLeft>
            <S.AiBadge>
              <FaWandMagicSparkles /> AI 관제 브리핑
            </S.AiBadge>
          </S.AiHeaderLeft>
          <S.AiHeaderRight>
            <S.AiRefreshBtn type="button" onClick={handleRefresh}>
              <FaWandMagicSparkles /> 지금 분석 요청
            </S.AiRefreshBtn>
          </S.AiHeaderRight>
        </S.AiSectionHeader>
        <S.AiEmptyBox>
          분석된 브리핑 데이터가 없습니다. 상단의 '지금 분석 요청' 버튼을 눌러 종합
          진단을 실행하세요.
        </S.AiEmptyBox>
      </S.AiSectionWrapper>
    );
  }

  const statusLabel =
    briefing.overallStatus === 'CRITICAL'
      ? '긴급 점검 필요'
      : briefing.overallStatus === 'WARNING'
      ? '주의 징후 감지'
      : '전 공정 정상';

  const formattedTime = new Date(briefing.analyzedAt).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <S.AiSectionWrapper>
      {/* 1. 상단 바 (뱃지, 상태, 분석시간, 새로고침 버튼) */}
      <S.AiSectionHeader>
        <S.AiHeaderLeft>
          <S.AiBadge>
            <FaWandMagicSparkles /> AI 관제 브리핑
          </S.AiBadge>
          <S.AiStatusBadge $status={briefing.overallStatus}>
            {briefing.overallStatus === 'CRITICAL' ? (
              <FaCircleExclamation />
            ) : briefing.overallStatus === 'WARNING' ? (
              <FaTriangleExclamation />
            ) : (
              <FaCircleCheck />
            )}
            {statusLabel}
          </S.AiStatusBadge>
        </S.AiHeaderLeft>

        <S.AiHeaderRight>
          <S.AiAnalyzedAt>분석 기준: {formattedTime}</S.AiAnalyzedAt>
          <S.AiRefreshBtn
            type="button"
            onClick={handleRefresh}
            disabled={isFetching}
            title="사용자 요청 시 1회 분석 실행 (15초 폴링 제외)"
          >
            <FaArrowRotateRight className={isFetching ? 'fa-spin' : ''} />
            {isFetching ? '분석 중...' : '브리핑 새로고침'}
          </S.AiRefreshBtn>
        </S.AiHeaderRight>
      </S.AiSectionHeader>

      {/* 2. 종합 헤드라인 및 오버뷰 */}
      <S.AiHeadlineBox>
        <h4>{briefing.headline}</h4>
        <p>{briefing.overview}</p>
      </S.AiHeadlineBox>

      {/* 3. 위험 항목 및 권장 사항 구분 그리드 */}
      <S.AiColumnsGrid>
        {/* 좌측: 주요 위험 항목 (Risks) */}
        <S.AiColumn>
          <S.AiColumnTitle>
            <FaShieldHalved style={{ color: '#ff3b30' }} />
            주요 위험 항목 ({briefing.risks.length}건)
          </S.AiColumnTitle>

          <S.AiCardList>
            {briefing.risks.length === 0 ? (
              <S.AiEmptyBox>감지된 위험 항목이 없습니다. (안전 상태)</S.AiEmptyBox>
            ) : (
              briefing.risks.map((risk) => (
                <S.AiItemCard key={risk.id} $severity={risk.severity}>
                  <S.AiItemHeader>
                    <S.AiItemTitle>{risk.title}</S.AiItemTitle>
                    <S.AiItemBadge
                      $tone={
                        risk.severity === 'CRITICAL'
                          ? 'danger'
                          : risk.severity === 'WARNING'
                          ? 'warning'
                          : 'info'
                      }
                    >
                      {risk.severity}
                    </S.AiItemBadge>
                  </S.AiItemHeader>
                  <S.AiItemDetail>{risk.detail}</S.AiItemDetail>
                  {risk.suggestion && (
                    <S.AiItemSuggestion>
                      <strong>💡 조치 가이드:</strong> {risk.suggestion}
                    </S.AiItemSuggestion>
                  )}
                </S.AiItemCard>
              ))
            )}
          </S.AiCardList>
        </S.AiColumn>

        {/* 우측: 대응 권장 사항 (Recommendations) */}
        <S.AiColumn>
          <S.AiColumnTitle>
            <FaLightbulb style={{ color: '#ff9500' }} />
            대응 권장 사항 ({briefing.recommendations.length}건)
          </S.AiColumnTitle>

          <S.AiCardList>
            {briefing.recommendations.length === 0 ? (
              <S.AiEmptyBox>현재 추가 권장 조치가 없습니다.</S.AiEmptyBox>
            ) : (
              briefing.recommendations.map((rec) => (
                <S.AiItemCard key={rec.id} $priority={rec.priority}>
                  <S.AiItemHeader>
                    <S.AiItemTitle>{rec.action}</S.AiItemTitle>
                    <S.AiItemBadge
                      $tone={
                        rec.priority === 'HIGH'
                          ? 'danger'
                          : rec.priority === 'MEDIUM'
                          ? 'warning'
                          : 'info'
                      }
                    >
                      우선순위 {rec.priority}
                    </S.AiItemBadge>
                  </S.AiItemHeader>
                  <S.AiItemDetail>
                    <strong>대상:</strong> {rec.targetDomain}
                  </S.AiItemDetail>
                  <S.AiItemSuggestion>
                    <strong>🎯 기대 효과:</strong> {rec.expectedEffect}
                  </S.AiItemSuggestion>
                </S.AiItemCard>
              ))
            )}
          </S.AiCardList>
        </S.AiColumn>
      </S.AiColumnsGrid>
    </S.AiSectionWrapper>
  );
}
