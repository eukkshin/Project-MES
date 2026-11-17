# 🏭 Project-MES 프론트엔드 아키텍처 및 핵심 설계 명세서

> **대상 직무:** 스마트팩토리 MES 프론트엔드 개발자 (Frontend Engineer)  
> **문서 목적:** 프론트엔드 개발자의 핵심 역량인 **도메인 문제 해결, 4계층 데이터 아키텍처, API/상태 관리 전략, UI 디자인 토큰 시스템**을 명확하게 증명하기 위한 핵심 설계 문서입니다.

---

## 1. 도메인 요구사항 및 핵심 기능 매핑 정의서

제조 현장(Smart Factory)의 수기 관리 및 데이터 파편화 문제를 프론트엔드 UI/UX와 데이터 정합성 로직으로 해결한 핵심 도메인별 기능 정의입니다.

| 도메인 모듈 | 현업 문제 (As-Is) | 프론트엔드 해결 기능 (To-Be) | 핵심 UI/UX 및 기술 적용 |
| :--- | :--- | :--- | :--- |
| **통합 관제 대시보드**<br>(`/admin/dashboard`) | 공정·품질·설비 데이터가 개별 화면에 흩어져 있어 현장 가동률(OEE) 즉시 파악 불가 | 핵심 KPI 5종, 7일 생산량 추이, 라인별 가동률, 실시간 알람 통합 관제[cite: 4] | • React Query `refetchInterval` 실시간 폴링[cite: 4]<br>• `tabular-nums` 수치 흔들림 방지 및 스파크라인 시각화[cite: 4] |
| **공정 라인 제어**<br>(`/admin/process`) | 작업자가 라인 가동 상태를 수동 기록해 변경 이력 누락 및 비인가 조작 위험 발생 | 라인별 상태(가동/점검/중지) 실시간 조회, 관리자 원클릭 토글 및 사유 로그 기록 | • `AuthGuard` 및 `role === 'ADMIN'` 기반 RBAC 권한 제어<br>• 상태 변경 시 `ProcessStatusLog` 이력 자동 추적 |
| **생산 실적 & 수율**<br>(`/admin/analytics`) | 일일 목표 대비 양품/불량 수율 계산 지연으로 병목 라인 대응 늦음 | 실적 등록 시 예상 수율 실시간 프리뷰 및 수율 95% 기준 필터링 분석 | • 입력값 기반 실시간 파생 상태(Derived State) 계산<br>• 목표 달성률 프로그레스 바 시각화 |
| **AI 비전 품질 검사**<br>(`/admin/quality`) | 시리얼 번호별 불량 유형(스크래치, 씰링 등) 추적 및 합격률 집계 어려움 | 검사 결과(PASS/FAIL) 등록, 불량 사유 분류, 전체 합격률 지표 제공 | • 다중 조건 검색/필터링 테이블<br>• 불량 발생 시 전역 알림(`useAlertStore`) 연동 |
| **클린룸 & 부품 SCM**<br>(`/admin/cleanroom`, `/components`) | 온·습도 이상 및 핵심 부품 안전 재고 미달 시 사전 경고 부재 | 구역별 온·습도 모니터링 및 안전 재고 미달 품목 자동 경고(`WARNING`) 배지 | • 임계치 조건부 스타일링(시맨틱 상태 토큰 적용) |
| **인사·사번 승인 & 주소록**<br>(`/admin/hr`, `/admin/employee`) | 미승인 외부인 시스템 접근 위험 및 부서·재직 상태별 사원 정보 검색 불편 | **관리자 전용 신규 가입자 사번 발급 승인/반려**, 직급·재직 상태 수정, **사내 주소록 검색** | • `requiredRole="ADMIN"` 라우트 가드 보호<br>• **TanStack Table** 기반 다중 조건 검색 및 페이지네이션 |
| **사내 쪽지 & 일정 협업**<br>(`/admin/messages`, `/admin`) | 현장 작업 지시 및 공용·개인 일정 누락으로 부서 간 커뮤니케이션 지연 | **사내 쪽지 발송·수신/발신함, 읽음 자동 처리 및 실시간 알림**, 공휴일 연동 캘린더 | • `MessageNotificationProvider` & `ToastContext` 실시간 알림<br>• 공공데이터 공휴일 API 연동 월간 스케줄러 |
| **인증 및 세션 보안**<br>(`/auth/*`, `/admin/mypage`) | 토큰 만료 시 작업 중인 화면 이탈 및 디버깅 로그 내 민감 정보 노출 우려 | 3단계 회원가입(우편번호 API), JWT 자동 주입, 세션 만료 후 기존 경로 복귀 | • Axios 인터셉터 401(`postLoginRedirect`) / 403 분기<br>• `sanitizeForLog()` 재귀적 민감 정보 마스킹 |

---

## 2. 4-Layer 프론트엔드 데이터 아키텍처

유지보수성과 테스트 용이성을 높이기 위해 관심사를 4개 계층으로 엄격히 분리했습니다.

```text
┌───────────────────────────────────────────────────────────────────────┐
│ 1. View Layer (src/app/(protected)/admin/*, src/components/*)         │
│    - 순수 UI 렌더링 및 사용자 인터랙션 담당 (비즈니스/통신 로직 배제)   │
└───────────────────────────────────┬───────────────────────────────────┘
                                    │ 호출 (Custom Hooks)
┌───────────────────────────────────▼───────────────────────────────────┐
│ 2. Server State Layer (src/hooks/useMes.ts, useHr.ts, useSchedule.ts) │
│    - TanStack Query 기반 비동기 상태, 캐싱, 폴링, 선택적 무효화 관리    │
└───────────────────────────────────┬───────────────────────────────────┘
                                    │ 호출 (Domain HTTP Clients)
┌───────────────────────────────────▼───────────────────────────────────┐
│ 3. API Client Layer (src/api/*.http.ts & src/lib/axios.ts)            │
│    - 도메인별 API 캡슐화 및 공통 인터셉터(JWT 주입, 401 세션 만료 방어) │
└───────────────────────────────────┬───────────────────────────────────┘
                                    │ 병행 (전역 UI 상태 분리)
┌───────────────────────────────────▼───────────────────────────────────┐
│ 4. Client State Layer (src/store/useAuthStore.ts, useAlertStore.ts)   │
│    - 서버 데이터와 무관한 순수 클라이언트 상태(인증, 모달, 토스트) 관리  │
└───────────────────────────────────────────────────────────────────────┘

```

---

## 3. 프론트엔드 API 연동 및 상태 관리 명세서

백엔드 REST API와 프론트엔드 커스텀 훅(`TanStack Query`), 전역 스토어(`Zustand`) 간의 데이터 흐름 및 캐시 동기화 전략입니다.

| 도메인 | HTTP Method & Endpoint | 프론트엔드 모듈 & 훅 | 요청/응답 핵심 데이터 (DTO) | 캐시 무효화 및 예외 처리 전략 |
| :--- | :--- | :--- | :--- | :--- |
| **인증/권한** | `POST /api/auth/login`<br>`POST /api/auth/register` | `auth.http.ts`<br>`useLoginMember`, `useRegister` | **Req:** `email, password` (가입 시 회사 주소 포함)<br>**Res:** `accessToken, role (ADMIN/EMPLOYEE)` | `useAuthStore` 전역 상태 저장 및 Axios Interceptor 401 자동 로그아웃 처리 |
| **공정 라인** | `GET /api/process/lines`<br>`PATCH /api/process/lines/:id/status` | `mes.http.ts`<br>`useMes`[cite: 3] | **Req:** `status (RUNNING/STOPPED/MAINTENANCE), reason`<br>**Res:** `lineId, modelName, status, logs[]` | 상태 변경 성공 시 공정 라인 목록 및 이력 쿼리만 선택적 무효화(`invalidateQueries`)하여 리렌더링 최소화[cite: 3] |
| **생산 실적** | `GET /api/production/records`<br>`POST /api/production/records` | `mes.http.ts`<br>`useMes`[cite: 3] | **Req:** `lineId, targetQty, goodQty, defectQty`<br>**Res:** `recordId, yieldRate, achievementRate` | 등록 즉시 대시보드 KPI 및 수율 분석 쿼리 동시 갱신[cite: 4] |
| **품질 검사** | `GET /api/quality/inspections`<br>`POST /api/quality/inspections` | `mes.http.ts`<br>`useMes`[cite: 3] | **Req:** `serialNo, inspectionType, result (PASS/FAIL), defectReason` | `FAIL` 판정 등록 시 글로벌 토스트 및 알람 위젯 트리거[cite: 3, 4] |
| **설비/SCM** | `GET /api/cleanroom/equipments`<br>`GET /api/scm/components` | `mes.http.ts`<br>`useMes`[cite: 3] | **Res:** `temp, humidity, currentStock, safetyStock` | `currentStock < safetyStock` 조건 충족 시 클라이언트 측 `WARNING` 상태 파생 연산 |
| **인사/사번 승인** | `GET /api/hr/employees`<br>`PATCH /api/hr/approve/:id` | `hr.http.ts`<br>`useHr`[cite: 3] | **Req:** `empNo, role, position, status, isActive`<br>**Res:** `employeeList[], pendingUsers[]` | 사번 승인·권한 수정 완료 시 대기자 목록과 전체 사원 테이블 쿼리 동시 무효화 |
| **쪽지/일정** | `GET /api/messages`<br>`PATCH /api/messages/:id/read`<br>`GET /api/holidays` | `message.http.ts`, `schedule.http.ts`<br>`useMessage`, `useSchedule`[cite: 3] | **Req:** `receiverId, title, content, scheduleDate`<br>**Res:** `unreadCount, messages[], holidayDate` | 쪽지 상세 열람 시 읽음 처리 뮤테이션 실행 및 미읽음 배지 카운트 즉시 차감, 공휴일 API 장기 캐싱 |

---

## 4. 스마트팩토리 현장 맞춤형 디자인 토큰 시스템 (`theme.ts`)

기존 컴포넌트에 하드코딩되어 있던 색상 값을 제거하고, **원시 팔레트(Primitive) → 시맨틱 토큰(Semantic)** 2계층 구조로 설계하여 단일 진실 공급원(SSOT)을 확보했습니다.

### 4.1 현장 조도 및 작업 환경 대응 3-Mode 테마 아키텍처
`ThemeProviderWrapper`와 `localStorage`를 연동하여 공장 환경에 따라 3가지 테마를 런타임에 즉시 전환합니다.

| 시맨틱 토큰 경로 | ☀️ 라이트 모드 (일반 사무실) | 🌙 다크 모드 (야간 제어실) | 👁️ 고대비 모드 (강한 현장 조명) |
| :--- | :--- | :--- | :--- |
| `colors.primary.default` | `#004b9c` (딥 블루) | `#66a3e0` (명도 상향 블루) | `#3385d6` (고채도 블루) |
| `colors.bg.canvas` | `#f4f6f8` (소프트 그레이) | `#0f172a` (다크 슬레이트) | `#000000` (순수 블랙) |
| `colors.text.primary` | `#222222` (다크 차콜) | `#f8fafc` (오프 화이트) | `#ffffff` (순수 화이트, WCAG AAA) |
| `colors.status.danger` | `#e53935` / 배경 `#ffebee` | `#fca5a5` / 배경 `#450a0a` | `#ff4d4d` / 배경 `#000000` + 굵은 테두리 |
| `shadows.subtle` | `0 2px 4px rgba(0,0,0,0.05)` | `0 2px 4px rgba(0,0,0,0.4)` | `none` (그림자 대신 명확한 `border` 사용) |

---

## 5. 핵심 트러블슈팅 및 엔지니어링 의사결정

### Case 1. JWT 토큰 만료 시 API 무한 재요청(Infinite Loop) 방어
* **문제 상황:** API 요청 중 JWT 토큰이 만료(`401 Unauthorized`)되었을 때, 인터셉터가 만료된 토큰으로 재요청을 반복하며 브라우저가 멈추는 현상 발생.
* **해결 방법:** `lib/axios.ts` 응답 인터셉터에 커스텀 플래그(`_retry`)를 도입해 단 1회만 재시도하도록 제한하고, 갱신 실패 시 즉시 `useAuthStore.getState().logout()`을 호출해 세션을 초기화하고 로그인 페이지로 안전하게 리다이렉트하도록 구현했습니다.

### Case 2. 실시간 공정 데이터 갱신 시 UI 레이아웃 떨림(Layout Shift) 방지
* **문제 상황:** 대시보드 KPI 수치가 폴링(Polling)으로 실시간 업데이트될 때마다 숫자 자릿수 폭 차이로 인해 카드 내부 텍스트와 인접 요소가 미세하게 흔들리는 시각적 피로 발생.
* **해결 방법:** 모든 수치 렌더링 컴포넌트에 CSS `font-variant-numeric: tabular-nums` 속성을 적용하여 숫자 폭을 고정폭(Monospace)으로 정렬하고, 불필요한 원형 장식 아이콘을 제거한 SVG 스파크라인으로 대체해 시인성을 극대화했습니다.

### Case 3. SSR 환경에서의 테마 하이드레이션(Hydration) 불일치 해결
* **문제 상황:** Next.js App Router 환경에서 서버 렌더링 시점에는 브라우저의 `localStorage` 테마 설정을 알 수 없어 초기 렌더링과 클라이언트 마운트 시점 간 스타일 불일치 경고 발생.
* **해결 방법:** 초기 상태를 `'light'`로 안전하게 고정한 뒤 `useEffect` 마운트 시점에 `localStorage` 및 `prefers-color-scheme`을 복원하여 `document.documentElement`의 `data-theme` 속성과 `ThemeProvider` 상태를 동기화했습니다.