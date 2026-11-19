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
import {
  useGetEquipment,
  useCreateEquipment,
  useUpdateEquipmentStatus,
} from "@/hooks/useEquipment";

import * as S from "@/assets/css/admin/Cleanroom.styles";
import { Select } from "@/ui/Select/Select";
import { useAlertStore } from "@/store/useAlertStore";
import type { EquipmentItem, EquipmentRequest } from "@/types/mes";


interface EquipmentForm {
  equipmentName: string;
  cleanroomZone: string;
  temperature: string;
  humidity: string;
}

const INITIAL_STATE: EquipmentForm = {
  equipmentName: "",
  cleanroomZone: "Zone A (Class 100)",
  temperature: "22.5",
  humidity: "45.0",
};

const STATUS_OPTIONS = [
  { value: "NORMAL", label: "정상 가동" },
  { value: "WARNING", label: "주의" },
  { value: "ERROR", label: "이상 발생" },
];

export const SELECT_OPTIONS = [
  { label: '전체 상태', value: 'ALL' },
  { label: '정상', value: 'NORMAL' },
  { label: '주의 / 이상', value: 'ABNORMAL' },
];

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

  const showAlert = useAlertStore(state=>state.showAlert);

  const [openSelectId, setOpenSelectId]= useState<string|null>(null);

  const [form, setForm] = useState<EquipmentForm>({ ...INITIAL_STATE });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<number, string>
  >({});

  const {
    data: equipment = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetEquipment();

  const { mutate, isPending: isSubmitting } = useCreateEquipment();

  const { mutate: updateStatusMutate } = useUpdateEquipmentStatus();


  const handleChange = <K extends keyof EquipmentForm>(
    field: K,
    value: EquipmentForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    const formData : EquipmentRequest= {
          equipmentName: form.equipmentName.trim(),
          cleanroomZone: form.cleanroomZone.trim(),
          temperature,
          humidity,
        }

    mutate(formData,{
      onSuccess: () => {
        showAlert("설비 환경 정보가 등록되었습니다.", "success");
        setForm({ ...INITIAL_STATE });
      },
      onError: (err) => {
        console.error("클린룸 설비 등록 오류:", err);
        showAlert("설비 환경 정보 등록에 실패했습니다.", "error");
      },
    }); 
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

  const handleStatusChange = (item: EquipmentItem) => {
    const nextStatus = selectedStatuses[item.id] ?? item.status;

    if (nextStatus === item.status || updatingId !== null) return;

    setUpdatingId(item.id);

    // 사용자가 직접 변경한 설비 상태 기록
    sessionStorage.setItem(
      "mes-manual-equipment-status",
      JSON.stringify({
        id: item.id,
        nextStatus,
      })
    );

    updateStatusMutate(
      {id: item.id,nextStatus},
      {
        onSuccess: (_, variables) => {
          showAlert("설비 상태가 변경되었습니다.", "success");
    
          setSelectedStatuses((prev) => {
            const next = { ...prev };
            delete next[variables.id];
            return next;
          });
        },
        onError: (error) => {
          sessionStorage.removeItem("mes-manual-equipment-status");
          console.error("설비 상태 변경 오류:", error);
          showAlert("설비 상태 변경에 실패했습니다.", "error");
        },
        onSettled: () => {
          setUpdatingId(null);
        },
      }
    )
  };

  return (
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

              <S.FilterWrapper>
                <S.ResultCount>
                  검색 결과 {filteredEquipment.length}건
                </S.ResultCount>
                <Select id="filter" 
                width="100px"
                openSelectId={openSelectId} setOpenSelectId={setOpenSelectId}
                options={SELECT_OPTIONS} value={statusFilter}
                onChange={(newValue:string)=>setStatusFilter(newValue)}
                >
                  <Select.Toggle/>
                  <Select.Menu/>
                </Select>
              </S.FilterWrapper>
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

                          <Select 
                            id={`status-${item.id}`}
                            width="100px"
                            openSelectId={openSelectId} setOpenSelectId={setOpenSelectId}
                            options={STATUS_OPTIONS} value={selectedStatuses[item.id] ?? item.status}
                            onChange={(value) =>
                              setSelectedStatuses((prev) => ({
                                ...prev,
                                [item.id]:value,
                              }))
                            }
                            >
                              <Select.Toggle/>
                              <Select.Menu/>
                            </Select>

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
  );
}
