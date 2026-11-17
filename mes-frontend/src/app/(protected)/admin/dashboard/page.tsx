'use client';

import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'styled-components';
import {
  Area,
  AreaChart,
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
  FaBoxesStacked,
  FaChartLine,
  FaCircleCheck,
  FaIndustry,
  FaMicrochip,
  FaTemperatureHalf,
  FaTriangleExclamation,
} from 'react-icons/fa6';

import {
  fetchComponents,
  fetchEquipment,
  fetchInspection,
  fetchProcessLines,
  fetchRecords,
} from '@/api/mes.http';
import * as S from '@/assets/css/admin/DashChart.styles';

// 백엔드 응답 배열 정규화 유틸 (배열 또는 { data / records / ... } 형태 모두 안전하게 처리)
function extractList<T>(payload: unknown, keys: string[]): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (payload && typeof payload === 'object') {
    const obj = payload as Record<string, unknown>;
    for (const key of keys) {
      if (Array.isArray(obj[key])) return obj[key] as T[];
    }
  }
  return [];
}

export default function DashboardPage() {
  const theme = useTheme();

  // 1. 공정 라인 조회 (PROCESS_LINES)
  const linesQuery = useQuery({
    queryKey: ['processLines'],
    queryFn: fetchProcessLines,
    refetchInterval: 15000,
  });

  // 2. 생산 실적 조회 (PRODUCTION_RECORDS)
  const recordsQuery = useQuery({
    queryKey: ['analyticsRecords'],
    queryFn: async () => {
      const res = await fetchRecords();
      return extractList<{
        id: number;
        lineName: string;
        targetCount: number;
        actualCount: number;
        defectCount: number;
        yieldRate: number;
      }>(res, ['records', 'analytics', 'data']);
    },
    refetchInterval: 15000,
  });

  // 3. 품질 검사 조회 (QUALITY_INSPECTIONS)
  const inspectionQuery = useQuery({
    queryKey: ['qualityInspections'],
    queryFn: async () => {
      const res = await fetchInspection();
      return extractList<{
        id: number;
        serialNumber: string;
        inspectionType: string;
        result: 'PASS' | 'FAIL';
        defectReason?: string;
        inspector?: string;
      }>(res, ['inspections', 'quality', 'data']);
    },
    refetchInterval: 15000,
  });

  // 4. 클린룸 설비 조회 (EQUIPMENTS)
  const equipmentQuery = useQuery({
    queryKey: ['cleanroomEquipments'],
    queryFn: async () => {
      const res = await fetchEquipment();
      return extractList<{
        id: number;
        equipmentName: string;
        cleanroomZone: string;
        temperature: number;
        humidity: number;
        status: 'NORMAL' | 'WARNING' | 'ERROR';
      }>(res, ['equipments', 'equipment', 'data']);
    },
    refetchInterval: 15000,
  });

  // 5. 부품 SCM 조회 (COMPONENT_SCM)
  const scmQuery = useQuery({
    queryKey: ['scmComponents'],
    queryFn: async () => {
      const res = await fetchComponents();
      return extractList<{
        id: number;
        componentName: string;
        category: string;
        stockQuantity: number;
        minThreshold: number;
        supplier: string;
        status: 'NORMAL' | 'WARNING' | 'DANGER';
      }>(res, ['components', 'scm', 'data']);
    },
    refetchInterval: 15000,
  });

  const isLoading =
    linesQuery.isLoading ||
    recordsQuery.isLoading ||
    inspectionQuery.isLoading ||
    equipmentQuery.isLoading ||
    scmQuery.isLoading;

  const handleRefreshAll = () => {
    void Promise.all([
      linesQuery.refetch(),
      recordsQuery.refetch(),
      inspectionQuery.refetch(),
      equipmentQuery.refetch(),
      scmQuery.refetch(),
    ]);
  };

  // 전 도메인 통합 요약 KPI 계산
  const summary = useMemo(() => {
    const lines = linesQuery.data ?? [];
    const records = recordsQuery.data ?? [];
    const inspections = inspectionQuery.data ?? [];
    const equipments = equipmentQuery.data ?? [];
    const components = scmQuery.data ?? [];

    // 공정 라인 가동률
    const runningLines = lines.filter((l) => l.status === 'RUNNING').length;
    const lineRunRate = lines.length > 0 ? (runningLines / lines.length) * 100 : 0;

    // 생산 실적 수율
    const actual = records.reduce((acc, r) => acc + Number(r.actualCount || 0), 0);
    const defect = records.reduce((acc, r) => acc + Number(r.defectCount || 0), 0);
    const yieldRate = actual + defect > 0 ? (actual / (actual + defect)) * 100 : 0;

    // AI 비전 품질 합격률
    const passCount = inspections.filter((i) => i.result === 'PASS').length;
    const failCount = inspections.filter((i) => i.result === 'FAIL').length;
    const passRate = inspections.length > 0 ? (passCount / inspections.length) * 100 : 0;

    // 클린룸 설비 이상 건수
    const alertEquipments = equipments.filter((e) => e.status !== 'NORMAL');

    // 안전재고 미달 부품 건수 (stockQuantity < minThreshold 또는 status !== 'NORMAL')
    const lowStockComponents = components.filter(
      (c) => Number(c.stockQuantity) < Number(c.minThreshold) || c.status !== 'NORMAL'
    );

    return {
      totalLines: lines.length,
      runningLines,
      lineRunRate,
      actual,
      yieldRate,
      passCount,
      failCount,
      passRate,
      totalEquipments: equipments.length,
      alertEquipmentCount: alertEquipments.length,
      totalComponents: components.length,
      lowStockCount: lowStockComponents.length,
      alertEquipments,
      lowStockComponents,
    };
  }, [
    linesQuery.data,
    recordsQuery.data,
    inspectionQuery.data,
    equipmentQuery.data,
    scmQuery.data,
  ]);

  // 생산 추이 차트 데이터 (AreaChart)
  const trendData = useMemo(() => {
    const records = recordsQuery.data ?? [];
    return [...records]
      .sort((a, b) => Number(a.id) - Number(b.id))
      .slice(-10)
      .map((item) => ({
        name: `#${item.id} (${item.lineName})`,
        목표량: Number(item.targetCount),
        양품량: Number(item.actualCount),
      }));
  }, [recordsQuery.data]);

  // 품질 검사 도넛 차트 데이터 (QUALITY_INSPECTIONS)
  const inspectionDonutData = useMemo(
    () => [
      { name: '합격 (PASS)', value: summary.passCount, color: theme.colors.primary.default },
      { name: '불량 (FAIL)', value: summary.failCount, color: theme.colors.status.danger.text },
    ],
    [summary.passCount, summary.failCount, theme]
  );

  const tooltipStyle = {
    backgroundColor: theme.colors.bg.elevated,
    border: `1px solid ${theme.colors.border.default}`,
    borderRadius: '12px',
    color: theme.colors.text.primary,
    boxShadow: theme.shadows.elevated,
    fontSize: '12px',
  };

  return (
    <S.PageContainer>
      {/* 상단 헤더 */}
      <S.PageHeader>
        <S.PageHeading>
          <S.Eyebrow>SMART FACTORY REAL-TIME COMMAND CENTER</S.Eyebrow>
          <S.PageDashTitle>
            통합 생산 관제 대시보드
            <S.LiveBadge>LIVE POLLING (15s)</S.LiveBadge>
          </S.PageDashTitle>
          <S.PageDescription>
            공정 라인·생산 실적·품질 검사·클린룸 설비·부품 재고 현황을 실시간으로 통합 관제합니다.
          </S.PageDescription>
        </S.PageHeading>

        <S.RefreshButton type="button" onClick={handleRefreshAll} disabled={isLoading}>
          <FaArrowRotateRight />
          {isLoading ? '동기화 중...' : '전체 도메인 새로고침'}
        </S.RefreshButton>
      </S.PageHeader>

      {/* 1. 5대 핵심 도메인 통합 KPI 카드 */}
      <S.SummaryGrid>
        {/* KPI 1: 공정 라인 가동률 (PROCESS_LINES) */}
        <S.SummaryCard>
          <S.CardTopRow>
            <S.SummaryIcon $variant="blue">
              <FaIndustry />
            </S.SummaryIcon>
            <S.StatusPill $tone={summary.lineRunRate >= 70 ? 'success' : 'warning'}>
              가동률 {summary.lineRunRate.toFixed(0)}%
            </S.StatusPill>
          </S.CardTopRow>
          <S.CardBottomRow>
            <S.SummaryContent>
              <span>공정 라인 가동</span>
              <strong>
                {summary.runningLines} / {summary.totalLines}
              </strong>
              <small>전체 라인 중 가동(RUNNING)</small>
            </S.SummaryContent>
            <svg width="72" height="26" viewBox="0 0 72 26" fill="none">
              <polyline
                fill="none"
                stroke="#0071e3"
                strokeWidth="2.4"
                strokeLinecap="round"
                points="0,20 18,16 36,16 54,10 72,6"
              />
            </svg>
          </S.CardBottomRow>
        </S.SummaryCard>

        {/* KPI 2: 누적 양품 & 공정 수율 (PRODUCTION_RECORDS) */}
        <S.SummaryCard>
          <S.CardTopRow>
            <S.SummaryIcon $variant="green">
              <FaChartLine />
            </S.SummaryIcon>
            <S.StatusPill $tone={summary.yieldRate >= 95 ? 'success' : 'warning'}>
              수율 {summary.yieldRate.toFixed(1)}%
            </S.StatusPill>
          </S.CardTopRow>
          <S.CardBottomRow>
            <S.SummaryContent>
              <span>누적 양품 생산</span>
              <strong>{summary.actual.toLocaleString()}</strong>
              <small>목표 기준 수율 95.0%</small>
            </S.SummaryContent>
            <svg width="72" height="26" viewBox="0 0 72 26" fill="none">
              <polyline
                fill="none"
                stroke="#28cd41"
                strokeWidth="2.4"
                strokeLinecap="round"
                points="0,22 20,17 40,14 60,9 72,5"
              />
            </svg>
          </S.CardBottomRow>
        </S.SummaryCard>

        {/* KPI 3: AI 비전 품질 합격률 (QUALITY_INSPECTIONS) */}
        <S.SummaryCard>
          <S.CardTopRow>
            <S.SummaryIcon $variant="indigo">
              <FaCircleCheck />
            </S.SummaryIcon>
            <S.StatusPill $tone={summary.failCount > 0 ? 'info' : 'success'}>
              불량 {summary.failCount}건
            </S.StatusPill>
          </S.CardTopRow>
          <S.CardBottomRow>
            <S.SummaryContent>
              <span>품질 검사 합격률</span>
              <strong>{summary.passRate.toFixed(1)}%</strong>
              <small>총 {summary.passCount + summary.failCount}건 시리얼 검사</small>
            </S.SummaryContent>
            <svg width="72" height="26" viewBox="0 0 72 26" fill="none">
              <polyline
                fill="none"
                stroke="#5856d6"
                strokeWidth="2.4"
                strokeLinecap="round"
                points="0,16 18,14 36,12 54,8 72,6"
              />
            </svg>
          </S.CardBottomRow>
        </S.SummaryCard>

        {/* KPI 4: 클린룸 설비 상태 (EQUIPMENTS) */}
        <S.SummaryCard>
          <S.CardTopRow>
            <S.SummaryIcon $variant={summary.alertEquipmentCount > 0 ? 'orange' : 'green'}>
              <FaTemperatureHalf />
            </S.SummaryIcon>
            <S.StatusPill $tone={summary.alertEquipmentCount > 0 ? 'danger' : 'success'}>
              {summary.alertEquipmentCount > 0 ? `경고 ${summary.alertEquipmentCount}대` : '전 설비 정상'}
            </S.StatusPill>
          </S.CardTopRow>
          <S.CardBottomRow>
            <S.SummaryContent>
              <span>클린룸 설비 관제</span>
              <strong>
                {summary.totalEquipments - summary.alertEquipmentCount} / {summary.totalEquipments}
              </strong>
              <small>온·습도 정상 가동 설비</small>
            </S.SummaryContent>
            <svg width="72" height="26" viewBox="0 0 72 26" fill="none">
              <polyline
                fill="none"
                stroke={summary.alertEquipmentCount > 0 ? '#ff3b30' : '#28cd41'}
                strokeWidth="2.4"
                strokeLinecap="round"
                points="0,12 24,14 48,11 72,13"
              />
            </svg>
          </S.CardBottomRow>
        </S.SummaryCard>

        {/* KPI 5: 부품 SCM 안전재고 경고 (COMPONENT_SCM) */}
        <S.SummaryCard>
          <S.CardTopRow>
            <S.SummaryIcon $variant={summary.lowStockCount > 0 ? 'orange' : 'blue'}>
              <FaMicrochip />
            </S.SummaryIcon>
            <S.StatusPill $tone={summary.lowStockCount > 0 ? 'danger' : 'success'}>
              {summary.lowStockCount > 0 ? '발주 필요' : '재고 안정'}
            </S.StatusPill>
          </S.CardTopRow>
          <S.CardBottomRow>
            <S.SummaryContent>
              <span>안전재고 미달 부품</span>
              <strong>{summary.lowStockCount}종</strong>
              <small>총 {summary.totalComponents}개 핵심 품목 관리</small>
            </S.SummaryContent>
            <svg width="72" height="26" viewBox="0 0 72 26" fill="none">
              <polyline
                fill="none"
                stroke={summary.lowStockCount > 0 ? '#ff3b30' : '#0071e3'}
                strokeWidth="2.4"
                strokeLinecap="round"
                points="0,8 20,12 40,18 60,21 72,19"
              />
            </svg>
          </S.CardBottomRow>
        </S.SummaryCard>
      </S.SummaryGrid>

      {/* 2. 메인 차트 섹션 (생산 실적 추이 + 품질 검사 합격률 도넛) */}
      <S.MainChartGrid>
        <S.ChartPanel>
          <S.PanelHeader>
            <div>
              <S.PanelTitle>생산 실적 추이 (목표 vs 양품)</S.PanelTitle>
              <S.PanelSub>PRODUCTION_RECORDS 기준 최근 실적 흐름</S.PanelSub>
            </div>
          </S.PanelHeader>

          <S.ChartBox>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.colors.primary.default} stopOpacity={0.45} />
                    <stop offset="95%" stopColor={theme.colors.primary.default} stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.colors.status.success.text} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={theme.colors.status.success.text} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border.default} vertical={false} />
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
                  stroke={theme.colors.status.success.text}
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#colorTarget)"
                />
                <Area
                  type="monotone"
                  dataKey="양품량"
                  stroke={theme.colors.primary.default}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorActual)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </S.ChartBox>
        </S.ChartPanel>

        <S.ChartPanel>
          <S.PanelHeader>
            <div>
              <S.PanelTitle>AI 비전 품질 검사 판정 비율</S.PanelTitle>
              <S.PanelSub>QUALITY_INSPECTIONS 시리얼 검사 결과</S.PanelSub>
            </div>
          </S.PanelHeader>

          <S.DonutWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inspectionDonutData}
                  cx="50%"
                  cy="48%"
                  innerRadius={78}
                  outerRadius={104}
                  paddingAngle={4}
                  cornerRadius={8}
                  dataKey="value"
                  stroke="none"
                >
                  {inspectionDonutData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend verticalAlign="bottom" height={32} wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>

            <S.DonutCenterLabel>
              <strong>{summary.passRate.toFixed(1)}%</strong>
              <span>품질 합격률</span>
            </S.DonutCenterLabel>
          </S.DonutWrapper>
        </S.ChartPanel>
      </S.MainChartGrid>

      {/* 3. 하단 섹션 (공정 라인 실시간 가동 현황 + 설비·부품 이상 경보 피드) */}
     {/* 3. Apple 스타일 하단 2단 그리드 */}
      <S.BottomGrid>
        {/* 좌측: 공정 라인 실시간 가동 현황 */}
        <S.ChartPanel>
          <S.PanelHeader>
            <div>
              <S.PanelTitle>공정 라인 실시간 가동 현황</S.PanelTitle>
              <S.PanelSub>라인별 투입 제품, 공정 유형 및 실시간 가동 상태</S.PanelSub>
            </div>
            <S.StatusPill $tone="info">
              가동 {summary.runningLines} / {summary.totalLines}
            </S.StatusPill>
          </S.PanelHeader>

          {(linesQuery.data ?? []).length === 0 ? (
            <S.AllClearBanner>
              <strong>등록된 공정 라인이 없습니다</strong>
              <span>공정 라인 관리 메뉴에서 신규 라인을 등록해 주세요.</span>
            </S.AllClearBanner>
          ) : (
            <S.AppleInsetGroup>
              {(linesQuery.data ?? []).map((line) => {
                const state =
                  line.status === 'RUNNING'
                    ? 'RUNNING'
                    : line.status === 'MAINTENANCE'
                      ? 'MAINTENANCE'
                      : 'STOP';

                const iconTone =
                  state === 'RUNNING' ? 'green' : state === 'MAINTENANCE' ? 'amber' : 'red';

                const statusText =
                  state === 'RUNNING'
                    ? '가동 중'
                    : state === 'MAINTENANCE'
                      ? '예방 점검'
                      : '라인 정지';

                return (
                  <S.AppleInsetItem key={line.id}>
                    <S.ItemLeft>
                      <S.SquircleIconBox $tone={iconTone}>
                        {state === 'RUNNING' ? (
                          <FaIndustry />
                        ) : state === 'MAINTENANCE' ? (
                          <FaTriangleExclamation />
                        ) : (
                          <FaIndustry />
                        )}
                      </S.SquircleIconBox>

                      <S.ItemMeta>
                        <strong>{line.lineName}</strong>
                        <span>
                          <S.TagChip>{line.processType || 'PROCESS'}</S.TagChip>
                          {line.currentProduct || '대기 모델 없음'}
                        </span>
                      </S.ItemMeta>
                    </S.ItemLeft>

                    <S.AppleStatusCapsule $state={state}>{statusText}</S.AppleStatusCapsule>
                  </S.AppleInsetItem>
                );
              })}
            </S.AppleInsetGroup>
          )}
        </S.ChartPanel>

        {/* 우측: 설비 환경 & 자재 안전재고 실시간 경보 */}
        <S.ChartPanel>
          <S.PanelHeader>
            <div>
              <S.PanelTitle>설비 환경 & 자재 안전재고 경보</S.PanelTitle>
              <S.PanelSub>임계치 초과 클린룸 설비 및 안전재고 미달 품목</S.PanelSub>
            </div>
            <S.StatusPill
              $tone={
                summary.alertEquipmentCount + summary.lowStockCount > 0 ? 'danger' : 'success'
              }
            >
              {summary.alertEquipmentCount + summary.lowStockCount > 0
                ? `경보 ${summary.alertEquipmentCount + summary.lowStockCount}건`
                : '정상'}
            </S.StatusPill>
          </S.PanelHeader>

          {summary.alertEquipments.length === 0 && summary.lowStockComponents.length === 0 ? (
            <S.AllClearBanner>
              <S.SquircleIconBox $tone="green">
                <FaCircleCheck />
              </S.SquircleIconBox>
              <strong>모든 설비 및 자재가 최적 상태입니다</strong>
              <span>클린룸 온·습도 및 핵심 부품 안전재고가 기준치를 충족하고 있습니다.</span>
            </S.AllClearBanner>
          ) : (
            <S.AppleInsetGroup>
              {/* 1) 클린룸 설비 환경 이상 항목 */}
              {summary.alertEquipments.map((eq) => {
                const isError = eq.status === 'ERROR';
                return (
                  <S.AppleInsetItem key={`eq-${eq.id}`} $isAlert>
                    <S.ItemLeft>
                      <S.SquircleIconBox $tone={isError ? 'red' : 'amber'}>
                        <FaTemperatureHalf />
                      </S.SquircleIconBox>
                      <S.ItemMeta>
                        <strong>{eq.equipmentName}</strong>
                        <span>
                          <S.TagChip>클린룸 {eq.status}</S.TagChip>
                          {eq.cleanroomZone}
                        </span>
                      </S.ItemMeta>
                    </S.ItemLeft>

                    <S.AlertMetricBox>
                      <strong>
                        {eq.temperature}℃ · {eq.humidity}%
                      </strong>
                      <small>권장 기준 이탈</small>
                    </S.AlertMetricBox>
                  </S.AppleInsetItem>
                );
              })}

              {/* 2) 부품 안전재고 미달 항목 (미니 게이지 바 포함) */}
              {summary.lowStockComponents.map((comp) => {
                const ratio =
                  Number(comp.minThreshold) > 0
                    ? (Number(comp.stockQuantity) / Number(comp.minThreshold)) * 100
                    : 0;
                const isCritical = comp.status === 'DANGER' || ratio < 50;

                return (
                  <S.AppleInsetItem key={`scm-${comp.id}`} $isAlert>
                    <S.ItemLeft>
                      <S.SquircleIconBox $tone={isCritical ? 'red' : 'amber'}>
                        <FaBoxesStacked />
                      </S.SquircleIconBox>
                      <S.ItemMeta>
                        <strong>{comp.componentName}</strong>
                        <span>
                          <S.TagChip>{comp.category}</S.TagChip>
                          {comp.supplier || '공급사 미지정'}
                        </span>
                      </S.ItemMeta>
                    </S.ItemLeft>

                    <S.AlertMetricBox>
                      <strong>
                        {comp.stockQuantity} / {comp.minThreshold} EA
                      </strong>
                      <S.MiniGaugeTrack>
                        <S.MiniGaugeFill $ratio={ratio} $critical={isCritical} />
                      </S.MiniGaugeTrack>
                    </S.AlertMetricBox>
                  </S.AppleInsetItem>
                );
              })}
            </S.AppleInsetGroup>
          )}
        </S.ChartPanel>
      </S.BottomGrid>
    </S.PageContainer>
  );
}