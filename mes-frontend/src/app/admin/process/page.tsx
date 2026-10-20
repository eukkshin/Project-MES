"use client";

import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import AlertModal from "@/components/modal/AlertModal";

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

const initialForm: ProcessForm = {
  lineName: "",
  processType: "",
  currentProduct: "",
  operator: "",
};

export default function ProcessPage() {
  const [lines, setLines] = useState<ProcessLine[]>([]);
  const [form, setForm] = useState<ProcessForm>(initialForm);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({
    isOpen: false,
    message: "",
    type: "info",
  });

  const showAlert = (message: string, type: "success" | "error" | "info") => {
    setAlertModal({
      isOpen: true,
      message,
      type,
    });
  };

  const fetchLines = useCallback(async () => {
    // 의존성 배열 없으니 처음 마운트할때 함수 생성 후 리렌더링시 참조값 변경 없고 기존 값 재활용
    setLoading(true);
    setFetchError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("인증 토큰이 없습니다.");
      }

      const response = await axios.get(
        "http://localhost:4000/api/process/lines",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.data.success) {
        throw new Error("라인 목록을 불러오지 못했습니다.");
      }

      const lineData = response.data.line;

      setLines(Array.isArray(lineData) ? lineData : []);
    } catch (error) {
      console.error("라인 조회 실패:", error);
      setFetchError("라인 정보를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchLines();
  }, [fetchLines]);

  const handleChange = (field: keyof ProcessForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting) return;

    if (Object.values(form).some((value) => !value.trim())) {
      showAlert("모든 항목을 입력해 주세요.", "info");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("인증 토큰이 없습니다.");
      }

      await axios.post(
        "http://localhost:4000/api/process/lines",
        {
          lineName: form.lineName.trim(),
          processType: form.processType.trim(),
          currentProduct: form.currentProduct.trim(),
          operator: form.operator.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setForm(initialForm);

      showAlert("라인공정 등록이 완료되었습니다.", "success");

      await fetchLines();
    } catch (error) {
      console.error("라인공정 등록 오류:", error);

      showAlert("라인공정 등록에 실패했습니다.", "error");
    } finally {
      setSubmitting(false);
    }
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
            onClick={() => void fetchLines()}
            disabled={loading}
          >
            <FaArrowRotateRight />
            {loading ? "조회 중..." : "새로고침"}
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

                <S.SubmitButton type="submit" disabled={submitting}>
                  <FaCirclePlus />
                  {submitting ? "등록 중..." : "라인 등록하기"}
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
              {loading ? (
                <S.EmptyState>
                  <FaArrowRotateRight />
                  <strong>라인 정보를 불러오는 중입니다.</strong>
                </S.EmptyState>
              ) : fetchError ? (
                <S.EmptyState>
                  <FaIndustry />
                  <strong>{fetchError}</strong>
                  <S.RetryButton
                    type="button"
                    onClick={() => void fetchLines()}
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

      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() =>
          setAlertModal((prev) => ({
            ...prev,
            isOpen: false,
          }))
        }
      />
    </Layout>
  );
}
