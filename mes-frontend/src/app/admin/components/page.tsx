"use client";

import axios from "axios";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  FaArrowRotateRight,
  FaBoxesStacked,
  FaBoxOpen,
  FaBuilding,
  FaCircleCheck,
  FaCirclePlus,
  FaCube,
  FaMagnifyingGlass,
  FaTag,
  FaTriangleExclamation,
  FaWarehouse,
} from "react-icons/fa6";

import * as S from "@/assets/css/admin/Scm.styles";
import { Layout } from "@/components/layout/Layout";
import AlertModal from "@/components/modal/AlertModal";

interface ComponentItem {
  id: number;
  componentName: string;
  category: string;
  stockQuantity: number;
  minThreshold: number;
  supplier: string;
  status: string;
}

interface ComponentForm {
  componentName: string;
  category: string;
  stockQuantity: number;
  minThreshold: number;
  supplier: string;
}

const initialForm: ComponentForm = {
  componentName: "",
  category: "",
  stockQuantity: 0,
  minThreshold: 100,
  supplier: "",
};

const API_URL = "http://localhost:4000/api/scm/components";

export default function ScmPage() {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [form, setForm] = useState<ComponentForm>(initialForm);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch] = useState("");

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

  const fetchComponents = useCallback(async () => {
    setLoading(true);
    setFetchError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("인증 토큰이 없습니다.");
      }

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.success) {
        throw new Error("부품 목록 조회에 실패했습니다.");
      }

      const data = response.data.components;

      setComponents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("부품 SCM 조회 오류:", error);
      setFetchError("부품 정보를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchComponents();
  }, [fetchComponents]);

  const handleChange = <K extends keyof ComponentForm>(
    field: K,
    value: ComponentForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitting) return;

    if (
      !form.componentName.trim() ||
      !form.category.trim() ||
      !form.supplier.trim()
    ) {
      showAlert("모든 필수 항목을 입력해 주세요.", "info");
      return;
    }

    if (
      !Number.isFinite(form.stockQuantity) ||
      !Number.isFinite(form.minThreshold) ||
      !Number.isInteger(form.stockQuantity) ||
      !Number.isInteger(form.minThreshold) ||
      form.stockQuantity < 0 ||
      form.minThreshold < 0
    ) {
      showAlert("재고 수량은 0 이상의 정수로 입력해 주세요.", "info");
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
          componentName: form.componentName.trim(),
          category: form.category.trim(),
          stockQuantity: form.stockQuantity,
          minThreshold: form.minThreshold,
          supplier: form.supplier.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setForm({ ...initialForm });

      showAlert("부품 SCM 등록이 완료되었습니다.", "success");

      await fetchComponents();
    } catch (error) {
      console.error("부품 SCM 등록 오류:", error);
      showAlert("부품 SCM 등록에 실패했습니다.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const isWarning = (item: ComponentItem) =>
    item.status?.toUpperCase() === "WARNING" ||
    item.stockQuantity < item.minThreshold;

  const summary = useMemo(() => {
    // 의존성 배열에 components (components 참조값 변경시 useMemo 실행)
    const warning = components.filter(isWarning).length;

    return {
      total: components.length,
      normal: components.length - warning,
      warning,
    };
  }, [components]);

  const filteredComponents = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return components;

    return components.filter((item) =>
      [item.componentName, item.category, item.supplier].some((value) =>
        value?.toLowerCase().includes(keyword),
      ),
    );
  }, [components, search]);

  return (
    <Layout>
      <S.PageContainer>
        <S.PageHeader>
          <S.PageHeading>
            <S.Eyebrow>SUPPLY CHAIN MANAGEMENT</S.Eyebrow>
            <S.PageTitle>핵심부품 SCM</S.PageTitle>
            <S.PageDescription>
              핵심 부품의 재고 수량과 안전 재고 기준을 관리하고 공급망 현황을
              모니터링합니다.
            </S.PageDescription>
          </S.PageHeading>

          <S.RefreshButton
            type="button"
            onClick={() => void fetchComponents()}
            disabled={loading}
          >
            <FaArrowRotateRight />
            {loading ? "조회 중..." : "새로고침"}
          </S.RefreshButton>
        </S.PageHeader>

        <S.SummaryGrid>
          <S.SummaryCard>
            <S.SummaryIcon $variant="blue">
              <FaBoxesStacked />
            </S.SummaryIcon>

            <S.SummaryContent>
              <span>전체 등록 부품</span>
              <strong>{summary.total.toLocaleString()}</strong>
              <small>등록된 부품 종류</small>
            </S.SummaryContent>
          </S.SummaryCard>

          <S.SummaryCard>
            <S.SummaryIcon $variant="green">
              <FaCircleCheck />
            </S.SummaryIcon>

            <S.SummaryContent>
              <span>정상 재고</span>
              <strong>{summary.normal.toLocaleString()}</strong>
              <small>안전 재고 기준 충족</small>
            </S.SummaryContent>
          </S.SummaryCard>

          <S.SummaryCard>
            <S.SummaryIcon $variant="orange">
              <FaTriangleExclamation />
            </S.SummaryIcon>

            <S.SummaryContent>
              <span>재고 경고</span>
              <strong>{summary.warning.toLocaleString()}</strong>
              <small>재고 확인 필요</small>
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
                  <S.PanelTitle>부품 SCM 등록</S.PanelTitle>
                  <S.PanelDescription>
                    새로운 부품과 재고 정보를 등록합니다.
                  </S.PanelDescription>
                </div>
              </S.PanelHeading>
            </S.PanelHeader>

            <S.Form onSubmit={handleSubmit}>
              <S.FormGroup>
                <S.Label htmlFor="componentName">
                  부품명 <S.Required>*</S.Required>
                </S.Label>

                <S.InputWrapper>
                  <FaCube />
                  <S.Input
                    id="componentName"
                    type="text"
                    placeholder="예: A19 Pro AP Chip"
                    value={form.componentName}
                    onChange={(e) =>
                      handleChange("componentName", e.target.value)
                    }
                    required
                  />
                </S.InputWrapper>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="category">
                  카테고리 <S.Required>*</S.Required>
                </S.Label>

                <S.InputWrapper>
                  <FaTag />
                  <S.Input
                    id="category"
                    type="text"
                    placeholder="예: CHIP, CAMERA"
                    value={form.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    required
                  />
                </S.InputWrapper>
              </S.FormGroup>

              <S.NumberGrid>
                <S.FormGroup>
                  <S.Label htmlFor="stockQuantity">
                    현재 재고 수량 <S.Required>*</S.Required>
                  </S.Label>

                  <S.InputWrapper>
                    <FaBoxesStacked />
                    <S.Input
                      id="stockQuantity"
                      type="number"
                      min={0}
                      step={1}
                      value={form.stockQuantity}
                      onChange={(e) =>
                        handleChange("stockQuantity", Number(e.target.value))
                      }
                      required
                    />
                  </S.InputWrapper>
                </S.FormGroup>

                <S.FormGroup>
                  <S.Label htmlFor="minThreshold">
                    안전 재고 기준 <S.Required>*</S.Required>
                  </S.Label>

                  <S.InputWrapper>
                    <FaWarehouse />
                    <S.Input
                      id="minThreshold"
                      type="number"
                      min={0}
                      step={1}
                      value={form.minThreshold}
                      onChange={(e) =>
                        handleChange("minThreshold", Number(e.target.value))
                      }
                      required
                    />
                  </S.InputWrapper>
                </S.FormGroup>
              </S.NumberGrid>

              <S.FormGroup>
                <S.Label htmlFor="supplier">
                  협력사 <S.Required>*</S.Required>
                </S.Label>

                <S.InputWrapper>
                  <FaBuilding />
                  <S.Input
                    id="supplier"
                    type="text"
                    placeholder="공급사 또는 협력사 이름"
                    value={form.supplier}
                    onChange={(e) => handleChange("supplier", e.target.value)}
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
                  {submitting ? "등록 중..." : "자재 등록하기"}
                </S.SubmitButton>
              </S.FormFooter>
            </S.Form>
          </S.Panel>

          <S.Panel>
            <S.PanelHeader>
              <S.PanelHeading>
                <S.PanelIcon>
                  <FaWarehouse />
                </S.PanelIcon>

                <div>
                  <S.PanelTitle>핵심부품 공급망 현황</S.PanelTitle>
                  <S.PanelDescription>
                    부품별 재고 상태와 공급사를 확인합니다.
                  </S.PanelDescription>
                </div>
              </S.PanelHeading>

              <S.ItemCount>{components.length}개 부품</S.ItemCount>
            </S.PanelHeader>

            <S.ListToolbar>
              <S.SearchWrapper>
                <FaMagnifyingGlass />
                <S.SearchInput
                  type="search"
                  placeholder="부품명, 카테고리, 공급사 검색"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </S.SearchWrapper>

              <S.ResultCount>
                검색 결과 {filteredComponents.length}건
              </S.ResultCount>
            </S.ListToolbar>

            <S.ComponentList>
              {loading ? (
                <S.EmptyState>
                  <FaArrowRotateRight />
                  <strong>부품 정보를 불러오는 중입니다.</strong>
                </S.EmptyState>
              ) : fetchError ? (
                <S.EmptyState>
                  <FaTriangleExclamation />
                  <strong>{fetchError}</strong>

                  <S.RetryButton
                    type="button"
                    onClick={() => void fetchComponents()}
                  >
                    다시 시도
                  </S.RetryButton>
                </S.EmptyState>
              ) : filteredComponents.length === 0 ? (
                <S.EmptyState>
                  <FaBoxOpen />
                  <strong>
                    {search
                      ? "검색 결과가 없습니다."
                      : "등록된 부품이 없습니다."}
                  </strong>
                  <span>
                    {search
                      ? "다른 검색어를 입력해 주세요."
                      : "왼쪽 등록 양식에서 부품을 추가해 주세요."}
                  </span>
                </S.EmptyState>
              ) : (
                filteredComponents.map((item) => {
                  const warning = isWarning(item);

                  const stockRatio =
                    item.minThreshold > 0
                      ? Math.min(
                          (item.stockQuantity / item.minThreshold) * 100,
                          100,
                        )
                      : 100;

                  return (
                    <S.ComponentCard key={item.id}>
                      <S.ComponentCardTop>
                        <S.ComponentIdentity>
                          <S.ComponentIcon>
                            <FaCube />
                          </S.ComponentIcon>

                          <div>
                            <S.ComponentName>
                              {item.componentName}
                            </S.ComponentName>

                            <S.ComponentCategory>
                              {item.category}
                            </S.ComponentCategory>
                          </div>
                        </S.ComponentIdentity>

                        <S.StatusBadge $warning={warning}>
                          <S.StatusDot />
                          {warning ? "재고 경고" : "정상"}
                        </S.StatusBadge>
                      </S.ComponentCardTop>

                      <S.StockSection>
                        <S.StockHeading>
                          <span>현재 재고 수량</span>
                          <span>
                            안전 기준 {item.minThreshold.toLocaleString()}개
                          </span>
                        </S.StockHeading>

                        <S.StockValue>
                          {item.stockQuantity.toLocaleString()}
                          <span>개</span>
                        </S.StockValue>

                        <S.ProgressTrack>
                          <S.ProgressFill
                            $width={stockRatio}
                            $warning={warning}
                          />
                        </S.ProgressTrack>

                        <S.StockMessage $warning={warning}>
                          {warning
                            ? `안전 재고까지 ${Math.max(
                                item.minThreshold - item.stockQuantity,
                                0,
                              ).toLocaleString()}개 부족합니다.`
                            : "안전 재고 기준을 충족하고 있습니다."}
                        </S.StockMessage>
                      </S.StockSection>

                      <S.ComponentCardFooter>
                        <FaBuilding />
                        <span>공급사</span>
                        <strong>{item.supplier || "-"}</strong>
                      </S.ComponentCardFooter>
                    </S.ComponentCard>
                  );
                })
              )}
            </S.ComponentList>
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
