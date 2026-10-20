"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  FaArrowRotateRight,
  FaCircleCheck,
  FaCirclePlus,
  FaDroplet,
  FaFan,
  FaGaugeHigh,
  FaMagnifyingGlass,
  FaMicrochip,
  FaTemperatureHalf,
  FaTriangleExclamation,
  FaWarehouse,
} from "react-icons/fa6";

import * as S from "@/assets/css/admin/Cleanroom.styles";
import { Layout } from "@/components/layout/Layout";
import AlertModal from "@/ui/modal/AlertModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createEquipment, fetchEquipment, queryClient, updateEquipmentStatus } from "@/api/http";

interface EquipmentItem {
  id: number;
  equipmentName: string;
  cleanroomZone: string;
  temperature: number;
  humidity: number;
  status: string;
}

interface EquipmentForm {
  equipmentName: string;
  cleanroomZone: string;
  temperature: string;
  humidity: string;
}

interface EquipmentResponse {
  success: boolean;
  equipment?: EquipmentItem[];
  equipments?: EquipmentItem[];
  data?: EquipmentItem[];
}

const INITIAL_STATE: EquipmentForm = {
  equipmentName: "",
  cleanroomZone: "Zone A (Class 100)",
  temperature: "22.5",
  humidity: "45.0",
};

const getStatusInfo = (status: string) => {
  switch (status.toUpperCase()) {
    case "NORMAL":
    case "ACTIVE":
    case "RUNNING":
      return { label: "정상 가동", tone: "success" as const };
    case "WARNING":
      return { label: "주의", tone: "warning" as const };
    case "ERROR":
    case "CRITICAL":
    case "STOPPED":
      return { label: "이상 발생", tone: "danger" as const };
    default:
      return { label: status || "상태 미확인", tone: "neutral" as const };
  }
};

export default function CleanroomPage() {

  const [form, setForm] = useState<EquipmentForm>({ ...INITIAL_STATE });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({
    isOpen: false,
    message: "",
    type: "info",
  });

  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<number, string>
  >({});

  const showAlert = (message: string, type: "success" | "error" | "info") => {
    setAlertModal({ isOpen: true, message, type });
  };

  const {data: equipment=[], isLoading, isError, error, refetch } = useQuery<EquipmentItem[]>({
    queryKey: ['equipment'],
    queryFn: async()=>{
      const data = await LoadEquipment();
      return data;
    }
  })

  const {mutate, isPending:isSubmitting} = useMutation({
    mutationFn: createEquipment,
    onSuccess: ()=>{
      showAlert("설비 환경 정보가 등록되었습니다.", "success");
      queryClient.invalidateQueries({queryKey: ['equipment']})
      setForm({...INITIAL_STATE})
    },
    onError: (err)=>{
      console.error("클린룸 설비 등록 오류:", err);
      showAlert("설비 환경 정보 등록에 실패했습니다.", "error");
    }
  })

  const { mutate:updateStatusMutation } = useMutation({
    mutationFn: ({id, nextStatus}:{ id: number; nextStatus: string })=>
      updateEquipmentStatus(id,{status: nextStatus}),
    onSuccess: (_, variables)=>{
      showAlert("설비 상태가 변경되었습니다.", "success");
      queryClient.invalidateQueries({queryKey: ['equipment']})
      
      setSelectedStatuses(prev=>{
        const next = {...prev};
        delete next[variables.id];
        return next;
      })
    },
    onError: (error)=>{
      console.error("설비 상태 변경 오류:", error);
      showAlert("설비 상태 변경에 실패했습니다.", "error");
    },
    onSettled: (_, __, variables)=> {
        setUpdatingId(null);
    },
  })

  const LoadEquipment = async (): Promise<EquipmentItem[]> => {

      const payload = await fetchEquipment();

      if (!Array.isArray(payload) && payload.success === false) {
        throw new Error("설비 조회에 실패했습니다.");
      }

      const data = Array.isArray(payload)
        ? payload
        : (payload.equipment ?? payload.equipments ?? payload.data ?? []);

      if (!Array.isArray(data)) {
        throw new Error("설비 조회 응답 형식이 올바르지 않습니다.");
      }
      return data;
  };


  const handleChange = <K extends keyof EquipmentForm>(
    field: K,
    value: EquipmentForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.equipmentName.trim() || !form.cleanroomZone.trim()) {
      showAlert("설비명과 클린룸 구역을 입력해 주세요.", "info");
      return;
    }

    if (form.temperature.trim() === "" || form.humidity.trim() === "") {
      showAlert("온도와 습도를 입력해 주세요.", "info");
      return;
    }

    const temperature = Number(form.temperature);
    const humidity = Number(form.humidity);

    if (
      !Number.isFinite(temperature) ||
      !Number.isFinite(humidity) ||
      humidity < 0 ||
      humidity > 100
    ) {
      showAlert("온도와 습도 값을 확인해 주세요. 습도는 0~100%입니다.", "info");
      return;
    }
    const formData = {
          equipmentName: form.equipmentName.trim(),
          cleanroomZone: form.cleanroomZone.trim(),
          temperature,
          humidity,
        }
    mutate(formData); //전송
  };

  const summary = useMemo(() => {
    // 의존성 배열에 equipment (equipment 참조값 변경시 useMemo 실행)
    const total = equipment.length;

    const normal = equipment.filter(
      (item) => getStatusInfo(item.status).tone === "success",
    ).length;

    const abnormal = equipment.filter((item) =>
      ["warning", "danger"].includes(getStatusInfo(item.status).tone),
    ).length;

    const avgTemperature = total
      ? equipment.reduce((sum, item) => sum + Number(item.temperature), 0) /
        total
      : 0;

    const avgHumidity = total
      ? equipment.reduce((sum, item) => sum + Number(item.humidity), 0) / total
      : 0;

    return {
      total,
      normal,
      abnormal,
      avgTemperature: avgTemperature.toFixed(1),
      avgHumidity: avgHumidity.toFixed(1),
    };
  }, [equipment]);

  const filteredEquipment = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return equipment.filter((item) => {
      const matchesSearch =
        !keyword ||
        [item.equipmentName, item.cleanroomZone].some((value) =>
          (value ?? "").toLowerCase().includes(keyword),
        );

      const tone = getStatusInfo(item.status).tone;

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "NORMAL" && tone === "success") ||
        (statusFilter === "ABNORMAL" &&
          (tone === "warning" || tone === "danger"));

      return matchesSearch && matchesStatus;
    });
  }, [equipment, searchTerm, statusFilter]);

  const handleStatusChange = async (item: EquipmentItem) => {
    const nextStatus = selectedStatuses[item.id] ?? item.status;

    if (nextStatus === item.status || updatingId !== null) return;

    setUpdatingId(item.id);

    updateStatusMutation({id: item.id,nextStatus})
  };

  return (
    <Layout>
      <S.PageContainer>
        <S.PageHeader>
          <S.PageHeading>
            <S.Eyebrow>FACILITY & ENVIRONMENT MANAGEMENT</S.Eyebrow>
            <S.PageTitle>클린룸 및 설비 관제</S.PageTitle>
            <S.PageDescription>
              클린룸 환경 데이터를 등록하고 설비 가동 상태를 관리합니다.
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
              <FaMicrochip />
            </S.SummaryIcon>
            <S.SummaryContent>
              <span>전체 등록 설비</span>
              <strong>{summary.total.toLocaleString()}</strong>
              <small>전체 설비 수</small>
            </S.SummaryContent>
          </S.SummaryCard>

          <S.SummaryCard>
            <S.SummaryIcon $variant="green">
              <FaCircleCheck />
            </S.SummaryIcon>
            <S.SummaryContent>
              <span>정상 가동 설비</span>
              <strong>{summary.normal.toLocaleString()}</strong>
              <small>정상 상태</small>
            </S.SummaryContent>
          </S.SummaryCard>

          <S.SummaryCard>
            <S.SummaryIcon $variant="orange">
              <FaTriangleExclamation />
            </S.SummaryIcon>
            <S.SummaryContent>
              <span>이상 및 주의 설비</span>
              <strong>{summary.abnormal.toLocaleString()}</strong>
              <small>점검 필요</small>
            </S.SummaryContent>
          </S.SummaryCard>

          <S.SummaryCard>
            <S.SummaryIcon $variant="orange">
              <FaTemperatureHalf />
            </S.SummaryIcon>
            <S.SummaryContent>
              <span>평균 클린룸 온도</span>
              <strong>
                {summary.avgTemperature}
                <S.SummaryUnit>℃</S.SummaryUnit>
              </strong>
              <small>설비 온도 평균</small>
            </S.SummaryContent>
          </S.SummaryCard>

          <S.SummaryCard>
            <S.SummaryIcon $variant="blue">
              <FaDroplet />
            </S.SummaryIcon>
            <S.SummaryContent>
              <span>평균 클린룸 습도</span>
              <strong>
                {summary.avgHumidity}
                <S.SummaryUnit>%</S.SummaryUnit>
              </strong>
              <small>설비 습도 평균</small>
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
                  <S.PanelTitle>클린룸 및 설비 등록</S.PanelTitle>
                  <S.PanelDescription>
                    설비의 위치와 환경 측정값을 입력합니다.
                  </S.PanelDescription>
                </div>
              </S.PanelHeading>
            </S.PanelHeader>

            <S.Form onSubmit={handleSubmit}>
              <S.FormGroup>
                <S.Label htmlFor="equipmentName">
                  설비명 <S.Required>*</S.Required>
                </S.Label>
                <S.InputWrapper>
                  <FaMicrochip />
                  <S.Input
                    id="equipmentName"
                    placeholder="예: CNC Machine #3"
                    value={form.equipmentName}
                    onChange={(e) =>
                      handleChange("equipmentName", e.target.value)
                    }
                    required
                  />
                </S.InputWrapper>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="cleanroomZone">
                  클린룸 구역 <S.Required>*</S.Required>
                </S.Label>
                <S.InputWrapper>
                  <FaWarehouse />
                  <S.Input
                    id="cleanroomZone"
                    placeholder="예: CLEANROOM-A"
                    value={form.cleanroomZone}
                    onChange={(e) =>
                      handleChange("cleanroomZone", e.target.value)
                    }
                    required
                  />
                </S.InputWrapper>
              </S.FormGroup>

              <S.NumberGrid>
                <S.FormGroup>
                  <S.Label htmlFor="temperature">
                    온도 (℃) <S.Required>*</S.Required>
                  </S.Label>
                  <S.InputWrapper>
                    <FaTemperatureHalf />
                    <S.Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      placeholder="예: 23.5"
                      value={form.temperature}
                      onChange={(e) =>
                        handleChange("temperature", e.target.value)
                      }
                      required
                    />
                  </S.InputWrapper>
                </S.FormGroup>

                <S.FormGroup>
                  <S.Label htmlFor="humidity">
                    습도 (%) <S.Required>*</S.Required>
                  </S.Label>
                  <S.InputWrapper>
                    <FaDroplet />
                    <S.Input
                      id="humidity"
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      placeholder="예: 45.0"
                      value={form.humidity}
                      onChange={(e) => handleChange("humidity", e.target.value)}
                      required
                    />
                  </S.InputWrapper>
                </S.FormGroup>
              </S.NumberGrid>

              <S.FormFooter>
                <S.FormHint>
                  <S.Required>*</S.Required> 필수 입력 항목
                </S.FormHint>

                <S.SubmitButton type="submit" disabled={isSubmitting}>
                  <FaCirclePlus />
                  {isSubmitting ? "전송 중..." : "설비 상태 등록하기"}
                </S.SubmitButton>
              </S.FormFooter>
            </S.Form>
          </S.Panel>

          <S.Panel>
            <S.PanelHeader>
              <S.PanelHeading>
                <S.PanelIcon>
                  <FaGaugeHigh />
                </S.PanelIcon>
                <div>
                  <S.PanelTitle>클린룸 환경 및 설비 관제</S.PanelTitle>
                  <S.PanelDescription>
                    등록된 설비의 환경 정보와 상태를 확인합니다.
                  </S.PanelDescription>
                </div>
              </S.PanelHeading>

              <S.ItemCount>{equipment.length}개 설비</S.ItemCount>
            </S.PanelHeader>

            <S.ListToolbar>
              <S.SearchWrapper>
                <FaMagnifyingGlass />
                <S.SearchInput
                  type="search"
                  placeholder="설비명 또는 클린룸 구역 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </S.SearchWrapper>

              <S.FilterSelect
                aria-label="설비 상태 필터"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">전체 상태</option>
                <option value="NORMAL">정상</option>
                <option value="ABNORMAL">주의 / 이상</option>
              </S.FilterSelect>

              <S.ResultCount>
                검색 결과 {filteredEquipment.length}건
              </S.ResultCount>
            </S.ListToolbar>

            <S.EquipmentList>
              {isLoading ? (
                <S.EmptyState>
                  <FaArrowRotateRight />
                  <strong>설비 정보를 불러오는 중입니다.</strong>
                </S.EmptyState>
              ) : isError ? (
                <S.EmptyState>
                  <FaTriangleExclamation />
                  <strong>{error instanceof Error ? error.message : "설비 데이터를 불러오지 못했습니다."}</strong>
                  <S.RetryButton
                    type="button"
                    onClick={() => void refetch()}
                  >
                    다시 시도
                  </S.RetryButton>
                </S.EmptyState>
              ) : filteredEquipment.length === 0 ? (
                <S.EmptyState>
                  <FaFan />
                  <strong>
                    {searchTerm || statusFilter !== "ALL"
                      ? "검색 결과가 없습니다."
                      : "등록된 설비가 없습니다."}
                  </strong>
                  <span>
                    {searchTerm || statusFilter !== "ALL"
                      ? "검색어나 상태 필터를 변경해 주세요."
                      : "왼쪽 등록 양식에서 설비를 추가해 주세요."}
                  </span>
                </S.EmptyState>
              ) : (
                filteredEquipment.map((item) => {
                  const status = getStatusInfo(item.status);

                  return (
                    <S.EquipmentCard key={item.id}>
                      <S.EquipmentCardTop>
                        <S.EquipmentIdentity>
                          <S.EquipmentIcon>
                            <FaMicrochip />
                          </S.EquipmentIcon>

                          <div>
                            <S.EquipmentName>
                              {item.equipmentName}
                            </S.EquipmentName>
                            <S.EquipmentZone>
                              <FaWarehouse />
                              {item.cleanroomZone}
                            </S.EquipmentZone>
                          </div>
                        </S.EquipmentIdentity>

                        <S.StatusBadge $tone={status.tone}>
                          <S.StatusDot />
                          {status.label}
                        </S.StatusBadge>
                      </S.EquipmentCardTop>

                      <S.MetricGrid>
                        <S.MetricBox>
                          <S.MetricLabel>
                            <FaTemperatureHalf />
                            현재 온도
                          </S.MetricLabel>
                          <S.MetricValue>
                            {Number(item.temperature).toFixed(1)}
                            <small>℃</small>
                          </S.MetricValue>
                        </S.MetricBox>

                        <S.MetricBox>
                          <S.MetricLabel>
                            <FaDroplet />
                            현재 습도
                          </S.MetricLabel>
                          <S.MetricValue>
                            {Number(item.humidity).toFixed(1)}
                            <small>%</small>
                          </S.MetricValue>
                        </S.MetricBox>
                      </S.MetricGrid>

                      <S.EquipmentCardFooter>
                        <S.StatusControl>
                          <S.StatusControlLabel>
                            <FaGaugeHigh />
                            설비 상태 변경
                          </S.StatusControlLabel>

                          <S.StatusSelect
                            value={selectedStatuses[item.id] ?? item.status}
                            onChange={(e) =>
                              setSelectedStatuses((prev) => ({
                                ...prev,
                                [item.id]: e.target.value,
                              }))
                            }
                            disabled={updatingId !== null}
                          >
                            <option value="NORMAL">정상 가동</option>
                            <option value="WARNING">주의</option>
                            <option value="ERROR">이상 발생</option>
                          </S.StatusSelect>

                          <S.StatusUpdateButton
                            type="button"
                            onClick={() => void handleStatusChange(item)}
                            disabled={
                              updatingId !== null ||
                              (selectedStatuses[item.id] ?? item.status) ===
                                item.status
                            }
                          >
                            {updatingId === item.id ? "변경 중..." : "변경"}
                          </S.StatusUpdateButton>
                        </S.StatusControl>
                      </S.EquipmentCardFooter>
                    </S.EquipmentCard>
                  );
                })
              )}
            </S.EquipmentList>
          </S.Panel>
        </S.ContentGrid>
      </S.PageContainer>

      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() => setAlertModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </Layout>
  );
}
