# 📋 Project-MES 도메인 요구사항 정의서 (Requirements Definition)

> **대상 시스템:** Project-MES 스마트팩토리 MES 웹 애플리케이션  
> **문서 목적:** 제조 운영 도메인에서 해결하려는 업무 문제(As-Is)를 프론트엔드 기능(To-Be)과 구현 근거에 연결하고, 각 요구사항의 범위와 검증 기준을 명확히 정의합니다.  
> **문서 성격:** 구현된 기능을 기준으로 정리한 요구사항 명세입니다. 실제 제조 현장 도입 전후의 정량적 개선 효과를 측정한 결과를 의미하지 않습니다.

---

## 1. 요구사항 정의 원칙

1. **업무 문제와 구현 기능을 구분합니다.** As-Is는 해결하려는 업무 상황이며, To-Be는 현재 프로젝트 코드에서 확인되는 기능을 기술합니다.
2. **구현 근거를 함께 기록합니다.** 화면, Hook, API 모듈, 상태 관리 도구 등 확인 가능한 프론트엔드 구현 요소를 연결합니다.
3. **요구사항 ID를 테스트와 연결합니다.** 테스트 문서에서는 요구사항 표를 반복하지 않고 Req ID를 참조해 검증 절차를 추적합니다.
4. **구현하지 않은 기능을 포함하지 않습니다.** AI 모델 추론, WebSocket Push, 행 가상화 등 코드에서 확인되지 않는 기능은 구현 완료 항목으로 표현하지 않습니다.
5. **검증 상태와 구현 상태를 구분합니다.** 기능이 코드에 존재한다는 사실만으로 테스트 PASS를 의미하지 않습니다. 실제 테스트 실행 결과는 `REQUIREMENTS_TEST_CASES.md`에 별도로 기록합니다.

## 2. 도메인별 요구사항

| Req ID | 도메인 모듈 | 현업 요구사항 및 문제 상황 (As-Is) | 구현된 기능 정의 (To-Be) | 핵심 프론트엔드 기술 및 구현 근거 | 검증 기준 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-AUTH-01** | 인증 및 회원가입 | 허가되지 않은 사용자의 시스템 접근을 제한하고, 사용자 계정과 로그인 상태를 관리할 필요가 있음 | JWT 기반 로그인 및 단계형 회원가입 흐름을 제공하고, 로그인 성공 후 토큰과 사용자 정보를 인증 상태에 반영 | `useAuthStore`, 인증 API 모듈, Axios Request Interceptor, 회원가입 화면 | 유효한 계정으로 로그인하면 인증 상태가 설정되고, 이후 API 요청에 Bearer 토큰이 포함되는지 확인 |
| **REQ-AUTH-02** | 인증 세션 관리 | 토큰 만료 후 보호 화면에 계속 머무르거나, 재로그인 후 기존 작업 화면으로 돌아가기 어려울 수 있음 | 인증이 필요한 API 요청에서 401이 발생하면 현재 경로와 Query String을 `postLoginRedirect`에 저장하고 로그아웃 처리 후 로그인 화면으로 이동 | Axios Response Interceptor, `sessionStorage`, `postLoginRedirect`, `useAuthStore`, `AuthGuard` | 401 발생 시 경로가 저장되고 로그인 화면으로 이동하는지, 로그인 후 저장 경로 복귀 흐름이 연결되는지 확인 |
| **REQ-AUTH-03** | 개발 로그 보안 | API 오류를 디버깅하는 과정에서 토큰·비밀번호 등 민감 정보가 콘솔 로그에 노출될 위험이 있음 | 개발 환경 오류 로그를 출력할 때 중첩 객체와 배열을 순회해 민감 키 값을 마스킹 | `sanitizeForLog()` 및 Axios 오류 로깅 | 중첩된 `authorization`, `token`, `password`, `secret` 등의 값이 `[redacted]`로 치환되는지 확인 |
| **REQ-AUTH-04** | 역할 기반 접근 제어 | 일반 사용자에게 관리자 전용 화면이 노출되거나 관리자 API가 무단 호출될 위험이 있음 | `AuthGuard`에서 로그인 여부와 선택적 `requiredRole`을 확인하며, 백엔드 API도 별도 인증·인가 검증을 수행 | `AuthGuard`, `requiredRole`, Zustand Auth Store, 백엔드 인증·인가 미들웨어 | 가드가 적용된 관리자 경로에서 비관리자 접근이 제한되는지, 관리자 API의 서버 측 권한 검증이 동작하는지 확인 |
| **REQ-PROC-01** | 공정 라인 관리 | 라인 상태 변경과 변경 이력 확인이 분리되면 운영자가 변경 내용과 사유를 추적하기 어려움 | 공정 라인 목록·이력 조회, 라인 등록, 관리자 상태 변경 및 변경 사유 입력 기능 제공 | `/admin/process`, `useProcessLines` 계열 Hook, `mes.http.ts`, TanStack Query Mutation | 상태 변경 성공 후 라인 목록과 상태 이력 Query가 무효화되고 최신 상태·이력이 반영되는지 확인 |
| **REQ-ANAL-01** | 생산 실적 및 수율 분석 | 목표량·양품·불량 수량과 수율을 함께 확인해 생산 실적을 비교할 필요가 있음 | 생산 실적 등록 및 조회, 양품·불량 수량을 이용한 수율 프리뷰와 요약 지표, 95% 기준 수율 필터 제공 | `/admin/analytics`, `createRecords`, `fetchRecords`, TanStack Query, `useMemo` 파생 계산, Progress UI | 유효한 수량 입력 시 수율이 계산되고, 등록 후 목록·요약 데이터가 갱신되는지 확인. 95% 이상/미만 필터가 구분되는지 확인 |
| **REQ-ANAL-02** | 대시보드 지표 가독성 | 주기적으로 갱신되는 KPI 숫자의 글리프 폭 차이로 카드 내부 수치가 흔들려 보일 수 있음 | 주요 숫자 UI에 고정폭 숫자 정렬을 적용하고 Sparkline·차트로 지표 추이를 보조 표시 | CSS `tabular-nums`, SVG Sparkline, Recharts | 수치 갱신 전후 숫자 폭이 일정하게 표시되는지 시각적으로 확인 |
| **REQ-QUAL-01** | 품질 검사 등록 | 제품 시리얼 및 검사 유형별 판정 결과와 불량 사유를 기록·조회할 필요가 있음 | 검사 결과(PASS/FAIL), 시리얼 번호, 검사자, 검사 유형 및 불량 사유를 등록·조회하며 등록 결과에 따라 공통 Alert 표시 | `/admin/quality`, 품질 검사 API, `useQuery`·`useMutation`, `useAlertStore` | FAIL 등록 시 불량 사유 입력 검증이 적용되고, 등록 성공·실패에 따른 공통 Alert와 조회 결과가 반영되는지 확인 |
| **REQ-QUAL-02** | 품질 검사 이력 분석 | 검사 이력이 누적되면 특정 시리얼이나 FAIL 판정 데이터를 빠르게 식별하기 어려움 | 검사 이력 검색 및 판정 결과 필터링, 품질 요약 및 차트 표시 | 품질 페이지 검색·필터 상태, `useMemo`, Recharts 및 요약 UI | 검색어와 PASS/FAIL 필터 조건을 함께 적용했을 때 일치하는 검사 결과만 표시되는지 확인 |
| **REQ-EQP-01** | 클린룸 설비 모니터링 | 구역별 설비 상태와 온도·습도 데이터를 지속적으로 확인할 필요가 있음 | 설비별 상태 및 온·습도 정보 조회, 설비 등록과 상태 변경 기능 제공 | `/admin/cleanroom`, `useEquipment`, Equipment API, TanStack Query | 설비 API 응답의 상태·온도·습도 값이 해당 설비 정보와 함께 화면에 표시되는지 확인 |
| **REQ-EQP-02** | 클린룸 설비 경보 | 설비 이상 상태를 운영자가 늦게 발견할 수 있어 상태 변화에 대한 알림이 필요함 | 15초 주기로 조회한 설비 데이터에서 `WARNING`·`ERROR` 상태를 감지해 MES Live Alert 표시 | `MesAlertWatcher`, `useMesAlertStore`, TanStack Query `refetchInterval`, `Set`, `sessionStorage` | 설비 상태가 WARNING/ERROR일 때 경보가 표시되고 NORMAL 복구 시 해당 상태 키가 해제되는지 확인 |
| **REQ-SCM-01** | 부품 재고 관리 | 현재 재고가 안전 재고 기준 아래로 떨어진 품목을 빠르게 식별할 필요가 있음 | 부품 목록을 조회하고 현재 재고와 안전 재고 기준 및 DANGER 상태를 화면에 표시 | `/admin/components`, `useSCM`, `stockQuantity`, `minThreshold`, 조건부 상태 UI | 안전 재고 미달 또는 DANGER 조건의 품목이 부족 상태로 식별되는지 확인 |
| **REQ-SCM-02** | 부품 재고 경보 | 폴링으로 동일한 부족 상태가 반복 감지되면 같은 알림이 반복 노출될 수 있음 | 부품 ID와 현재 재고를 포함한 경보 키로 중복 노출을 억제하고, 경보 키를 세션 저장소에 기록 | `MesAlertWatcher`, `useRef`의 `Set`, `sessionStorage`의 `mes-alerted-keys`, `useMesAlertStore` | 동일 키의 반복 알림이 억제되고 재고 회복 시 해당 부품의 경보 키가 제거되는지 확인 |
| **REQ-HR-01** | 인사 및 가입 승인 | 신규 가입자의 승인과 사번 발급을 관리자 업무로 통제하고 계정·사원 데이터의 정합성을 유지할 필요가 있음 | 승인 대기자 조회, 가입 승인·반려 및 승인 시 사용자·사원 정보 반영 | `/admin/hr`, `hr.http.ts`, HR Hook, 백엔드 Sequelize Transaction | 승인 성공 시 User와 Employee 데이터가 함께 반영되고 대기자 목록이 갱신되는지 확인 |
| **REQ-HR-02** | 사내 주소록 | 사원 정보를 이름·사번·부서·이메일 및 재직 상태 기준으로 찾기 번거로움 | 사원 목록 검색, 부서·재직 상태 필터링, 페이지네이션 및 쪽지 작성 진입 제공 | `/admin/employee`, `useGetEmployeeDirectory`, TanStack Table, `useMemo`, 페이지 인덱스 초기화 | 검색·필터 조합에 맞는 결과가 표시되고 페이지 이동이 동작하는지 확인 |
| **REQ-COM-01** | 사내 쪽지 | 부서 간 전달 사항의 수신·발신 및 읽음 상태를 확인할 필요가 있음 | 받은 쪽지·보낸 쪽지 조회, 발송, 읽음 처리 및 삭제 기능 제공 | `/admin/messages`, `message.http.ts`, `useMessage`, Message Notification Provider, Toast | 발송·읽음·삭제 후 관련 목록과 미읽음 표시가 갱신되는지 확인 |
| **REQ-COM-02** | 일정 및 공휴일 | 개인·공용 일정과 공휴일을 함께 확인하고 일정을 관리할 필요가 있음 | 일정 조회·등록·수정·삭제 및 월별 공휴일 정보 조회 | `schedule.http.ts`, `useSchedule`, Schedule Context, `holidays.ts`, 공휴일 API | 일정 변경 결과가 캘린더에 반영되고 조회된 공휴일이 해당 날짜에 표시되는지 확인 |

## 3. 요구사항 범위 및 해석

### 3.1 품질 검사와 AI 모델의 범위

품질 검사 화면은 AI 비전 검사 결과를 등록·조회하고 PASS/FAIL 및 불량 사유를 관리하는 업무 화면입니다. 현재 프론트엔드 코드에서 AI 모델 추론, 이미지 업로드를 통한 모델 실행, 모델 학습·배포 기능은 확인되지 않습니다. 따라서 프로젝트 설명에서는 **AI 모델을 직접 개발하거나 추론 API를 연동했다**고 표현하지 않습니다.

### 3.2 클린룸 경보 조건

`MesAlertWatcher`는 온도·습도 숫자를 프론트엔드에서 직접 임계치와 비교하는 방식이 아닙니다. 설비 API에서 전달된 `WARNING` 또는 `ERROR` 상태를 감지합니다. 온도·습도 값은 경보 내용에 함께 표시될 수 있으나, 경보 발생 조건은 설비 상태값입니다.

### 3.3 공통 Alert와 MES Live Alert 구분

- `useAlertStore`: 품질 검사 등 화면에서 호출하는 공통 안내·성공·오류 Alert 및 Axios 403 권한 안내에 사용합니다.
- `useMesAlertStore`: `MesAlertWatcher`가 감지한 설비 이상 및 부품 재고 부족 등 제조 운영 데이터 기반 Live Alert에 사용합니다.

두 Store는 목적과 호출 흐름이 다르므로 하나의 전역 실시간 알림 기능으로 합쳐 설명하지 않습니다.

### 3.4 사내 주소록의 성능 표현

사내 주소록은 사원 데이터를 조회한 뒤 이름·사번·부서·이메일 검색과 부서·재직 상태 필터를 적용하고 TanStack Table 페이지네이션을 사용합니다. 현재 코드에서 가상 스크롤 또는 행 가상화는 확인되지 않습니다. 따라서 “클라이언트 측 가상화”나 “대용량 가상 스크롤”이라고 표현하지 않습니다.

### 3.5 폴링과 실시간 통신의 구분

대시보드 및 `MesAlertWatcher`의 15초 데이터 갱신, 쪽지 수신함의 30초 재조회는 주기적으로 서버에 요청하는 Polling 방식입니다. WebSocket 또는 Server-Sent Events 기반 Push 통신과 구분합니다.

### 3.6 권한 검증의 책임

`AuthGuard`는 프론트엔드 화면 접근을 제어하는 UX 계층입니다. API 보안의 최종 경계는 백엔드 인증·인가 검증입니다. 또한 `requiredRole="ADMIN"`은 실제 가드가 적용된 경로를 기준으로 설명하고, 모든 관리자 화면이 동일하게 보호된다고 일반화하지 않습니다.

## 4. 요구사항 추적성

| 요구사항 영역 | 관련 요구사항 ID | 테스트 문서 |
| :--- | :--- | :--- |
| 인증·세션·로그 보안·권한 | REQ-AUTH-01 ~ REQ-AUTH-04 | `REQUIREMENTS_TEST_CASES.md`의 TC-AUTH 항목 |
| 공정 라인 | REQ-PROC-01 | TC-PROC 항목 |
| 생산 실적·수율·지표 | REQ-ANAL-01 ~ REQ-ANAL-02 | TC-ANAL 항목 |
| 품질 검사 | REQ-QUAL-01 ~ REQ-QUAL-02 | TC-QUAL 항목 |
| 클린룸 설비·경보 | REQ-EQP-01 ~ REQ-EQP-02 | TC-EQP 항목 |
| 부품 재고·경보 | REQ-SCM-01 ~ REQ-SCM-02 | TC-SCM 항목 |
| 인사·주소록 | REQ-HR-01 ~ REQ-HR-02 | TC-HR 항목 |
| 쪽지·일정·공휴일 | REQ-COM-01 ~ REQ-COM-02 | TC-COM 항목 |

## 5. 문서 간 역할

- [`PROJECT_MES_ARCHITECTURE.md`](./PROJECT_MES_ARCHITECTURE.md): 프론트엔드 데이터 흐름, API 연동, 상태 관리, 인증·권한 및 설계 의사결정을 설명합니다.
- [`REQUIREMENTS.md`](./REQUIREMENTS.md): 도메인별 업무 요구사항과 구현 범위, 구현 근거 및 검증 기준을 정의합니다.
- [`TEST_CASES.md`](./TEST_CASES.md): 요구사항별 테스트 준비 조건, 실행 절차, 기대 결과 및 실제 실행 상태를 기록합니다.

---

**반영 규칙:** 기능이 변경되면 요구사항의 To-Be와 구현 근거를 먼저 갱신하고, 연결된 테스트 케이스와 기대 결과도 함께 수정합니다.
