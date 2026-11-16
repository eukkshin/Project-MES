"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  FaArrowRight,
  FaArrowRotateRight,
  FaBox,
  FaCheck,
  FaCirclePlus,
  FaClockRotateLeft,
  FaGear,
  FaIndustry,
  FaMagnifyingGlass,
  FaPause,
  FaPlay,
  FaTriangleExclamation,
  FaUserGear,
  FaWrench,
} from "react-icons/fa6";
import type { ProcessLine } from "@/types/process";
import * as S from "@/assets/css/admin/Process.styles";
import { useAlertStore } from "@/store/useAlertStore";
import { useCreateProcessLine, useFetchProcessHistory, useFetchProcessLines, useUpdateLineStatus } from "@/hooks/useMes";
import { useAuthStore } from "@/store/useAuthStore";

interface ProcessForm {
  lineName: string;
  processType: string;
  currentProduct: string;
  operator: string;
}

const INITIAL_STATE: ProcessForm = {
  lineName: "",
  processType: "",
  currentProduct: "",
  operator: "",
};

// 상태별 라벨 및 색상 톤 매핑
const getStatusInfo = (status?: string) => {
  switch ((status || "").toUpperCase()) {
    case "RUNNING":
      return { label: "가동 중", tone: "success" as const };
    case "MAINTENANCE":
      return { label: "점검 중", tone: "warning" as const };
    case "STOP":
    case "STOPPED":
      return { label: "가동 중지", tone: "danger" as const };
    default:
      return { label: status || "상태 미확인", tone: "neutral" as const };
  }
};

export default function ProcessPage() {
  const showAlert = useAlertStore((state) => state.showAlert);

  const role = useAuthStore((state) => state.role);
  const isAdmin = role === "ADMIN";

  // 등록 폼 상태
  const [form, setForm] = useState<ProcessForm>({ ...INITIAL_STATE });

  // 검색 및 필터 상태
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // 현재 상태 변경 중인 라인 ID
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  // 상태 변경 확인 모달 상태
  const [modal, setModal] = useState<{
    isOpen: boolean;
    line: ProcessLine | null;
    targetStatus: "RUNNING" | "MAINTENANCE" | "STOP";
    reason: string;
  }>({
    isOpen: false,
    line: null,
    targetStatus: "RUNNING",
    reason: "",
  });

  const { data: lines = [], isLoading, isError, error, refetch, } 
  = useFetchProcessLines();

  // 상태 변경 이력 목록 조회
  const {
    data: historyList = [],
    isLoading: isHistoryLoading,
    refetch: refetchHistory,
  } = useFetchProcessHistory();

  // 라인 신규 등록 Mutation
  const { mutate: createLineMutation, isPending: isSubmitting } 
  = useCreateProcessLine();

  //상태변경
  const { mutate: updateStatusMutation } = useUpdateLineStatus();
 
  // 폼 입력 핸들러
  const handleChange = (field: keyof ProcessForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 폼 제출
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      !form.lineName.trim() ||
      !form.processType.trim() ||
      !form.currentProduct.trim() ||
      !form.operator.trim()
    ) {
      showAlert("모든 항목을 입력해 주세요.", "info");
      return;
    }

    createLineMutation({
      lineName: form.lineName.trim(),
      processType: form.processType.trim(),
      currentProduct: form.currentProduct.trim(),
      operator: form.operator.trim(),
    },{
      onSuccess:()=>{
         setForm({ ...INITIAL_STATE });
        showAlert("공정 라인이 성공적으로 등록되었습니다.", "success");
      },
      onError:()=>{
            showAlert("공정 라인 등록에 실패했습니다.", "error");
      }
    });
  };

  const handleStatusUpdate = (
    id: number,
    status: "RUNNING" | "MAINTENANCE" | "STOP",
    reason: string,
    closeAfterSuccess = false
  ) => {
    setUpdatingId(id);

    updateStatusMutation({ id, status, reason },
      {
        onSuccess: () => {
          showAlert("공정 상태가 성공적으로 변경되었습니다.", "success");

          if (closeAfterSuccess) {
            closeModal();
          }
        },
        onError: () => {
          showAlert("공정 상태 변경에 실패했습니다.", "error");
        },
        onSettled: () => {
          setUpdatingId(null);
        },
      }
    );
  };

  // 원클릭 즉시 토글 함수 (모달 없이 즉각 정지 ↔ 가동 실행)
  const handleQuickToggle = (line: ProcessLine) => {
    if (updatingId !== null) return;
    const isRunning = (line.status || "").trim().toUpperCase() === "RUNNING";
    const nextStatus = isRunning ? "STOP" : "RUNNING";

    handleStatusUpdate(line.id, nextStatus,isRunning ? "원클릭 긴급 정지" : "원클릭 즉시 가동" )
  };

  // 사유 입력 모달
  const openStatusModal = (
    line: ProcessLine,
    targetStatus: "RUNNING" | "MAINTENANCE" | "STOP"
  ) => {
    if (line.status?.toUpperCase() === targetStatus) return;

    let defaultReason = "정상 가동 시작";
    if (targetStatus === "MAINTENANCE") defaultReason = "정기 설비 점검";
    if (targetStatus === "STOP") defaultReason = "공정 가동 중지";

    setModal({
      isOpen: true,
      line,
      targetStatus,
      reason: defaultReason,
    });
  };

  // 모달 닫기
  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false, line: null }));
  };

  // 모달에서 확인 버튼 클릭
  const handleConfirmStatusChange = () => {
    if (!modal.line) return;

    setUpdatingId(modal.line.id);
    handleStatusUpdate(modal.line.id, modal.targetStatus, modal.reason.trim() || "공정 상태 변경", true)
  };

  // 날짜/시간 포맷
  const formatTime = (dateStr?: string) => {
    if (!dateStr) return "-";
      const d = new Date(dateStr);
     
      if (Number.isNaN(d.getTime())) {
        return dateStr;
      }
      return d.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
   
  };

  // 통계 요약 계산
  const summary = useMemo(() => {
    const total = lines.length;
    const running = lines.filter(
      (l) => l.status?.toUpperCase() === "RUNNING"
    ).length;
    const maintenance = lines.filter(
      (l) => l.status?.toUpperCase() === "MAINTENANCE"
    ).length;
    const stopped = lines.filter((l) => {
      const s = l.status?.toUpperCase();
      return s === "STOP" || s === "STOPPED";
    }).length;

    const rate = total > 0 ? ((running / total) * 100).toFixed(1) : "0.0";

    return { total, running, maintenance, stopped, rate };
  }, [lines]);

  // 검색 및 필터링된 라인 목록
  const filteredLines = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return lines.filter((item) => {
      const matchesSearch =
        !keyword ||
        [item.lineName, item.processType, item.currentProduct, item.operator].some(
          (val) => (val ?? "").toLowerCase().includes(keyword)
        );

      const tone = getStatusInfo(item.status).tone;
      const matchesFilter =
        statusFilter === "ALL" ||
        (statusFilter === "RUNNING" && tone === "success") ||
        (statusFilter === "MAINTENANCE" && tone === "warning") ||
        (statusFilter === "STOP" && tone === "danger");

      return matchesSearch && matchesFilter;
    });
  }, [lines, searchTerm, statusFilter]);

  return (
    <S.PageContainer>
      <S.PageHeader>
        <S.PageHeading>
          <S.Eyebrow>PRODUCTION MANAGEMENT & CONTROL</S.Eyebrow>
          <S.PageTitle>공정 라인 관리 및 관제</S.PageTitle>
          <S.PageDescription>
            생산 공정 라인을 등록하고 가동 상태를 실시간으로 제어합니다.
          </S.PageDescription>
        </S.PageHeading>

        <S.HeaderActions>
          <S.LiveIndicator>
            <S.StatusDot $pulse />
            실시간 관제 중
          </S.LiveIndicator>

          <S.RefreshButton
            type="button"
            onClick={() => {
              void refetch();
              void refetchHistory();
            }}
            disabled={isLoading || isHistoryLoading}
          >
            <FaArrowRotateRight />
            {isLoading || isHistoryLoading ? "동기화 중..." : "새로고침"}
          </S.RefreshButton>
        </S.HeaderActions>
      </S.PageHeader>

      {/* 상단 요약 통계 카드 */}
      <S.SummaryGrid>
        <S.SummaryCard>
          <S.SummaryIcon $variant="blue">
            <FaIndustry />
          </S.SummaryIcon>
          <S.SummaryContent>
            <span>전체 공정 라인</span>
            <strong>{summary.total}</strong>
            <small>등록된 설비 수</small>
          </S.SummaryContent>
        </S.SummaryCard>

        <S.SummaryCard>
          <S.SummaryIcon $variant="green">
            <FaCheck />
          </S.SummaryIcon>
          <S.SummaryContent>
            <span>가동 중 라인</span>
            <strong>{summary.running}</strong>
            <small>가동률 {summary.rate}%</small>
          </S.SummaryContent>
        </S.SummaryCard>

        <S.SummaryCard>
          <S.SummaryIcon $variant="orange">
            <FaWrench />
          </S.SummaryIcon>
          <S.SummaryContent>
            <span>점검 중</span>
            <strong>{summary.maintenance}</strong>
            <small>유지보수 상태</small>
          </S.SummaryContent>
        </S.SummaryCard>

        <S.SummaryCard>
          <S.SummaryIcon $variant="orange">
            <FaPause />
          </S.SummaryIcon>
          <S.SummaryContent>
            <span>가동 중지 라인</span>
            <strong>{summary.stopped}</strong>
            <small>정지 상태</small>
          </S.SummaryContent>
        </S.SummaryCard>
      </S.SummaryGrid>

      {/* 3. 본문 그리드: 신규 등록 폼(좌) + 라인 목록(우) */}
      <S.ContentGrid>
        {/* 라인 신규 등록 패널 */}
        <S.Panel>
          <S.PanelHeader>
            <S.PanelHeading>
              <S.PanelIcon>
                <FaCirclePlus />
              </S.PanelIcon>
              <div>
                <S.PanelTitle>공정 라인 등록</S.PanelTitle>
                <S.PanelDescription>
                  신규 공정 라인 정보를 입력하여 추가합니다.
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
                  placeholder="예: AP SMT Line 1"
                  value={form.lineName}
                  onChange={(e) => handleChange("lineName", e.target.value)}
                  required
                />
              </S.InputWrapper>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="processType">
                공정 구분 <S.Required>*</S.Required>
              </S.Label>
              <S.InputWrapper>
                <FaGear />
                <S.Input
                  id="processType"
                  placeholder="예: SMT / 조립 / 정밀가공"
                  value={form.processType}
                  onChange={(e) => handleChange("processType", e.target.value)}
                  required
                />
              </S.InputWrapper>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="currentProduct">
                생산 모델명 <S.Required>*</S.Required>
              </S.Label>
              <S.InputWrapper>
                <FaBox />
                <S.Input
                  id="currentProduct"
                  placeholder="예: Titan-Chip Pro 5"
                  value={form.currentProduct}
                  onChange={(e) => handleChange("currentProduct", e.target.value)}
                  required
                />
              </S.InputWrapper>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="operator">
                담당자 <S.Required>*</S.Required>
              </S.Label>
              <S.InputWrapper>
                <FaUserGear />
                <S.Input
                  id="operator"
                  placeholder="담당 관리자 성명"
                  value={form.operator}
                  onChange={(e) => handleChange("operator", e.target.value)}
                  required
                />
              </S.InputWrapper>
            </S.FormGroup>

            <S.FormFooter>
              <S.FormHint>
                <S.Required>*</S.Required> 필수 입력 항목 (등록 시 기본 가동)
              </S.FormHint>

              <S.SubmitButton type="submit" disabled={isSubmitting}>
                <FaCirclePlus />
                {isSubmitting ? "등록 중..." : "라인 등록하기"}
              </S.SubmitButton>
            </S.FormFooter>
          </S.Form>
        </S.Panel>

        {/* 라인 목록 및 상태 제어 패널 */}
        <S.Panel>
          <S.PanelHeader>
            <S.PanelHeading>
              <S.PanelIcon>
                <FaIndustry />
              </S.PanelIcon>
              <div>
                <S.PanelTitle>공정 라인 상태 제어</S.PanelTitle>
                <S.PanelDescription>
                  등록된 라인의 가동 상태를 확인하고 즉시 변경합니다.
                </S.PanelDescription>
              </div>
            </S.PanelHeading>

            <S.ItemCount>{lines.length}개 라인</S.ItemCount>
          </S.PanelHeader>

          {/* 툴바 (검색창 + 필터) */}
          <S.ListToolbar>
            <S.SearchWrapper>
              <FaMagnifyingGlass />
              <S.SearchInput
                type="search"
                placeholder="라인명, 공정, 모델명 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </S.SearchWrapper>

            <S.FilterWrapper>
              <S.ResultCount>
                검색 결과 {filteredLines.length}건
              </S.ResultCount>

              <S.FilterSelect
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">전체 상태</option>
                <option value="RUNNING">가동 중</option>
                <option value="MAINTENANCE">점검 중</option>
                <option value="STOP">가동 중지</option>
              </S.FilterSelect>
            </S.FilterWrapper>
          </S.ListToolbar>

          {/* 라인 카드 리스트 */}
          <S.LineList>
            {isLoading ? (
              <S.EmptyState>
                <FaArrowRotateRight />
                <strong>공정 라인 목록을 불러오는 중입니다.</strong>
              </S.EmptyState>
            ) : isError ? (
              <S.EmptyState>
                <FaTriangleExclamation />
                <strong>
                  {error instanceof Error
                    ? error.message
                    : "라인 데이터를 불러오지 못했습니다."}
                </strong>
                <S.RetryButton type="button" onClick={() => void refetch()}>
                  다시 시도
                </S.RetryButton>
              </S.EmptyState>
            ) : filteredLines.length === 0 ? (
              <S.EmptyState>
                <FaIndustry />
                <strong>등록된 공정 라인이 없습니다.</strong>
                <span>
                  {searchTerm || statusFilter !== "ALL"
                    ? "검색 조건을 다시 확인해 주세요."
                    : "왼쪽에서 새로운 라인을 등록해 주세요."}
                </span>
              </S.EmptyState>
            ) : (
              filteredLines.map((line) => {
                const statusInfo = getStatusInfo(line.status);
                const isRunning = line.status?.toUpperCase() === "RUNNING";
                const isUpdating = updatingId === line.id;

                return (
                  <S.LineCard key={line.id}>
                    {/* 상단: 라인명 + 배지 */}
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

                      {/* 상태 배지 (클릭 시 토글 모달 호출) */}
                      <S.StatusBadge
                        $tone={statusInfo.tone}
                        $clickable={isAdmin}
                        onClick={
                          isAdmin 
                          ? ()=>openStatusModal(line, isRunning ? "STOP" : "RUNNING")
                          : undefined
                        }
                        title={
                          isAdmin 
                          ? "배지를 클릭하여 상태를 빠르게 전환할 수 있습니다."
                          : "현재 공정 상태입니다."
                         }
                      >
                        <S.StatusDot $pulse={isRunning} />
                        {statusInfo.label}
                      </S.StatusBadge>
                    </S.LineCardTop>

                    {/* 중단: 상세 정보 */}
                    <S.LineCardBottom>
                      <S.LineDetail>
                        <FaBox />
                        <span>생산 모델:</span>
                        <strong>{line.currentProduct || "-"}</strong>
                      </S.LineDetail>

                      <S.LineDetail>
                        <FaUserGear />
                        <span>담당자:</span>
                        <strong>{line.operator || "-"}</strong>
                      </S.LineDetail>
                    </S.LineCardBottom>

                    {/* 하단: 상태 제어 버튼 바 */}
                    {isAdmin && (
                    <S.StatusControl>
                      <S.QuickToggleButton
                        type="button"
                        $isRunning={isRunning}
                        disabled={isUpdating}
                        onClick={() => handleQuickToggle(line)}
                        title={
                          isRunning
                            ? "확인 모달 없이 즉시 가동을 중지합니다."
                            : "확인 모달 없이 즉시 가동을 시작합니다."
                        }
                      >
                        {isRunning ? <FaPause /> : <FaPlay />}
                        {isRunning ? "원클릭 정지" : "원클릭 가동"}
                      </S.QuickToggleButton>

                      <S.StatusRightGroup>
                        <S.StatusControlLabel>
                          <FaGear />
                          상태변경:
                        </S.StatusControlLabel>

                        <S.StatusActionButtons>
                          <S.StatusButton
                            type="button"
                            $variant="success"
                            $active={line.status?.toUpperCase() === "RUNNING"}
                            disabled={isUpdating}
                            onClick={() => openStatusModal(line, "RUNNING")}
                            title="가동 상태로 변경 (확인 모달)"
                          >
                            <FaPlay /> 가동
                          </S.StatusButton>

                          <S.StatusButton
                            type="button"
                            $variant="warning"
                            $active={line.status?.toUpperCase() === "MAINTENANCE"}
                            disabled={isUpdating}
                            onClick={() => openStatusModal(line, "MAINTENANCE")}
                            title="점검 상태로 변경 (확인 모달)"
                          >
                            <FaWrench /> 점검
                          </S.StatusButton>

                          <S.StatusButton
                            type="button"
                            $variant="danger"
                            $active={
                              line.status?.toUpperCase() === "STOP" ||
                              line.status?.toUpperCase() === "STOPPED"
                            }
                            disabled={isUpdating}
                            onClick={() => openStatusModal(line, "STOP")}
                            title="정지 상태로 변경 (확인 모달)"
                          >
                            <FaPause /> 정지
                          </S.StatusButton>
                        </S.StatusActionButtons>
                      </S.StatusRightGroup>
                    </S.StatusControl>
                    )}
                  </S.LineCard>
                );
              })
            )}
          </S.LineList>
        </S.Panel>
      </S.ContentGrid>

      {/* 4. 상태 변경 이력 패널 */}
      <S.Panel>
        <S.PanelHeader>
          <S.PanelHeading>
            <S.PanelIcon>
              <FaClockRotateLeft />
            </S.PanelIcon>
            <div>
              <S.PanelTitle>공정 상태 변경 이력</S.PanelTitle>
              <S.PanelDescription>
                최근 공정 라인의 상태 변경 내역을 실시간으로 확인합니다.
              </S.PanelDescription>
            </div>
          </S.PanelHeading>

          <S.ItemCount>최근 {historyList.length}건</S.ItemCount>
        </S.PanelHeader>

        <S.HistoryList>
          {isHistoryLoading ? (
            <S.EmptyState>
              <FaArrowRotateRight />
              <strong>이력 데이터를 불러오는 중입니다...</strong>
            </S.EmptyState>
          ) : historyList.length === 0 ? (
            <S.EmptyState>
              <FaClockRotateLeft />
              <strong>기록된 상태 변경 이력이 없습니다.</strong>
            </S.EmptyState>
          ) : (
            historyList.map((hist) => {
              const prev = getStatusInfo(hist.previousStatus);
              const next = getStatusInfo(hist.newStatus);

              return (
                <S.HistoryItem key={hist.id}>
                  <S.HistoryLeft>
                    <S.HistoryLineName>{hist.lineName}</S.HistoryLineName>

                    <S.HistoryChangeFlow>
                      <S.HistoryPillBadge $tone={prev.tone}>
                        <S.HistoryPillDot />
                        {prev.label}
                      </S.HistoryPillBadge>
                      <FaArrowRight />
                      <S.HistoryPillBadge $tone={next.tone}>
                        <S.HistoryPillDot />
                        {next.label}
                      </S.HistoryPillBadge>
                    </S.HistoryChangeFlow>
                  </S.HistoryLeft>

                  <S.HistoryRight>
                    <S.HistoryReason title={hist.reason}>
                      {hist.reason || "상태 변경"}
                    </S.HistoryReason>
                    <S.HistoryOperator>{hist.changedBy}</S.HistoryOperator>
                    <S.HistoryTime>{formatTime(hist.createdAt)}</S.HistoryTime>
                  </S.HistoryRight>
                </S.HistoryItem>
              );
            })
          )}
        </S.HistoryList>
      </S.Panel>

      {modal.isOpen && modal.line && (
        <S.ModalBackdrop onClick={closeModal}>
          <S.ModalContainer onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalIcon
                $variant={getStatusInfo(modal.targetStatus).tone}
              >
                {modal.targetStatus === "RUNNING" ? (
                  <FaPlay />
                ) : modal.targetStatus === "MAINTENANCE" ? (
                  <FaWrench />
                ) : (
                  <FaPause />
                )}
              </S.ModalIcon>

              <S.ModalTitle>공정 상태 변경 확인</S.ModalTitle>
            </S.ModalHeader>

            <S.ModalBody>
              <S.ModalInfo>
                대상 라인: <strong>{modal.line.lineName}</strong>
                <br />
                변경 상태:{" "}
                <strong>
                  {getStatusInfo(modal.line.status).label} ➔ 
                  {getStatusInfo(modal.targetStatus).label}
                </strong>
              </S.ModalInfo>

              <div>
                <S.Label htmlFor="modalReason">변경 사유 입력</S.Label>
                <S.ModalInput
                  id="modalReason"
                  placeholder="상태 변경 사유를 입력해 주세요."
                  value={modal.reason}
                  onChange={(e) =>
                    setModal((prev) => ({ ...prev, reason: e.target.value }))
                  }
                />
              </div>
            </S.ModalBody>

            <S.ModalButtonGroup>
              <S.ModalCancelButton type="button" onClick={closeModal}>
                취소
              </S.ModalCancelButton>

              <S.ModalConfirmButton
                type="button"
                $variant={getStatusInfo(modal.targetStatus).tone}
                onClick={handleConfirmStatusChange}
              >
                상태 변경
              </S.ModalConfirmButton>
            </S.ModalButtonGroup>
          </S.ModalContainer>
        </S.ModalBackdrop>
      )}
    </S.PageContainer>
  );
}
