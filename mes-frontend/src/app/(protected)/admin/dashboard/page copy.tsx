'use client';

import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'styled-components';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  FaArrowRotateRight,
  FaBullseye,
  FaChartLine,
  FaCircleCheck,
  FaIndustry,
  FaTriangleExclamation,
} from 'react-icons/fa6';

import { fetchRecords } from '@/api/mes.http';
import * as S from '@/assets/css/admin/DashChart.styles';

interface AnalyticsRecord {
  id: number;
  lineName: string;
  targetCount: number;
  actualCount: number;
  defectCount: number;
  yieldRate: number;
}

export default function DashboardPage() {
  const theme = useTheme();

  // AnalyticsPage와 동일한 queryKey(['analyticsRecords'])를 공유하여 실시간 데이터 연동
  const {
    data: records = [],
    isLoading,
    refetch,
  } = useQuery<AnalyticsRecord[]>({
    queryKey: ['analyticsRecords'],
    queryFn: async () => {
      const payload = await fetchRecords();
      const raw = Array.isArray(payload)
        ? payload
        : (payload?.records ?? payload?.analytics ?? payload?.data ?? []);
      return Array.isArray(raw) ? raw : [];
    },
    refetchInterval: 15000,
  });

  // 1. 핵심 KPI 요약 집계
  const summary = useMemo(() => {
    const target = records.reduce((acc, r) => acc + Number(r.targetCount || 0), 0);
    const actual = records.reduce((acc, r) => acc + Number(r.actualCount || 0), 0);
    const defect = records.reduce((acc, r) => acc + Number(r.defectCount || 0), 0);
    const total = actual + defect;

    const yieldRate = total > 0 ? (actual / total) * 100 : 0;
    const achievementRate = target > 0 ? (actual / target) * 100 : 0;
    const lines = new Set(records.map((r) => r.lineName)).size;

    return { target, actual, defect, yieldRate, achievementRate, lines };
  }, [records]);

  // 2. 시계열 생산 추이 데이터 (AreaChart용)
  const trendData = useMemo(() => {
    return [...records]
      .sort((a, b) => Number(a.id) - Number(b.id))
      .slice(-10)
      .map((item) => ({
        name: `#${item.id} (${item.lineName})`,
        목표량: Number(item.targetCount),
        양품량: Number(item.actualCount),
        불량량: Number(item.defectCount),
      }));
  }, [records]);

  // 3. 라인별 집계 데이터 (BarChart & 라인 가동 현황용)
  const lineSummary = useMemo(() => {
    const map = new Map<
      string,
      { lineName: string; target: number; actual: number; defect: number }
    >();

    records.forEach((r) => {
      const prev = map.get(r.lineName) ?? {
        lineName: r.lineName,
        target: 0,
        actual: 0,
        defect: 0,
      };
      prev.target += Number(r.targetCount || 0);
      prev.actual += Number(r.actualCount || 0);
      prev.defect += Number(r.defectCount || 0);
      map.set(r.lineName, prev);
    });

    return Array.from(map.values()).map((item) => {
      const total = item.actual + item.defect;
      const yieldRate = total > 0 ? (item.actual / total) * 100 : 0;
      return {
        ...item,
        yieldRate: Number(yieldRate.toFixed(1)),
      };
    });
  }, [records]);

  // 4. 양품 vs 불량 도넛 차트 데이터
  const qualityDonutData = useMemo(
    () => [
      { name: '양품 (Good)', value: summary.actual, color: '#0071e3' },
      { name: '불량 (Defect)', value: summary.defect, color: '#ff3b30' },
    ],
    [summary.actual, summary.defect]
  );

  // 동적 스파크라인 좌표 생성
  const sparkPoints = useMemo(() => {
    if (trendData.length < 2) return '0,20 18,16 36,18 54,10 72,6';
    const maxVal = Math.max(...trendData.map((d) => d.양품량), 1);
    return trendData
      .map((d, idx) => {
        const x = (idx / (trendData.length - 1)) * 72;
        const y = 24 - (d.양품량 / maxVal) * 20;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }, [trendData]);

  // Apple 글래스 툴팁 스타일
  const tooltipStyle = {
    backgroundColor: theme.mode === 'light' ? 'rgba(255, 255, 255, 0.92)' : theme.colors.bg.elevated,
    backdropFilter: 'blur(12px)',
    border: `1px solid ${theme.colors.border.default}`,
    borderRadius: '12px',
    color: theme.colors.text.primary,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    fontSize: '12px',
    fontWeight: 600,
  };

  return (
    <S.PageContainer>
      {/* 상단 헤더 */}
      <S.PageHeader>
        <S.PageHeading>
          <S.Eyebrow>SMART FACTORY REAL-TIME COMMAND CENTER</S.Eyebrow>
          <S.PageDashTitle>
            통합 생산 관제 대시보드
            <S.LiveBadge>LIVE SYNC</S.LiveBadge>
          </S.PageDashTitle>
          <S.PageDescription>
            전체 생산 라인의 실시간 수율 추이와 양품·불량 밸런스를 한눈에 통합 관제합니다.
          </S.PageDescription>
        </S.PageHeading>

        <S.HeaderActions>
        <S.RefreshButton
            type="button"
            onClick={() => void refetch()}
            disabled={isLoading}
            >
            <FaArrowRotateRight />
        {isLoading ? "동기화 중..." : "새로고침"}
        </S.RefreshButton>
        </S.HeaderActions>
      </S.PageHeader>

      {/* 1. Apple 감성 아이콘 + 스파크라인 5열 요약 카드 */}
      <S.SummaryGrid>
        {/* 카드 1: 생산 라인 */}
        <S.SummaryCard>
          <S.CardTopRow>
            <S.SummaryIcon $variant="blue">
              <FaIndustry />
            </S.SummaryIcon>
            <S.StatusPill $tone="info">가동 중</S.StatusPill>
          </S.CardTopRow>
          <S.CardBottomRow>
            <S.SummaryContent>
              <span>생산 라인</span>
              <strong>{summary.lines}</strong>
              <small>등록된 라인 수</small>
            </S.SummaryContent>
            <svg width="72" height="26" viewBox="0 0 72 26" fill="none">
              <polyline
                fill="none"
                stroke="#0071e3"
                strokeWidth="2.4"
                strokeLinecap="round"
                points="0,20 18,20 36,12 54,12 72,6"
              />
            </svg>
          </S.CardBottomRow>
        </S.SummaryCard>

        {/* 카드 2: 목표 생산량 */}
        <S.SummaryCard>
          <S.CardTopRow>
            <S.SummaryIcon $variant="indigo">
              <FaBullseye />
            </S.SummaryIcon>
            <S.StatusPill $tone="info">TARGET</S.StatusPill>
          </S.CardTopRow>
          <S.CardBottomRow>
            <S.SummaryContent>
              <span>목표 생산량</span>
              <strong>{summary.target.toLocaleString()}</strong>
              <small>누적 목표 수량</small>
            </S.SummaryContent>
            <svg width="72" height="26" viewBox="0 0 72 26" fill="none">
              <polyline
                fill="none"
                stroke="#5856d6"
                strokeWidth="2.4"
                strokeLinecap="round"
                points="0,22 24,18 48,13 72,7"
              />
            </svg>
          </S.CardBottomRow>
        </S.SummaryCard>

        {/* 카드 3: 양품 생산량 */}
        <S.SummaryCard>
          <S.CardTopRow>
            <S.SummaryIcon $variant="green">
              <FaCircleCheck />
            </S.SummaryIcon>
            <S.StatusPill $tone="success">
              달성률 {summary.achievementRate.toFixed(1)}%
            </S.StatusPill>
          </S.CardTopRow>
          <S.CardBottomRow>
            <S.SummaryContent>
              <span>양품 생산량</span>
              <strong>{summary.actual.toLocaleString()}</strong>
              <small>누적 양품 수량</small>
            </S.SummaryContent>
            <svg width="72" height="26" viewBox="0 0 72 26" fill="none">
              <polyline
                fill="none"
                stroke="#28cd41"
                strokeWidth="2.4"
                strokeLinecap="round"
                points={sparkPoints}
              />
            </svg>
          </S.CardBottomRow>
        </S.SummaryCard>

        {/* 카드 4: 불량 수량 */}
        <S.SummaryCard>
          <S.CardTopRow>
            <S.SummaryIcon $variant="orange">
              <FaTriangleExclamation />
            </S.SummaryIcon>
            <S.StatusPill $tone={summary.defect > 0 ? 'danger' : 'success'}>
              {summary.defect > 0 ? '주의 필요' : '무결점'}
            </S.StatusPill>
          </S.CardTopRow>
          <S.CardBottomRow>
            <S.SummaryContent>
              <span>불량 수량</span>
              <strong>{summary.defect.toLocaleString()}</strong>
              <small>누적 불량 수량</small>
            </S.SummaryContent>
            <svg width="72" height="26" viewBox="0 0 72 26" fill="none">
              <polyline
                fill="none"
                stroke="#ff3b30"
                strokeWidth="2.4"
                strokeLinecap="round"
                points="0,10 18,16 36,14 54,21 72,18"
              />
            </svg>
          </S.CardBottomRow>
        </S.SummaryCard>

        {/* 카드 5: 전체 공정 수율 */}
        <S.SummaryCard>
          <S.CardTopRow>
            <S.SummaryIcon $variant="green">
              <FaChartLine />
            </S.SummaryIcon>
            <S.StatusPill $tone={summary.yieldRate >= 95 ? 'success' : 'warning'}>
              {summary.yieldRate >= 95 ? '정상 (≥95%)' : '기준 미달'}
            </S.StatusPill>
          </S.CardTopRow>
          <S.CardBottomRow>
            <S.SummaryContent>
              <span>전체 공정 수율</span>
              <strong>{summary.yieldRate.toFixed(1)}%</strong>
              <small>양품 / 전체 생산량</small>
            </S.SummaryContent>
            <svg width="72" height="26" viewBox="0 0 72 26" fill="none">
              <polyline
                fill="none"
                stroke="#28cd41"
                strokeWidth="2.4"
                strokeLinecap="round"
                points="0,18 18,14 36,15 54,9 72,6"
              />
            </svg>
          </S.CardBottomRow>
        </S.SummaryCard>
      </S.SummaryGrid>

      {/* 2. 메인 차트 섹션 (그라데이션 영역 차트 + 얇은 링 도넛 차트) */}
      <S.MainChartGrid>
        <S.ChartPanel>
          <S.PanelHeader>
            <div>
              <S.PanelTitle>실시간 생산 실적 추이 (목표 vs 양품)</S.PanelTitle>
              <S.PanelSub>최근 등록된 생산 실적별 목표 대비 양품 추이입니다.</S.PanelSub>
            </div>
          </S.PanelHeader>

          <S.ChartBox>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="appleBlueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0071e3" stopOpacity={0.38} />
                    <stop offset="95%" stopColor="#0071e3" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="appleGreenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#28cd41" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#28cd41" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={theme.colors.border.default}
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: theme.colors.text.secondary, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: theme.colors.text.secondary, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area
                  type="monotone"
                  dataKey="목표량"
                  stroke="#28cd41"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fillOpacity={1}
                  fill="url(#appleGreenGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="양품량"
                  stroke="#0071e3"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#appleBlueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </S.ChartBox>
        </S.ChartPanel>

        <S.ChartPanel>
          <S.PanelHeader>
            <div>
              <S.PanelTitle>전체 품질 합격 비율</S.PanelTitle>
              <S.PanelSub>누적 양품 및 불량 점유율</S.PanelSub>
            </div>
          </S.PanelHeader>

          <S.DonutWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={qualityDonutData}
                  cx="50%"
                  cy="48%"
                  innerRadius={82}
                  outerRadius={106}
                  paddingAngle={5}
                  cornerRadius={8}
                  dataKey="value"
                  stroke="none"
                >
                  {qualityDonutData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend verticalAlign="bottom" height={32} wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>

            <S.DonutCenterLabel>
              <strong>{summary.yieldRate.toFixed(1)}%</strong>
              <span>종합 공정 수율</span>
            </S.DonutCenterLabel>
          </S.DonutWrapper>
        </S.ChartPanel>
      </S.MainChartGrid>

      {/* 3. 하단 섹션 (라인별 생산 비교 바 차트 + 라인별 수율 현황) */}
      <S.BottomGrid>
        <S.ChartPanel>
          <S.PanelHeader>
            <div>
              <S.PanelTitle>라인별 양품·불량 생산 밸런스</S.PanelTitle>
              <S.PanelSub>생산 라인별 실적 비교</S.PanelSub>
            </div>
          </S.PanelHeader>

          <S.ChartBox>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lineSummary} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={theme.colors.border.default}
                  vertical={false}
                />
                <XAxis
                  dataKey="lineName"
                  tick={{ fill: theme.colors.text.secondary, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: theme.colors.text.secondary, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar
                  dataKey="actual"
                  name="양품량"
                  fill="#0071e3"
                  radius={[8, 8, 0, 0]}
                  barSize={28}
                />
                <Bar
                  dataKey="defect"
                  name="불량량"
                  fill="#ff3b30"
                  radius={[8, 8, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </S.ChartBox>
        </S.ChartPanel>

        <S.ChartPanel>
          <S.PanelHeader>
            <div>
              <S.PanelTitle>라인별 수율 달성 현황</S.PanelTitle>
              <S.PanelSub>수율 95% 기준 실시간 라인별 모니터링</S.PanelSub>
            </div>
          </S.PanelHeader>

          <S.LineList>
            {lineSummary.length === 0 ? (
              <p style={{ color: theme.colors.text.secondary, fontSize: '13px' }}>
                등록된 생산 실적 데이터가 없습니다.
              </p>
            ) : (
              lineSummary.map((line) => {
                const tone =
                  line.yieldRate >= 95
                    ? 'success'
                    : line.yieldRate >= 85
                      ? 'warning'
                      : 'danger';

                return (
                  <S.LineRow key={line.lineName}>
                    <S.LineRowHeader>
                      <strong>{line.lineName}</strong>
                      <span>
                        양품 {line.actual.toLocaleString()} / 목표 {line.target.toLocaleString()} EA (수율{' '}
                        <b>{line.yieldRate}%</b>)
                      </span>
                    </S.LineRowHeader>
                    <S.ProgressTrack>
                      <S.ProgressFill $percent={line.yieldRate} $tone={tone} />
                    </S.ProgressTrack>
                  </S.LineRow>
                );
              })
            )}
          </S.LineList>
        </S.ChartPanel>
      </S.BottomGrid>
    </S.PageContainer>
  );
}