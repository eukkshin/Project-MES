"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  FaArrowRotateRight,
  FaBullseye,
  FaChartLine,
  FaCircleCheck,
  FaCirclePlus,
  FaClipboardList,
  FaIndustry,
  FaMagnifyingGlass,
  FaTriangleExclamation,
} from "react-icons/fa6";

import * as S from "@/assets/css/admin/Analytics.styles";
import { Layout } from "@/components/layout/Layout";
import { createRecords, fetchRecords, queryClient} from "@/api/http";

import type { ChangeEvent, FormEvent } from "react";

interface AnalyticsRecord {
  id: number;
  lineName: string;
  targetCount: number;
  actualCount: number;
  defectCount: number;
  yieldRate: number;
}

interface AnalyticsForm {
  lineName: string;
  targetCount: string;
  actualCount: string;
  defectCount: string;
}

type FilterType = "ALL" | "HIGH" | "LOW";

const INITIAL_STATE: AnalyticsForm = {
  lineName: "",
  targetCount: "1000",
  actualCount: "980",
  defectCount: "20",
};

const getYieldRate = (item: AnalyticsRecord) => {
  const rate = Number(item.yieldRate);

  if (Number.isFinite(rate)) {
    return rate;
  }

  const good = Number(item.actualCount);
  const defect = Number(item.defectCount);
  const total = good + defect;

  return total > 0 ? (good / total) * 100 : 0;
};

const getYieldTone = (rate: number) => {
  if (rate >= 95) return "success" as const;
  if (rate >= 85) return "warning" as const;
  return "danger" as const;
};

export default function AnalyticsPage() {

  const [form, setForm] = useState<AnalyticsForm>(INITIAL_STATE);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<FilterType>("ALL");

  const [notice, setNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  

   const {data: records=[], isLoading, refetch, error } = useQuery<AnalyticsRecord[]>({
        queryKey: ['analyticsRecords'],
        queryFn: async()=>{
            const data = await fetchRecords();
            if(data.success){
                return data.records;
            }
            throw new Error("생산 실적 데이터를 불러오지 못했습니다."); 
        }
    })
    
    const {mutate, isPending:isSubmitting, isError } = useMutation({
        mutationFn: createRecords,
        onSuccess: ()=>{
             setNotice({
              type: "success",
              message: "생산 실적이 정상적으로 등록되었습니다.",
            });
            setForm(INITIAL_STATE);
            queryClient.invalidateQueries({queryKey: ['analyticsRecords'] })
        },
        onError: (err)=>{
            console.error("생산 실적 등록 실패:", err);
             setNotice({
              type: "error",
              message: "생산 실적 등록에 실패했습니다.",
      });
        }
    })
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNotice(null);

    const lineName = form.lineName.trim();
    const targetCount = Number(form.targetCount);
    const actualCount = Number(form.actualCount);
    const defectCount = Number(form.defectCount);

    if (!lineName) {
      setNotice({
        type: "error",
        message: "생산 라인명을 입력해 주세요.",
      });
      return;
    }

    if (
      !form.targetCount.trim() ||
      !form.actualCount.trim() ||
      !form.defectCount.trim() ||
      [targetCount, actualCount, defectCount].some(
        (value) => !Number.isSafeInteger(value) || value < 0,
      )
    ) {
      setNotice({
        type: "error",
        message: "생산 수량은 0 이상의 정수로 입력해 주세요.",
      });
      return;
    }

    if (targetCount === 0) {
      setNotice({
        type: "error",
        message: "목표 생산량은 1 이상이어야 합니다.",
      });
      return;
    }

      const totalProduced = actualCount + defectCount;

      const yieldRate =
        totalProduced > 0
          ? Number(((actualCount / totalProduced) * 100).toFixed(2))
          : 0;

      //전송
      mutate({
          lineName,
          targetCount,
          actualCount,
          defectCount,
          yieldRate,
        });
 
  };

  const summary = useMemo(() => {
    const target = records.reduce(
      (sum, item) => sum + Number(item.targetCount),
      0,
    );

    const actual = records.reduce(
      (sum, item) => sum + Number(item.actualCount),
      0,
    );

    const defect = records.reduce(
      (sum, item) => sum + Number(item.defectCount),
      0,
    );

    const total = actual + defect;

    return {
      lines: new Set(records.map((item) => item.lineName)).size,
      target,
      actual,
      defect,
      yieldRate: total > 0 ? (actual / total) * 100 : 0,
      achievementRate: target > 0 ? (actual / target) * 100 : 0,
    };
  }, [records]);

  const filteredRecords = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return records.filter((item) => {
      const rate = getYieldRate(item);

      const matchesSearch = item.lineName.toLowerCase().includes(keyword);

      const matchesFilter =
        filter === "ALL" ||
        (filter === "HIGH" && rate >= 95) ||
        (filter === "LOW" && rate < 95);

      return matchesSearch && matchesFilter;
    });
  }, [records, searchTerm, filter]);

  const previewYield = useMemo(() => {
    const good = Number(form.actualCount);
    const defect = Number(form.defectCount);
    const total = good + defect;

    return total > 0 ? (good / total) * 100 : 0;
  }, [form.actualCount, form.defectCount]);

  return (
    <Layout>
      <S.PageContainer>
        <S.PageHeader>
          <S.PageHeading>
            <S.Eyebrow>PRODUCTION PERFORMANCE & YIELD ANALYTICS</S.Eyebrow>

            <S.PageTitle>생산 실적 및 수율 분석</S.PageTitle>

            <S.PageDescription>
              생산 라인별 목표 달성 현황과 양품·불량 실적을 통합 관리합니다.
            </S.PageDescription>
          </S.PageHeading>

          <S.RefreshButton
            type="button"
            onClick={() => void refetch()}
            disabled={isLoading}
          >
            <FaArrowRotateRight />
            {isLoading ? "조회 중..." : "새로고침"}
          </S.RefreshButton>
        </S.PageHeader>

        <S.SummaryGrid>
          <S.SummaryCard>
            <S.SummaryIcon $variant="blue">
              <FaIndustry />
            </S.SummaryIcon>
            <S.SummaryContent>
              <span>생산 라인</span>
              <strong>{summary.lines}</strong>
              <small>등록된 라인 수</small>
            </S.SummaryContent>
          </S.SummaryCard>

          <S.SummaryCard>
            <S.SummaryIcon $variant="blue">
              <FaBullseye />
            </S.SummaryIcon>
            <S.SummaryContent>
              <span>목표 생산량</span>
              <strong>{summary.target.toLocaleString()}</strong>
              <small>누적 목표 수량</small>
            </S.SummaryContent>
          </S.SummaryCard>

          <S.SummaryCard>
            <S.SummaryIcon $variant="green">
              <FaCircleCheck />
            </S.SummaryIcon>
            <S.SummaryContent>
              <span>양품 생산량</span>
              <strong>{summary.actual.toLocaleString()}</strong>
              <small>누적 양품 수량</small>
            </S.SummaryContent>
          </S.SummaryCard>

          <S.SummaryCard>
            <S.SummaryIcon $variant="orange">
              <FaTriangleExclamation />
            </S.SummaryIcon>
            <S.SummaryContent>
              <span>불량 수량</span>
              <strong>{summary.defect.toLocaleString()}</strong>
              <small>누적 불량 수량</small>
            </S.SummaryContent>
          </S.SummaryCard>

          <S.SummaryCard>
            <S.SummaryIcon $variant="green">
              <FaChartLine />
            </S.SummaryIcon>
            <S.SummaryContent>
              <span>전체 공정 수율</span>
              <strong>{summary.yieldRate.toFixed(1)}%</strong>
              <small>양품 / 전체 생산량</small>
            </S.SummaryContent>
          </S.SummaryCard>
        </S.SummaryGrid>

        <S.AchievementCard>
          <S.AchievementHeader>
            <div>
              <S.AchievementTitle>
                <FaBullseye />
                목표 생산 달성률
              </S.AchievementTitle>

              <S.AchievementDescription>
                전체 목표 생산량 대비 실제 양품 생산량
              </S.AchievementDescription>
            </div>

            <S.AchievementValue>
              {summary.achievementRate.toFixed(1)}%
            </S.AchievementValue>
          </S.AchievementHeader>

          <S.ProgressTrack>
            <S.ProgressFill $width={summary.achievementRate} $tone="blue" />
          </S.ProgressTrack>

          <S.ProgressFooter>
            <span>0%</span>
            <span>
              {summary.actual.toLocaleString()} /{" "}
              {summary.target.toLocaleString()} EA
            </span>
            <span>100%</span>
          </S.ProgressFooter>
        </S.AchievementCard>

        <S.ContentGrid>
          <S.Panel>
            <S.PanelHeader>
              <S.PanelHeading>
                <S.PanelIcon>
                  <FaCirclePlus />
                </S.PanelIcon>

                <div>
                  <S.PanelTitle>생산 실적 등록</S.PanelTitle>
                  <S.PanelDescription>
                    라인별 생산량과 불량 수량을 입력합니다.
                  </S.PanelDescription>
                </div>
              </S.PanelHeading>
            </S.PanelHeader>

            <S.Form onSubmit={handleSubmit}>
              <S.FormGroup>
                <S.Label htmlFor="lineName">
                  생산 라인명 <S.Required>*</S.Required>
                </S.Label>

                <S.InputWrapper>
                  <FaIndustry />
                  <S.Input
                    id="lineName"
                    name="lineName"
                    placeholder="예: LINE-A"
                    value={form.lineName}
                    onChange={handleChange}
                    required
                  />
                </S.InputWrapper>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="targetCount">
                  목표 생산량 <S.Required>*</S.Required>
                </S.Label>

                <S.InputWrapper>
                  <FaBullseye />
                  <S.Input
                    id="targetCount"
                    name="targetCount"
                    type="number"
                    min="1"
                    step="1"
                    value={form.targetCount}
                    onChange={handleChange}
                    required
                  />
                </S.InputWrapper>
              </S.FormGroup>

              <S.NumberGrid>
                <S.FormGroup>
                  <S.Label htmlFor="actualCount">
                    양품 생산량 <S.Required>*</S.Required>
                  </S.Label>

                  <S.InputWrapper>
                    <FaCircleCheck />
                    <S.Input
                      id="actualCount"
                      name="actualCount"
                      type="number"
                      min="0"
                      step="1"
                      value={form.actualCount}
                      onChange={handleChange}
                      required
                    />
                  </S.InputWrapper>
                </S.FormGroup>

                <S.FormGroup>
                  <S.Label htmlFor="defectCount">
                    불량 수량 <S.Required>*</S.Required>
                  </S.Label>

                  <S.InputWrapper>
                    <FaTriangleExclamation />
                    <S.Input
                      id="defectCount"
                      name="defectCount"
                      type="number"
                      min="0"
                      step="1"
                      value={form.defectCount}
                      onChange={handleChange}
                      required
                    />
                  </S.InputWrapper>
                </S.FormGroup>
              </S.NumberGrid>

              <S.FormPreview>
                <span>예상 공정 수율</span>
                <strong>{previewYield.toFixed(1)}%</strong>
              </S.FormPreview>

              {notice && (
                <S.Notice $type={notice.type}>{notice.message}</S.Notice>
              )}

              <S.FormFooter>
                <S.FormHint>
                  <S.Required>*</S.Required> 필수 입력 항목
                </S.FormHint>

                <S.SubmitButton type="submit" disabled={isSubmitting}>
                  <FaCirclePlus />
                  {isSubmitting ? "등록 중..." : "생산 실적 등록하기"}
                </S.SubmitButton>
              </S.FormFooter>
            </S.Form>
          </S.Panel>

          <S.Panel>
            <S.PanelHeader>
              <S.PanelHeading>
                <S.PanelIcon>
                  <FaClipboardList />
                </S.PanelIcon>

                <div>
                  <S.PanelTitle>생산 라인별 수율 분석</S.PanelTitle>
                  <S.PanelDescription>
                    생산 실적과 공정 수율을 확인합니다.
                  </S.PanelDescription>
                </div>
              </S.PanelHeading>

              <S.ItemCount>{records.length}건</S.ItemCount>
            </S.PanelHeader>

            <S.ListToolbar>
              <S.SearchWrapper>
                <FaMagnifyingGlass />
                <S.SearchInput
                  placeholder="생산 라인명 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </S.SearchWrapper>

              <S.FilterSelect
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterType)}
              >
                <option value="ALL">전체 수율</option>
                <option value="HIGH">95% 이상</option>
                <option value="LOW">95% 미만</option>
              </S.FilterSelect>
            </S.ListToolbar>

            <S.RecordList>
              {isLoading ? (
                <S.EmptyState>
                  <FaArrowRotateRight />
                  <strong>데이터를 불러오는 중...</strong>
                </S.EmptyState>
              ) : isError ? (
                <S.EmptyState>
                  <FaTriangleExclamation />
                  <strong>{error instanceof Error ? error.message : "에러가 발생했습니다."}</strong>

                  <S.RetryButton
                    type="button"
                    onClick={() => void refetch}
                  >
                    다시 시도
                  </S.RetryButton>
                </S.EmptyState>
              ) : filteredRecords.length === 0 ? (
                <S.EmptyState>
                  <FaIndustry />
                  <strong>
                    {searchTerm || filter !== "ALL"
                      ? "검색 결과가 없습니다."
                      : "등록된 생산 실적이 없습니다."}
                  </strong>
                </S.EmptyState>
              ) : (
                filteredRecords.map((item, index) => {
                  const rate = getYieldRate(item);
                  const tone = getYieldTone(rate);

                  const achievement =
                    Number(item.targetCount) > 0
                      ? (Number(item.actualCount) / Number(item.targetCount)) *
                        100
                      : 0;

                  return (
                    <S.RecordCard key={item.id}>
                      <S.RecordTop>
                        <S.RecordIdentity>
                          <S.RecordIcon>
                            <FaIndustry />
                          </S.RecordIcon>

                          <div>
                            <S.RecordName>{item.lineName}</S.RecordName>
                            <S.RecordSub>생산 실적 #{item.id}</S.RecordSub>
                          </div>
                        </S.RecordIdentity>

                        <S.YieldBadge $tone={tone}>
                          수율 {rate.toFixed(1)}%
                        </S.YieldBadge>
                      </S.RecordTop>

                      <S.RecordMetrics>
                        <S.RecordMetric>
                          <span>목표 생산량</span>
                          <strong>
                            {Number(item.targetCount).toLocaleString()}
                          </strong>
                        </S.RecordMetric>

                        <S.RecordMetric>
                          <span>양품 생산량</span>
                          <strong>
                            {Number(item.actualCount).toLocaleString()}
                          </strong>
                        </S.RecordMetric>

                        <S.RecordMetric>
                          <span>불량 수량</span>
                          <strong>
                            {Number(item.defectCount).toLocaleString()}
                          </strong>
                        </S.RecordMetric>
                      </S.RecordMetrics>

                      <S.RecordProgressHeader>
                        <span>공정 수율</span>
                        <strong>{rate.toFixed(1)}%</strong>
                      </S.RecordProgressHeader>

                      <S.ProgressTrack>
                        <S.ProgressFill $width={rate} $tone={tone} />
                      </S.ProgressTrack>

                      <S.RecordFooter>
                        <span>목표 달성률</span>
                        <strong>{achievement.toFixed(1)}%</strong>
                      </S.RecordFooter>
                    </S.RecordCard>
                  );
                })
              )}
            </S.RecordList>
          </S.Panel>
        </S.ContentGrid>
      </S.PageContainer>
    </Layout>
  );
}
