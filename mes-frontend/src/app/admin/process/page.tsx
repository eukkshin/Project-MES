"use client";
import React, {  useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  FaArrowRotateRight,
  FaBox,
  FaCheck,
  FaCirclePlus,
  FaGear,
  FaIndustry,
  FaUserGear,
} from "react-icons/fa6";

import * as S from "@/assets/css/admin/Process.styles";
import { Layout } from "@/components/layout/Layout";
import { fetchProcessLines, updateLineStatus, queryClient, createProcessLine } from "@/api/http";
import { useAlertStore } from "@/store/useAlertStore";


interface ProcessLine {
  id?: number;
  lineName: string;
  processType: string;
  status?: string;
  currentProduct: string;
  operator: string;
}

type ProcessForm = Pick<
  ProcessLine,
  "lineName" | "processType" | "currentProduct" | "operator"
>;

const INITIAL_STATE: ProcessForm = {
  lineName: "",
  processType: "",
  currentProduct: "",
  operator: "",
};

export default function ProcessPage() {

  const [form, setForm] = useState<ProcessForm>({...INITIAL_STATE});

  const { showAlert } = useAlertStore();

  const {data: lines=[], isLoading, isError , error, refetch} = useQuery<ProcessLine[]>({
    queryKey: ['process-lines'],
    queryFn: async()=>{
      const payload = await fetchProcessLines();
      if(!payload.success){
        throw new Error("라인 목록을 불러오지 못했습니다.");
      }
      const lineData = payload.line ?? payload.data ?? [];
      return Array.isArray(lineData) ? lineData : [];
    }
  })

  const { mutate, isPending:isSubmitting }=useMutation({
    mutationFn: createProcessLine,
    onSuccess:()=>{
      showAlert("라인공정 등록이 완료되었습니다.", "success");
      queryClient.invalidateQueries({ queryKey: ['process-lines'] });
      setForm({ ...INITIAL_STATE });
    },
    onError:(err)=>{
      console.error("라인공정 등록 오류:", err);
      showAlert("라인공정 등록에 실패했습니다.", "error");
    }
  })

  const handleChange = (field: keyof ProcessForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(form).some((value) => !value.trim())) {
      showAlert("모든 항목을 입력해 주세요.", "info");
      return;
    }

    const formData= {
      lineName: form.lineName.trim(),
      processType: form.processType.trim(),
      currentProduct: form.currentProduct.trim(),
      operator: form.operator.trim(),
    };

    mutate(formData);
  };

  const summary = useMemo(() => {
    //의존성 배열에 lines (lines 참조값 변경시 useMemo 실행)
    const running = lines.filter(
      (line) => line.status?.toUpperCase() === "RUNNING",
    ).length;

    const stopped = lines.filter(
      (line) => line.status?.toUpperCase() === "STOPPED",
    ).length;

    return {
      total: lines.length,
      running,
      stopped,
    };
  }, [lines]);

  return (
    <Layout>
      <S.PageContainer>
        <S.PageHeader>
          <S.PageHeading>
            <S.Eyebrow>PRODUCTION MANAGEMENT</S.Eyebrow>
            <S.PageTitle>라인공정제어</S.PageTitle>
            <S.PageDescription>
              생산 라인을 등록하고 공정별 가동 현황을 관리합니다.
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
              <span>전체 생산 라인</span>
              <strong>{summary.total}</strong>
              <small>등록된 라인 수</small>
            </S.SummaryContent>
          </S.SummaryCard>

          <S.SummaryCard>
            <S.SummaryIcon $variant="green">
              <FaCheck />
            </S.SummaryIcon>
            <S.SummaryContent>
              <span>가동 중</span>
              <strong>{summary.running}</strong>
              <small>RUNNING</small>
            </S.SummaryContent>
          </S.SummaryCard>

          <S.SummaryCard>
            <S.SummaryIcon $variant="orange">
              <FaGear />
            </S.SummaryIcon>
            <S.SummaryContent>
              <span>가동 중지</span>
              <strong>{summary.stopped}</strong>
              <small>STOPPED</small>
            </S.SummaryContent>
          </S.SummaryCard>
        </S.SummaryGrid>

        <S.ContentGrid>
          <S.Panel>
            <S.PanelHeader>
              <S.PanelHeading>
                <S.PanelIcon>
                  <FaCirclePlus />
                </S.PanelIcon>

                <div>
                  <S.PanelTitle>라인공정 등록</S.PanelTitle>
                  <S.PanelDescription>
                    새로운 생산 라인을 등록합니다.
                  </S.PanelDescription>
                </div>
              </S.PanelHeading>
            </S.PanelHeader>

            <S.Form onSubmit={handleSubmit}>
              <S.FormGroup>
                <S.Label htmlFor="lineName">
                  라인명 <S.Required>*</S.Required>
                </S.Label>
                <S.InputWrapper>
                  <FaIndustry />
                  <S.Input
                    id="lineName"
                    type="text"
                    placeholder="예: 생산라인 A-01"
                    value={form.lineName}
                    onChange={(e) => handleChange("lineName", e.target.value)}
                    required
                  />
                </S.InputWrapper>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="processType">
                  공정 타입 <S.Required>*</S.Required>
                </S.Label>
                <S.InputWrapper>
                  <FaGear />
                  <S.Input
                    id="processType"
                    type="text"
                    placeholder="예: 조립 공정"
                    value={form.processType}
                    onChange={(e) =>
                      handleChange("processType", e.target.value)
                    }
                    required
                  />
                </S.InputWrapper>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="currentProduct">
                  생산 모델 <S.Required>*</S.Required>
                </S.Label>
                <S.InputWrapper>
                  <FaBox />
                  <S.Input
                    id="currentProduct"
                    type="text"
                    placeholder="예: MODEL-A100"
                    value={form.currentProduct}
                    onChange={(e) =>
                      handleChange("currentProduct", e.target.value)
                    }
                    required
                  />
                </S.InputWrapper>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="operator">
                  담당 운영자 <S.Required>*</S.Required>
                </S.Label>
                <S.InputWrapper>
                  <FaUserGear />
                  <S.Input
                    id="operator"
                    type="text"
                    placeholder="담당자 이름을 입력하세요"
                    value={form.operator}
                    onChange={(e) => handleChange("operator", e.target.value)}
                    required
                  />
                </S.InputWrapper>
              </S.FormGroup>

              <S.FormFooter>
                <S.FormHint>
                  <S.Required>*</S.Required> 필수 입력 항목
                </S.FormHint>

                <S.SubmitButton type="submit" disabled={isSubmitting}>
                  <FaCirclePlus />
                  {isSubmitting ? "등록 중..." : "라인 등록하기"}
                </S.SubmitButton>
              </S.FormFooter>
            </S.Form>
          </S.Panel>

          <S.Panel>
            <S.PanelHeader>
              <S.PanelHeading>
                <S.PanelIcon>
                  <FaIndustry />
                </S.PanelIcon>

                <div>
                  <S.PanelTitle>라인 가동 현황</S.PanelTitle>
                  <S.PanelDescription>
                    등록된 생산 라인의 현재 상태를 확인합니다.
                  </S.PanelDescription>
                </div>
              </S.PanelHeading>

              <S.LineCount>{lines.length}개 라인</S.LineCount>
            </S.PanelHeader>

            <S.LineList>
              {isLoading ? (
                <S.EmptyState>
                  <FaArrowRotateRight />
                  <strong>라인 정보를 불러오는 중입니다.</strong>
                </S.EmptyState>
              ) : isError ? (
                <S.EmptyState>
                  <FaIndustry />
                  <strong>{error instanceof Error ? error.message : '라인 정보를 불러오는 데 실패했습니다.'}</strong>
                  <S.RetryButton
                    type="button"
                    onClick={() => void refetch()}
                  >
                    다시 시도
                  </S.RetryButton>
                </S.EmptyState>
              ) : lines.length === 0 ? (
                <S.EmptyState>
                  <FaIndustry />
                  <strong>등록된 공정 라인이 없습니다.</strong>
                  <span>왼쪽 등록 양식에서 새로운 라인을 추가해 주세요.</span>
                </S.EmptyState>
              ) : (
                lines.map((line, index) => {
                  const status = line.status?.toUpperCase();

                  const isRunning = status === "RUNNING";
                  const isStopped = status === "STOPPED";

                  return (
                    <S.LineCard key={line.id ?? index}>
                      <S.LineCardTop>
                        <S.LineIdentity>
                          <S.LineIcon>
                            <FaIndustry />
                          </S.LineIcon>

                          <div>
                            <S.LineName>{line.lineName}</S.LineName>
                            <S.LineType>{line.processType}</S.LineType>
                          </div>
                        </S.LineIdentity>

                        <S.StatusBadge
                          $status={
                            isRunning
                              ? "running"
                              : isStopped
                                ? "stopped"
                                : "unknown"
                          }
                        >
                          <S.StatusDot />
                          {isRunning
                            ? "가동 중"
                            : isStopped
                              ? "가동 중지"
                              : line.status || "상태 미확인"}
                        </S.StatusBadge>
                      </S.LineCardTop>

                      <S.LineCardBottom>
                        <S.LineDetail>
                          <FaBox />
                          <span>생산 모델</span>
                          <strong>{line.currentProduct || "-"}</strong>
                        </S.LineDetail>

                        <S.LineDetail>
                          <FaUserGear />
                          <span>담당 운영자</span>
                          <strong>{line.operator || "-"}</strong>
                        </S.LineDetail>
                      </S.LineCardBottom>
                    </S.LineCard>
                  );
                })
              )}
            </S.LineList>
          </S.Panel>
        </S.ContentGrid>
      </S.PageContainer>

    </Layout>
  );
}
