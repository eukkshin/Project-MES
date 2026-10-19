"use client";

import axios from "axios";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  FaArrowRotateRight,
  FaBarcode,
  FaCamera,
  FaChartPie,
  FaCircleCheck,
  FaCirclePlus,
  FaCircleXmark,
  FaClipboardCheck,
  FaClipboardList,
  FaMagnifyingGlass,
  FaMicrochip,
  FaRobot,
  FaTriangleExclamation,
} from "react-icons/fa6";

import * as S from "@/assets/css/admin/Quality.styles";
import { Layout } from "@/components/layout/Layout";
import AlertModal from "@/components/modal/AlertModal";

interface InspectionItem {
  id: number;
  serialNumber: string;
  inspectionType: string;
  defectReason: string | null;
  inspector: string;
  result: string;
}

interface InspectionForm {
  serialNumber: string;
  inspectionType: string;
  defectReason: string;
  inspector: string;
  result: string;
}

interface InspectionResponse {
  success: boolean;
  inspections?: InspectionItem[];
  data?: InspectionItem[];
}

const initialForm: InspectionForm = {
  serialNumber: "",
  inspectionType: "VISION_SCRATCH",
  result: "PASS",
  defectReason: "",
  inspector: "AI-VISION-Unit-01",
};

const API_URL = "http://localhost:4000/api/quality/inspections";

const inspectionTypeLabel = (type: string) => {
  switch (type) {
    case "VISION_SCRATCH":
      return "미세 스크래치 비전 검사";
    case "WATERPROOF_TEST":
      return "방수 씰링 기밀 검사";
    default:
      return type;
  }
};

export default function QualityPage() {
  const [inspections, setInspections] = useState<InspectionItem[]>([]);
  const [form, setForm] = useState<InspectionForm>({ ...initialForm });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch] = useState("");
  const [resultFilter, setResultFilter] = useState("ALL");

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

  const fetchInspections = useCallback(async () => {
    setLoading(true);
    setFetchError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("인증 토큰이 없습니다.");
      }

      const response = await axios.get<InspectionResponse>(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.success) {
        throw new Error("검사 이력 조회에 실패했습니다.");
      }

      const data = response.data.inspections ?? response.data.data ?? [];

      setInspections(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("품질 검사 조회 오류:", error);
      setFetchError("검사 이력을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchInspections();
  }, [fetchInspections]);

  const handleChange = <K extends keyof InspectionForm>(
    field: K,
    value: InspectionForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitting) return;

    if (!form.serialNumber.trim()) {
      showAlert("기기 시리얼 번호를 입력해 주세요.", "info");
      return;
    }

    if (!form.inspector.trim()) {
      showAlert("검사 장비 또는 검사자를 입력해 주세요.", "info");
      return;
    }

    if (form.result === "FAIL" && !form.defectReason.trim()) {
      showAlert("불량 판정 시 불량 사유를 입력해 주세요.", "info");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("인증 토큰이 없습니다.");
      }

      await axios.post(
        API_URL,
        {
          serialNumber: form.serialNumber.trim(),
          inspectionType: form.inspectionType,
          result: form.result,
          defectReason: form.result === "FAIL" ? form.defectReason.trim() : "",
          inspector: form.inspector.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setForm({ ...initialForm });
      showAlert("검사 결과가 등록되었습니다.", "success");

      await fetchInspections();
    } catch (error) {
      console.error("품질 검사 등록 오류:", error);
      showAlert("검사 결과 등록에 실패했습니다.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const summary = useMemo(() => {
    const total = inspections.length;
    const pass = inspections.filter((item) => item.result === "PASS").length;
    const fail = inspections.filter((item) => item.result === "FAIL").length;

    return {
      total,
      pass,
      fail,
      passRate: total > 0 ? ((pass / total) * 100).toFixed(1) : "0.0",
    };
  }, [inspections]);

  const filteredInspections = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return inspections.filter((item) => {
      const matchesSearch =
        !keyword ||
        [
          item.serialNumber,
          item.inspectionType,
          inspectionTypeLabel(item.inspectionType),
          item.inspector,
          item.defectReason,
        ].some((value) => (value ?? "").toLowerCase().includes(keyword));

      const matchesResult =
        resultFilter === "ALL" || item.result === resultFilter;

      return matchesSearch && matchesResult;
    });
  }, [inspections, search, resultFilter]);

  return (
    <Layout>
      <S.PageContainer>
        <S.PageHeader>
          <S.PageHeading>
            <S.Eyebrow>QUALITY MANAGEMENT SYSTEM</S.Eyebrow>
            <S.PageTitle>AI 비전 품질 검사</S.PageTitle>
            <S.PageDescription>
              AI 비전 검사 결과를 등록하고 제품별 품질 판정 및 불량 이력을
              모니터링합니다.
            </S.PageDescription>
          </S.PageHeading>

          <S.RefreshButton
            type="button"
            onClick={() => void fetchInspections()}
            disabled={loading}
          >
            <FaArrowRotateRight />
            {loading ? "조회 중..." : "새로고침"}
          </S.RefreshButton>
        </S.PageHeader>

        <S.SummaryGrid>
          <S.SummaryCard>
            <S.SummaryIcon $variant="blue">
              <FaClipboardCheck />
            </S.SummaryIcon>
            <S.SummaryContent>
              <span>전체 검사</span>
              <strong>{summary.total.toLocaleString()}</strong>
              <small>누적 검사 건수</small>
            </S.SummaryContent>
          </S.SummaryCard>

          <S.SummaryCard>
            <S.SummaryIcon $variant="green">
              <FaCircleCheck />
            </S.SummaryIcon>
            <S.SummaryContent>
              <span>양품 판정</span>
              <strong>{summary.pass.toLocaleString()}</strong>
              <small>PASS 검사 건수</small>
            </S.SummaryContent>
          </S.SummaryCard>

          <S.SummaryCard>
            <S.SummaryIcon $variant="orange">
              <FaCircleXmark />
            </S.SummaryIcon>
            <S.SummaryContent>
              <span>불량 판정</span>
              <strong>{summary.fail.toLocaleString()}</strong>
              <small>FAIL 검사 건수</small>
            </S.SummaryContent>
          </S.SummaryCard>
        </S.SummaryGrid>

        <S.PassRateCard>
          <S.PassRateHeader>
            <S.PassRateInfo>
              <S.PassRateTitle>전체 검사 합격률</S.PassRateTitle>
              <S.PassRateDescription>
                전체 검사 대비 양품 판정 비율
              </S.PassRateDescription>
            </S.PassRateInfo>

            <S.PassRateValue>{summary.passRate}%</S.PassRateValue>
          </S.PassRateHeader>

          <S.PassRateTrack
            role="progressbar"
            aria-label="전체 검사 합격률"
            aria-valuenow={Number(summary.passRate)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <S.PassRateFill $width={Number(summary.passRate)} />
          </S.PassRateTrack>

          <S.PassRateFooter>
            <span>0%</span>
            <span>100%</span>
          </S.PassRateFooter>
        </S.PassRateCard>

        <S.ContentGrid>
          <S.Panel>
            <S.PanelHeader>
              <S.PanelHeading>
                <S.PanelIcon>
                  <FaCirclePlus />
                </S.PanelIcon>
                <div>
                  <S.PanelTitle>AI 비전 검사 등록</S.PanelTitle>
                  <S.PanelDescription>
                    제품의 검사 정보와 판정 결과를 등록합니다.
                  </S.PanelDescription>
                </div>
              </S.PanelHeading>
            </S.PanelHeader>

            <S.Form onSubmit={handleSubmit}>
              <S.FormGroup>
                <S.Label htmlFor="serialNumber">
                  기기 시리얼 번호 <S.Required>*</S.Required>
                </S.Label>
                <S.InputWrapper>
                  <FaBarcode />
                  <S.Input
                    id="serialNumber"
                    type="text"
                    placeholder="예: SN-2026-0001"
                    value={form.serialNumber}
                    onChange={(e) =>
                      handleChange("serialNumber", e.target.value)
                    }
                    required
                  />
                </S.InputWrapper>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="inspectionType">
                  검사 유형 <S.Required>*</S.Required>
                </S.Label>
                <S.InputWrapper>
                  <FaCamera />
                  <S.Select
                    id="inspectionType"
                    value={form.inspectionType}
                    onChange={(e) =>
                      handleChange("inspectionType", e.target.value)
                    }
                  >
                    <option value="VISION_SCRATCH">
                      미세 스크래치 비전 검사
                    </option>
                    <option value="WATERPROOF_TEST">방수 씰링 기밀 검사</option>
                  </S.Select>
                </S.InputWrapper>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="inspector">
                  검사 장비 / 검사자 <S.Required>*</S.Required>
                </S.Label>
                <S.InputWrapper>
                  <FaRobot />
                  <S.Input
                    id="inspector"
                    type="text"
                    placeholder="검사 장비 또는 검사자"
                    value={form.inspector}
                    onChange={(e) => handleChange("inspector", e.target.value)}
                    required
                  />
                </S.InputWrapper>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="result">
                  검사 판정 <S.Required>*</S.Required>
                </S.Label>
                <S.ResultSelectGrid>
                  <S.ResultOption $selected={form.result === "PASS"} $isPass>
                    <input
                      type="radio"
                      name="result"
                      value="PASS"
                      checked={form.result === "PASS"}
                      onChange={() => handleChange("result", "PASS")}
                    />
                    <FaCircleCheck />
                    PASS (양품)
                  </S.ResultOption>

                  <S.ResultOption
                    $selected={form.result === "FAIL"}
                    $isPass={false}
                  >
                    <input
                      type="radio"
                      name="result"
                      value="FAIL"
                      checked={form.result === "FAIL"}
                      onChange={() => handleChange("result", "FAIL")}
                    />
                    <FaCircleXmark />
                    FAIL (불량)
                  </S.ResultOption>
                </S.ResultSelectGrid>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="defectReason">
                  불량 사유
                  {form.result === "FAIL" && (
                    <>
                      {" "}
                      <S.Required>*</S.Required>
                    </>
                  )}
                </S.Label>
                <S.InputWrapper>
                  <FaTriangleExclamation />
                  <S.Input
                    id="defectReason"
                    type="text"
                    placeholder={
                      form.result === "FAIL"
                        ? "불량 사유를 입력해 주세요."
                        : "양품 판정 시 입력하지 않아도 됩니다."
                    }
                    value={form.defectReason}
                    onChange={(e) =>
                      handleChange("defectReason", e.target.value)
                    }
                    disabled={form.result === "PASS"}
                    required={form.result === "FAIL"}
                  />
                </S.InputWrapper>
              </S.FormGroup>

              <S.FormFooter>
                <S.FormHint>
                  <S.Required>*</S.Required> 필수 입력 항목
                </S.FormHint>
                <S.SubmitButton type="submit" disabled={submitting}>
                  <FaCirclePlus />
                  {submitting ? "전송 중..." : "검사 결과 등록하기"}
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
                  <S.PanelTitle>비전 검사 이력 현황</S.PanelTitle>
                  <S.PanelDescription>
                    제품별 검사 유형과 품질 판정 결과를 확인합니다.
                  </S.PanelDescription>
                </div>
              </S.PanelHeading>

              <S.ItemCount>{inspections.length}건 검사</S.ItemCount>
            </S.PanelHeader>

            <S.ListToolbar>
              <S.SearchWrapper>
                <FaMagnifyingGlass />
                <S.SearchInput
                  type="search"
                  placeholder="시리얼 번호, 검사 유형, 검사자 검색"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </S.SearchWrapper>

              <S.FilterSelect
                aria-label="검사 결과 필터"
                value={resultFilter}
                onChange={(e) => setResultFilter(e.target.value)}
              >
                <option value="ALL">전체 판정</option>
                <option value="PASS">PASS</option>
                <option value="FAIL">FAIL</option>
              </S.FilterSelect>

              <S.ResultCount>
                검색 결과 {filteredInspections.length}건
              </S.ResultCount>
            </S.ListToolbar>

            <S.InspectionList>
              {loading ? (
                <S.EmptyState>
                  <FaArrowRotateRight />
                  <strong>검사 이력을 불러오는 중입니다.</strong>
                </S.EmptyState>
              ) : fetchError ? (
                <S.EmptyState>
                  <FaTriangleExclamation />
                  <strong>{fetchError}</strong>
                  <S.RetryButton
                    type="button"
                    onClick={() => void fetchInspections()}
                  >
                    다시 시도
                  </S.RetryButton>
                </S.EmptyState>
              ) : filteredInspections.length === 0 ? (
                <S.EmptyState>
                  <FaClipboardList />
                  <strong>
                    {search || resultFilter !== "ALL"
                      ? "검색 결과가 없습니다."
                      : "등록된 검사 이력이 없습니다."}
                  </strong>
                  <span>
                    {search || resultFilter !== "ALL"
                      ? "검색어나 판정 필터를 변경해 주세요."
                      : "왼쪽 등록 양식에서 검사 결과를 추가해 주세요."}
                  </span>
                </S.EmptyState>
              ) : (
                filteredInspections.map((item) => {
                  const isPass = item.result === "PASS";

                  return (
                    <S.InspectionCard key={item.id}>
                      <S.InspectionCardTop>
                        <S.InspectionIdentity>
                          <S.InspectionIcon>
                            <FaMicrochip />
                          </S.InspectionIcon>
                          <div>
                            <S.InspectionName>
                              {item.serialNumber}
                            </S.InspectionName>
                            <S.InspectionCategory>
                              {inspectionTypeLabel(item.inspectionType)}
                            </S.InspectionCategory>
                          </div>
                        </S.InspectionIdentity>

                        <S.StatusBadge $isPass={isPass}>
                          <S.StatusDot />
                          {item.result}
                        </S.StatusBadge>
                      </S.InspectionCardTop>

                      <S.InspectionDetail $isPass={isPass}>
                        <S.DetailHeading>
                          <span>품질 검사 판정</span>
                          {isPass ? <FaCircleCheck /> : <FaCircleXmark />}
                        </S.DetailHeading>
                        <S.DetailValue $isPass={isPass}>
                          {isPass ? "양품 판정" : "불량 판정"}
                        </S.DetailValue>
                        <S.DetailMessage>
                          {isPass
                            ? "품질 검사 기준을 충족했습니다."
                            : item.defectReason?.trim() ||
                              "불량 사유가 등록되지 않았습니다."}
                        </S.DetailMessage>
                      </S.InspectionDetail>

                      <S.InspectionCardFooter>
                        <FaRobot />
                        <span>검사 장비 / 검사자</span>
                        <strong>{item.inspector || "-"}</strong>
                      </S.InspectionCardFooter>
                    </S.InspectionCard>
                  );
                })
              )}
            </S.InspectionList>
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
