# 🏭 Project-MES 프론트엔드 아키텍처 및 핵심 설계 명세서

> **대상 직무:** Smart Factory MES Frontend Engineer  
> **문서 목적:** 제조 도메인의 문제를 프론트엔드 기능으로 구체화한 과정과 데이터 흐름, API 연동, 상태 관리, 인증·예외 처리, 디자인 시스템의 설계 의도를 설명합니다.  
> **작성 기준:** 제공된 `Project-MES-dev` 소스 ZIP(2026-11-17 기준)을 바탕으로 작성했습니다. 실제 구현과 향후 개선 아이디어를 구분했으며, 구현 여부가 확인되지 않은 기능은 완료된 기능처럼 기술하지 않았습니다.

---

## 목차

1. [프로젝트 개요 및 설계 방향](#1-프로젝트-개요-및-설계-방향)
2. [도메인 요구사항과 프론트엔드 기능 매핑](#2-도메인-요구사항과-프론트엔드-기능-매핑)
3. [프론트엔드 데이터 아키텍처](#3-프론트엔드-데이터-아키텍처)
4. [API 연동 및 서버 상태 관리](#4-api-연동-및-서버-상태-관리)
5. [클라이언트 상태 및 인증·권한 처리](#5-클라이언트-상태-및-인증권한-처리)
6. [디자인 토큰 및 테마 시스템](#6-디자인-토큰-및-테마-시스템)
7. [핵심 트러블슈팅 및 기술적 의사결정](#7-핵심-트러블슈팅-및-기술적-의사결정)
8. [기술적 한계와 후속 개선 과제](#8-기술적-한계와-후속-개선-과제)
9. [프로젝트 구조](#9-프로젝트-구조)

---

## 1. 프로젝트 개요 및 설계 방향

Project-MES는 제조 현장의 공정, 생산 실적, 품질 검사, 클린룸 설비, 부품 재고, 인사 및 사내 협업 정보를 한 곳에서 조회·관리할 수 있도록 구성한 MES 웹 애플리케이션입니다.

프론트엔드의 핵심 목표는 단순한 데이터 조회 화면을 만드는 데 그치지 않고, 여러 도메인에 분산된 운영 정보를 일관된 UI로 제공하고 사용자의 작업 결과가 관련 화면에 반영되도록 하는 것입니다.

### 설계 원칙

- **도메인 중심 화면 구성:** 제조 운영 업무 단위로 화면과 API 모듈을 분리합니다.
- **서버 상태와 UI 상태 분리:** API에서 가져오는 데이터는 TanStack Query, 인증 및 일시적인 UI 상태는 Zustand와 Context로 관리합니다.
- **통신 로직 공통화:** Axios 인스턴스와 인터셉터를 통해 API 기본 설정, JWT 주입, 인증 오류 및 로그 처리를 한 곳에서 관리합니다.
- **일관된 UI 시스템:** Primitive Palette와 Semantic Token을 분리하고 테마별 의미 기반 색상 토큰을 제공합니다.
- **운영 상황 가시화:** 폴링, KPI, 차트, 경보 배너 및 토스트를 이용해 주요 상태 변화를 빠르게 파악하도록 합니다.

### 기술 스택

| 구분 | 기술 | 적용 목적 |
| :--- | :--- | :--- |
| Framework | Next.js 16 / React 19 | App Router 기반 화면 및 컴포넌트 구성 |
| Language | TypeScript | API 데이터와 컴포넌트의 타입 안정성 확보 |
| Server State | TanStack Query v5 | 조회 캐싱, 주기적 재조회, Mutation 및 캐시 무효화 |
| Client State | Zustand | 인증 정보 및 전역 알림 상태 관리 |
| HTTP | Axios | 공통 API 인스턴스 및 Request/Response Interceptor |
| Styling | styled-components | 컴포넌트 스타일 및 테마 토큰 적용 |
| Visualization | Recharts | 생산 추이 및 품질 데이터 차트 |
| Table | TanStack Table | 사원 데이터 테이블 구성 |

---

## 2. 도메인 요구사항과 프론트엔드 기능 매핑

아래 표는 제조 현장에서 발생할 수 있는 정보 분산·수기 관리 문제를 기준으로, 프로젝트에서 제공하는 화면과 프론트엔드 구현 요소를 연결한 것입니다. 현업 문제는 도메인 요구사항을 설명하기 위한 시나리오이며, 실제 도입 현장의 정량적 개선 효과를 측정한 결과를 의미하지는 않습니다.

| 도메인 | 해결하려는 업무 문제 | 프론트엔드 기능 | 주요 구현 요소 |
| :--- | :--- | :--- | :--- |
| **통합 관제 대시보드** (`/admin/dashboard`) | 공정·생산·품질·설비·재고 정보가 분산되어 전체 상태 파악이 어려움 | 5개 영역의 KPI, 생산 실적 추이, 품질 합격/불량 비율, 설비 이상 및 재고 부족 현황 통합 표시 | TanStack Query 15초 폴링, `useMemo` 기반 요약 데이터 계산, Recharts, SVG Sparkline, `tabular-nums` |
| **공정 라인 관리** (`/admin/process`) | 라인 상태 변경과 변경 이력 확인이 분리되어 운영 흐름 파악이 어려움 | 라인 목록·상태 조회, 라인 등록, 상태 변경 및 변경 이력 조회 | `useProcessLines` 계열 훅, Mutation 성공 후 관련 Query 무효화 |
| **생산 실적 분석** (`/admin/analytics`) | 목표량과 생산량, 불량량을 한눈에 비교하기 어려움 | 생산 실적 데이터 조회 및 분석 화면 제공 | TanStack Query, 차트 및 수치 중심 UI |
| **품질 검사** (`/admin/quality`) | 시리얼/검사 유형별 합격·불량 결과와 불량 사유 확인이 필요함 | 검사 결과 조회 및 등록, PASS/FAIL 결과 확인 | 품질 검사 API, 필터·테이블 UI, 전역 Alert 연동 |
| **클린룸 설비** (`/admin/cleanroom`) | 설비 상태와 온·습도 등 환경 데이터를 지속적으로 확인해야 함 | 설비 상태 조회 및 등록·상태 변경, 이상 상태 표시 | `useEquipment`, 주기적 재조회 옵션, 임계 상태 시각화 |
| **부품 SCM** (`/admin/components`) | 현재 재고와 안전 재고를 비교해 부족 품목을 식별해야 함 | 부품 목록 조회·등록, 안전 재고 미달 상태 표시 | `useSCM`, `stockQuantity`와 `minThreshold` 비교, 경보 연동 |
| **인사·가입 승인** (`/admin/hr`) | 신규 가입자의 승인 및 사원 정보 관리가 필요함 | 가입 승인·반려, 사원 정보 수정, 대기자 조회 | `useHr`, 승인 후 관련 Query 무효화, `AuthGuard requiredRole="ADMIN"` |
| **사내 주소록** (`/admin/employee`) | 사원 정보를 부서·직급 등의 기준으로 확인할 필요가 있음 | 사내 사원 디렉터리 조회 및 테이블 표시 | TanStack Table 기반 테이블 UI |
| **사내 쪽지** (`/admin/messages`) | 사내 전달 사항의 수신·발신 및 읽음 상태 확인이 필요함 | 받은 쪽지·보낸 쪽지 조회, 발송, 읽음 처리, 삭제, 신규 쪽지 Toast | `useMessage`, 30초 수신함 재조회, `MessageNotificationProvider`, `ToastContext` |
| **일정·공휴일** (캘린더 화면) | 개인·공용 일정과 공휴일을 함께 확인할 필요가 있음 | 일정 조회·등록·수정·삭제, 공휴일 조회 | `useSchedule`, `schedule.http.ts`, `holidays.ts` |
| **인증·마이페이지** (`/auth/*`, `/admin/mypage`) | 로그인 상태 유지, 토큰 만료, 사용자 정보 관리가 필요함 | 회원가입·로그인, 프로필 조회, 비밀번호 변경, 로그아웃 및 세션 만료 처리 | Zustand Auth Store, Axios Interceptor, `postLoginRedirect`, `sanitizeForLog()` |

> **표현상 유의:** 품질 화면은 AI 비전 검사 결과를 관리하는 업무 화면으로 설명하는 것이 정확합니다. 제공된 프론트엔드 코드에서 AI 모델 추론 또는 이미지 기반 비전 모델 실행 로직은 확인되지 않았습니다.

---

## 3. 프론트엔드 데이터 아키텍처

화면 렌더링, 서버 데이터 관리, HTTP 통신, 클라이언트 전역 상태의 책임을 구분했습니다. 실제 코드에서는 모든 페이지가 동일한 수준으로 훅에 추상화된 것은 아니며, 도메인별 Custom Hook을 사용하는 화면과 페이지에서 `useQuery`를 직접 호출하는 화면이 함께 존재합니다.

```text
┌───────────────────────────────────────────────────────────────┐
│ 1. View Layer                                                  │
│ src/app/**, src/components/**                                  │
│ - 화면 렌더링, 사용자 입력 및 이벤트 처리                       │
│ - 도메인 훅 또는 API 조회 결과를 UI에 표현                       │
└──────────────────────────────┬────────────────────────────────┘
                               │
                               ▼
┌───────────────────────────────────────────────────────────────┐
│ 2. Server State Layer                                          │
│ src/hooks/**                                                   │
│ - TanStack Query의 useQuery / useMutation                       │
│ - 조회 캐싱, 재조회, Mutation, invalidateQueries               │
└──────────────────────────────┬────────────────────────────────┘
                               │
                               ▼
┌───────────────────────────────────────────────────────────────┐
│ 3. API Client Layer                                             │
│ src/api/*.http.ts, src/lib/axios.ts                             │
│ - 도메인별 HTTP 함수 및 공통 Axios 인스턴스                      │
│ - JWT 헤더 주입, 인증 오류 처리, 안전한 개발 로그                 │
└──────────────────────────────┬────────────────────────────────┘
                               │
                               ▼
                      Backend REST API

┌───────────────────────────────────────────────────────────────┐
│ 4. Client State Layer (서버 상태와 병렬로 사용)                  │
│ src/store/**, src/context/**                                    │
│ - Zustand: 인증 상태, 전역 Alert 및 MES Live Alert              │
│ - Context: Toast, 일정 관련 UI 상태                             │
└───────────────────────────────────────────────────────────────┘
```

### 계층별 책임

| 계층 | 주요 파일 | 책임 |
| :--- | :--- | :--- |
| View | `src/app`, `src/components` | 페이지 레이아웃, 폼 입력, 버튼 이벤트, 로딩·오류·빈 상태 표시 |
| Server State | `src/hooks` | Query Key, 조회 옵션, Mutation 및 성공 후 캐시 무효화 |
| API Client | `src/api`, `src/lib/axios.ts` | Endpoint 호출, 요청·응답 데이터 처리, 공통 인증 및 오류 정책 |
| Client State | `src/store`, `src/context` | 로그인 상태, Alert 모달, 실시간 경보, Toast 및 일정 UI 상태 |

### 설계상 중요한 구분

- **TanStack Query:** 서버가 원본인 데이터의 조회 결과와 캐시를 관리합니다.
- **Zustand:** 로그인 여부·역할·사용자 식별 정보와 전역 알림처럼 클라이언트에서 즉시 공유해야 하는 상태를 관리합니다.
- **Context:** Toast 및 일정 등 특정 UI 기능의 상태와 동작을 하위 트리에 전달합니다.

서버 데이터를 Zustand에 중복 저장하지 않고 Query Cache를 기준으로 관리함으로써, Mutation 이후 `invalidateQueries`를 통해 필요한 조회 데이터를 다시 동기화할 수 있도록 구성했습니다.

---

## 4. API 연동 및 서버 상태 관리

### 4.1 공통 HTTP 클라이언트

`src/lib/axios.ts`에서 공통 Axios 인스턴스 `api`를 생성하고 API 요청의 기본 정책을 관리합니다.

- `NEXT_PUBLIC_API_BASE_URL`을 정규화해 `baseURL`로 사용합니다.
- 요청 제한 시간은 15초로 설정합니다.
- 브라우저 환경에서 `localStorage`의 JWT를 읽어 `Authorization: Bearer ...` 헤더에 주입합니다.
- `FormData` 요청에서는 브라우저가 Content-Type 경계를 설정할 수 있도록 기존 Content-Type 헤더를 제거합니다.
- `401`은 인증 만료 흐름으로 처리하고, `403`은 접근 권한 안내 Alert를 표시합니다.
- 로컬 개발 환경에서만 요청·응답 오류 정보를 출력하며 민감한 키를 마스킹합니다.

### 4.2 주요 API 매핑

아래 Endpoint는 프론트엔드 API 모듈에서 확인한 경로입니다. 요청·응답 필드는 대표적인 타입 또는 실제 사용 코드 기준으로 요약했으며, 전체 DTO 계약은 백엔드 명세와 함께 관리하는 것이 좋습니다.

| 도메인 | HTTP Method & Endpoint | 프론트엔드 모듈 | Query / Mutation 관리 |
| :--- | :--- | :--- | :--- |
| 인증 | `POST /api/auth/login`<br>`POST /api/auth/register` | `auth.http.ts` | `useLoginMember`, `useRegisterMember` |
| 사용자 프로필 | `GET /api/user/profile`<br>`POST /api/members/change-password` | `auth.http.ts` | `useGetUserProfile` 등 |
| 공정 라인 | `GET /api/process/lines`<br>`POST /api/process/lines`<br>`PATCH /api/process/lines/:id/status`<br>`GET /api/process/lines/history` | `mes.http.ts` | `useProcessLines.ts`의 조회·등록·상태 변경 훅 |
| 생산 실적 | `GET /api/analytics/records`<br>`POST /api/analytics/records` | `mes.http.ts` | 대시보드에서 `useQuery` 직접 사용 및 수동 새로고침 |
| 품질 검사 | `GET /api/quality/inspections`<br>`POST /api/quality/inspections` | `mes.http.ts` | 대시보드에서 `useQuery` 직접 사용 |
| 설비 | `GET /api/equipment/status`<br>`POST /api/equipment/status`<br>`PATCH /api/equipment/status/:id` | `mes.http.ts` | `useEquipment` |
| 부품 SCM | `GET /api/scm/components`<br>`POST /api/scm/components` | `mes.http.ts` | `useSCM` |
| 인사 | `GET /api/admin/employees`<br>`PATCH /api/admin/employees/:id` | `hr.http.ts` | `useHr` |
| 가입 승인 | `GET /api/admin/pending-users`<br>`POST /api/admin/pending-users/:id/approve`<br>`PATCH /api/admin/pending-users/:id/reject` | `hr.http.ts` | 승인·반려 성공 후 관련 Query 무효화 |
| 사내 주소록 | `GET /api/employees/directory` | `hr.http.ts` | `useGetEmployeeDirectory` |
| 쪽지 | `GET /api/messages/received`<br>`GET /api/messages/sent`<br>`POST /api/messages`<br>`PATCH /api/messages/:id/read`<br>`DELETE /api/messages/:id` | `message.http.ts` | `useMessage` |
| 일정 | `GET /api/schedules`<br>`POST /api/schedules`<br>`POST /api/schedules/public`<br>`PATCH /api/schedules/:id`<br>`DELETE /api/schedules/:id` | `schedule.http.ts` | `useSchedule` |
| 공휴일 | `GET /api/holidays?year={year}&month={month}` | `holidays.ts` | 연·월 기준 조회 함수 |

### 4.3 캐시 동기화 전략

Mutation 성공 이후 관련 Query Key만 무효화해 변경된 데이터가 다시 조회되도록 구성했습니다.

| 사용자 작업 | 성공 후 동기화 대상 |
| :--- | :--- |
| 공정 라인 등록 | `process-lines` |
| 공정 라인 상태 변경 | `process-lines`, `process-history` |
| 부품 등록 | `scm-components` |
| 사원 정보 수정 | 사원 목록 Query |
| 신규 가입 승인 | 대기자 목록, 사원 목록, 주소록 Query |
| 쪽지 발송 | 보낸 쪽지 Query |
| 쪽지 읽음 처리 | 받은 쪽지 Query |
| 쪽지 삭제 | 받은 쪽지 및 보낸 쪽지 Query |
| 일정 등록·수정·삭제 | `schedules` |

### 4.4 폴링 기반 데이터 갱신

대시보드에서는 공정 라인, 생산 실적, 품질 검사, 설비, 부품 데이터를 각각 15초 간격으로 재조회합니다. `MesAlertWatcher`도 설비와 부품 데이터를 15초 간격으로 조회하며, 받은 쪽지 목록은 `useMessage`에서 30초 간격으로 재조회합니다.

폴링은 서버가 변경 사항을 주기적으로 조회하는 방식이며 WebSocket 기반 Push 통신과는 구분됩니다. 따라서 문서와 발표에서는 “15초 주기 폴링 기반 갱신”이라고 표현하는 것이 정확합니다.

---

## 5. 클라이언트 상태 및 인증·권한 처리

### 5.1 Zustand 상태 관리

| Store | 관리 상태 | 사용 목적 |
| :--- | :--- | :--- |
| `useAuthStore` | `token`, `username`, `empId`, `role`, `isAuth`, `isInitialized` | 로그인·로그아웃, 새로고침 후 인증 상태 복원 |
| `useAlertStore` | Alert 표시 여부, 메시지, 타입 및 확인 동작 | 화면 전역에서 공통 Alert 표시 |
| `useMesAlertStore` | 현재 MES Live Alert 및 표시·해제 함수 | 설비 이상 및 재고 부족 경보 표시 |

### 5.2 인증 흐름

1. 로그인 성공 시 `useAuthStore.login()`에서 토큰과 사용자 정보를 저장합니다.
2. 새로고침 시 `initializeAuth()`가 저장된 토큰의 Payload를 확인하고 만료 여부 및 역할·사번 정보를 검사합니다.
3. 유효하지 않은 인증 정보는 제거하고 인증되지 않은 상태로 초기화합니다.
4. Axios Request Interceptor가 저장된 JWT를 API 요청 헤더에 주입합니다.
5. 보호된 레이아웃의 `AuthGuard`가 인증 초기화 완료 여부와 로그인 상태를 확인합니다.

> JWT Payload의 만료 시각 확인은 클라이언트 UX를 위한 보조 검사입니다. 실제 접근 권한 검증은 백엔드에서도 수행되어야 합니다.

### 5.3 401 / 403 예외 처리

- **401 Unauthorized:** 로그인 요청 자체가 아닌 상태에서 인증 오류가 발생하면 현재 경로와 Query String을 `sessionStorage`의 `postLoginRedirect`에 저장하고, Auth Store를 로그아웃 상태로 초기화한 뒤 로그인 화면(`/`)으로 이동합니다. 로그인 화면에서 인증 만료 안내에 사용할 `authExpired` 값도 저장합니다.
- **403 Forbidden:** 권한 부족 안내 Alert를 표시합니다.
- **개발 로그 보호:** `sanitizeForLog()`가 객체와 배열을 재귀적으로 순회하고 `authorization`, `token`, `password`, `secret`, API Key 등의 민감한 키 값을 `[redacted]`로 치환합니다.

### 5.4 역할 기반 화면 접근 제어

`AuthGuard`는 선택적으로 `requiredRole`을 전달받아 로그인 여부와 역할을 함께 검사할 수 있습니다. 제공된 코드에서는 인사 관리 레이아웃에 `requiredRole="ADMIN"`이 적용되어 있습니다. 보호 영역 전체의 모든 관리자 페이지에 동일한 역할 제한이 적용된다고 표현하지 않고, 실제 가드가 적용된 경로를 기준으로 설명해야 합니다.

프론트엔드 가드는 화면 접근을 제어하는 UX 계층이며, 보안의 최종 경계는 백엔드 API의 인증·인가 검증입니다.

---

## 6. 디자인 토큰 및 테마 시스템

`src/assets/css/theme.ts`에서 원시 색상 팔레트와 의미 기반 시맨틱 토큰을 분리하고, `ThemeProviderWrapper`가 현재 테마를 styled-components의 `ThemeProvider`로 전달합니다.

### 6.1 토큰 구조

- **Primitive Palette:** Blue, Gray, Status 색상처럼 원시 색상 값을 정의합니다.
- **Base Tokens:** 타이포그래피 크기·굵기, 모서리 반경 등 테마와 무관한 공통 규칙을 정의합니다.
- **Semantic Tokens:** `primary`, `bg`, `text`, `border`, `status`, `shadows`처럼 UI에서 의미를 기준으로 참조하는 값을 정의합니다.

컴포넌트가 색상 코드를 직접 사용하는 대신 의미 기반 토큰을 참조하면 테마 변경 시 개별 컴포넌트의 수정 범위를 줄일 수 있습니다.

### 6.2 3가지 테마 모드

| 토큰 | Light | Dark | High Contrast |
| :--- | :--- | :--- | :--- |
| `colors.primary.default` | `#004b9c` | `#66a3e0` | `#3385d6` |
| `colors.bg.canvas` | `#f4f6f8` | `#0f172a` | `#000000` |
| `colors.text.primary` | `#222222` | `#f8fafc` | `#ffffff` |
| `colors.status.danger.text` | `#e53935` | `#fca5a5` | `#ff4d4d` |
| `shadows.subtle` | `0 2px 4px rgba(0, 0, 0, 0.05)` | `0 2px 4px rgba(0, 0, 0, 0.4)` | `none` |

### 6.3 테마 초기화 및 전환

- 초기 React 상태는 SSR 환경에서 브라우저 저장소를 참조하지 않도록 `light`로 설정합니다.
- 클라이언트 마운트 후 `localStorage`의 `mes-ui-theme-mode` 값을 복원합니다.
- 저장된 테마가 없으면 `prefers-color-scheme: dark`를 확인해 OS 다크 모드를 반영합니다.
- 테마가 변경되면 `document.documentElement`의 `data-theme` 속성과 `localStorage` 값을 동기화합니다.
- Header 등 하위 컴포넌트는 `useThemeMode()`를 통해 테마를 조회하거나 전환할 수 있습니다.

> 고대비 테마는 별도 색상·테두리 토큰을 제공하는 구현입니다. WCAG AAA 등 접근성 적합성을 보장한다고 단정하려면 실제 텍스트·배경 조합별 명도 대비 측정이 추가로 필요합니다.

---

## 7. 핵심 트러블슈팅 및 기술적 의사결정

### Case 1. JWT 만료 시 세션 정리와 원래 경로 복귀

- **Problem:** API 요청 중 토큰이 만료되면 사용자가 인증 오류를 인지하지 못하거나, 로그인 후 기존 작업 화면으로 돌아가기 어려울 수 있습니다.
- **Cause:** 토큰 만료에 따른 401 응답을 화면마다 개별 처리하면 인증 상태 초기화와 이동 정책이 중복될 수 있습니다.
- **Solution:** Axios Response Interceptor에서 로그인 요청 여부와 현재 경로를 확인합니다. 인증이 필요한 요청에서 401이 발생하면 현재 경로를 `postLoginRedirect`에 저장하고 Auth Store를 로그아웃 처리한 뒤 로그인 화면으로 이동합니다. 로그인 화면은 저장된 경로를 읽어 로그인 완료 후 복귀할 수 있도록 연결합니다.
- **Result:** 인증 만료 처리를 공통 인터셉터로 모으고, 로그인 이후 원래 접근 경로를 복원할 수 있는 흐름을 구성했습니다.
- **Tech:** Axios Interceptor, Zustand, `sessionStorage`, Next.js Navigation

> **정확성 메모:** 제공된 소스에서는 `_retry` 플래그를 이용한 요청 재시도 로직은 확인되지 않았습니다. 따라서 “401 무한 재요청을 `_retry`로 차단했다”는 설명은 현재 소스 기준으로 사용하지 않는 것이 안전합니다. 현재 구현은 재시도보다 로그아웃 및 로그인 이동으로 세션을 정리하는 방식입니다.

### Case 2. 폴링 데이터 갱신 시 숫자 UI의 시각적 흔들림 완화

- **Problem:** 대시보드와 운영 화면에서 수치가 갱신될 때 숫자 글리프 폭 차이로 카드 내부 숫자와 주변 요소가 미세하게 흔들려 보일 수 있습니다.
- **Cause:** 기본 숫자 폰트는 숫자마다 글리프 폭이 다를 수 있습니다.
- **Solution:** 주요 수치 스타일에 `font-variant-numeric: tabular-nums`를 적용해 숫자 폭을 일정하게 표시합니다. 대시보드에서는 SVG 기반 Sparkline과 차트를 함께 사용해 수치 추이를 보조적으로 표현합니다.
- **Result:** 수치가 변경될 때 숫자 폭 차이로 인한 시각적 흔들림을 줄이고, 운영 지표의 비교 가능성을 높였습니다.
- **Tech:** CSS `tabular-nums`, SVG Polyline, Recharts, React `useMemo`

### Case 3. SSR과 브라우저 테마 설정 간 초기화 차이 대응

- **Problem:** 서버 렌더링 단계에서는 브라우저의 `localStorage` 값을 읽을 수 없으므로, 저장된 테마와 초기 렌더링 상태가 달라질 수 있습니다.
- **Cause:** 서버와 클라이언트가 첫 렌더링에서 서로 다른 테마 값을 기준으로 UI를 만들면 초기 화면의 스타일 차이가 발생할 수 있습니다.
- **Solution:** 초기 상태를 `light`로 고정하고, 클라이언트 마운트 이후 `useEffect`에서 저장된 테마 또는 OS 다크 모드 설정을 복원합니다. 이후 `data-theme` 속성과 styled-components ThemeProvider 상태를 동기화합니다.
- **Result:** 브라우저 전용 저장소 접근을 클라이언트 마운트 이후로 분리해 SSR 환경에서의 테마 초기화 흐름을 명확히 했습니다.
- **Tech:** Next.js App Router, React `useEffect`, `localStorage`, `prefers-color-scheme`, styled-components

### Case 4. 주기적 설비·재고 조회에서 동일 경보가 반복 노출되는 문제

- **Problem:** 설비와 부품 데이터를 15초마다 조회하는 과정에서 동일한 이상 상태가 계속 감지되면 같은 경보가 반복해서 표시될 수 있습니다.
- **Cause:** 폴링은 동일한 이상 데이터를 여러 번 반환할 수 있으므로, 데이터 조회와 경보 노출을 별도 기준으로 관리하지 않으면 같은 상태를 매번 새로운 이벤트처럼 처리하게 됩니다.
- **Solution:** `MesAlertWatcher`에서 `useRef`로 `Set`을 유지하고 설비 ID·상태 또는 부품 ID·재고량을 조합한 키를 기록해 이미 알린 항목을 중복 노출하지 않도록 처리합니다. 정상 복구 또는 재고 회복 시 기록을 제거해 이후 재발생 경보가 다시 감지될 수 있도록 구성합니다.
- **Result:** 컴포넌트가 유지되는 동안 동일한 경보의 반복 노출을 줄이고, 상태가 회복된 후 재발생하는 경보를 다시 감지할 수 있는 구조를 마련했습니다.
- **Tech:** TanStack Query `refetchInterval`, React `useEffect`, `useRef`, JavaScript `Set`, Zustand

> **추가 점검:** 제공된 ZIP의 `MesAlertWatcher.tsx`에서는 부품 경보 등록 키(`scm-${id}-${stockQuantity}`)와 회복 시 삭제 키(`scm-${id}`)가 서로 다릅니다. 이 상태에서는 회복 후 기존 키가 남을 수 있으므로 두 키 생성 규칙을 동일하게 맞춰야 합니다. 또한 `useRef` 기반 기록은 컴포넌트가 언마운트되면 초기화됩니다. `sessionStorage`까지 사용하도록 최신 코드에서 개선했다면, 해당 구현을 반영한 소스를 기준으로 이 항목의 해결 방법과 결과를 갱신하는 것이 좋습니다.

---

## 8. 기술적 한계와 후속 개선 과제

현재 구현을 과장 없이 설명하고, 다음 개선 방향까지 제시하면 기술적 판단력을 더 잘 보여줄 수 있습니다.

| 구분 | 현재 확인된 구현 | 후속 개선 방향 |
| :--- | :--- | :--- |
| 실시간 데이터 | 15초·30초 주기의 Polling | 서버 부하와 최신성 요구를 비교해 폴링 주기 조정 또는 WebSocket/SSE 검토 |
| 인증 | 클라이언트 JWT 만료 확인 및 401 세션 정리 | 서버 측 권한 검증을 최종 보안 경계로 유지하고 토큰 저장·갱신 정책 검토 |
| 권한 제어 | `AuthGuard`의 선택적 `requiredRole`, 인사 레이아웃 ADMIN 적용 | 관리자 전용 경로별 가드 적용 범위 점검 및 백엔드 권한 검증 테스트 |
| 경보 중복 방지 | `useRef`의 Set으로 컴포넌트 생존 기간 동안 중복 감지 | 안정적인 경보 ID 규칙 통일, 복구 시 키 삭제 검증, 필요 시 `sessionStorage` 지속성 적용 |
| 데이터 계층 | 도메인 Custom Hook과 페이지 직접 Query 호출이 혼재 | 반복되는 Query 로직을 도메인 훅으로 점진적 통합 |
| DTO 안정성 | 일부 API 함수에서 구체적인 응답 타입이 부족함 | 요청·응답 DTO 타입을 API 모듈에 명시하고 런타임 응답 검증 검토 |
| 품질 기능 | 검사 결과 관리 화면 | AI 추론 연동 여부와 검사 데이터 출처를 명확히 분리해 문서화 |
| 접근성 | 고대비 테마 및 의미 기반 상태 색상 제공 | WCAG 대비율, 키보드 탐색, 스크린리더 레이블 점검 |

### 지표 명칭에 대한 주의

대시보드의 `lineRunRate`는 전체 라인 중 `RUNNING` 상태인 라인의 비율로 계산합니다. 이는 라인 상태 기반 가동 비율이며, 설비종합효율(OEE)의 Availability·Performance·Quality를 종합 산출한 값과는 다릅니다. 따라서 발표에서는 “라인 가동 비율”이라고 표현하고, 실제 OEE를 구현한 것처럼 설명하지 않는 것이 정확합니다.

또한 대시보드의 생산 추이 차트는 날짜 기준 최근 7일 집계가 아니라 조회된 생산 실적 중 일부 최근 레코드를 사용합니다. 따라서 “7일 생산량 추이” 대신 “최근 생산 실적 추이”라고 설명하는 것이 소스와 일치합니다.

---

## 9. 프로젝트 구조

```text
mes-frontend/
└── src/
    ├── app/
    │   ├── (protected)/       # 인증이 필요한 화면
    │   │   ├── admin/         # 대시보드, 공정, 품질, 인사 등 관리 화면
    │   │   └── settings/      # 보호된 설정 화면
    │   ├── auth/              # 로그인, 회원가입, 비밀번호 찾기
    │   └── layout.tsx         # Root Layout 및 Provider 구성
    ├── api/                   # 도메인별 Axios API 함수
    ├── components/            # 공통 UI, 레이아웃, 모달, Provider
    ├── context/               # Toast 및 일정 Context
    ├── hooks/                 # TanStack Query 기반 도메인 훅
    ├── lib/                   # Axios 인스턴스 및 공통 유틸리티
    ├── store/                 # Zustand 전역 상태
    ├── types/                 # 도메인 타입 정의
    ├── ui/                    # 재사용 UI 컴포넌트
    └── assets/css/            # 테마 및 화면별 스타일
```

---

## 마무리

Project-MES 프론트엔드는 제조 운영 도메인을 기준으로 화면을 구성하고, TanStack Query와 Zustand를 역할에 따라 분리해 서버 데이터와 클라이언트 상태를 관리합니다. Axios 공통 인터셉터로 인증 및 오류 처리 정책을 모으고, 디자인 토큰과 3가지 테마 모드를 통해 여러 운영 화면에서 일관된 UI를 제공하도록 설계했습니다.

특히 대시보드 폴링, Mutation 이후 캐시 동기화, 인증 만료 시 경로 복귀, 설비·재고 경보 중복 방지와 같은 사례를 통해 단순 화면 구현을 넘어 운영 데이터의 흐름과 사용자 경험을 함께 고려한 프론트엔드 구현을 목표로 했습니다.
