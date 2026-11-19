# Project-MES | Smart Factory Manufacturing Execution System

> 제조 현장의 생산·공정·품질·설비·자재 데이터를 통합 관리하는 MES 웹 애플리케이션

Project-MES는 제조 현장에서 분산되어 관리되는 생산 실적, 공정 라인 상태, 품질 검사 결과, 클린룸 설비 정보, 부품 재고를 하나의 웹 시스템에서 조회하고 관리하기 위해 개발한 풀스택 프로젝트입니다.

단순한 CRUD 화면 구현을 넘어, **서버 상태와 클라이언트 상태의 책임 분리, 공통 API 통신 및 예외 처리, JWT 인증과 역할 기반 API 권한 검증, 주기적 설비·재고 모니터링, 테마 토큰 관리**를 중심으로 설계했습니다.

---

## 목차

- [프로젝트 개요](#-프로젝트-개요)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시스템 아키텍처](#-시스템-아키텍처)
- [프론트엔드 설계](#-프론트엔드-설계)
- [인증 및 권한 관리](#-인증-및-권한-관리)
- [주요 구현과 기술적 의사결정](#-주요-구현과-기술적-의사결정)
- [트러블슈팅](#-트러블슈팅)
- [프로젝트 구조](#-프로젝트-구조)
- [실행 방법](#-실행-방법)
- [환경 변수](#-환경-변수)
- [개발을 통해 얻은 경험](#-개발을-통해-얻은-경험)
- [상세 설계 문서](#-상세-설계-문서)

---

## 📌 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 프로젝트명 | Project-MES |
| 프로젝트 유형 | 스마트팩토리 제조 실행 시스템(MES) |
| 개발 형태 | 풀스택 웹 애플리케이션 |
| Frontend | Next.js 16 App Router, React 19, TypeScript |
| Backend | Node.js, Express 5, TypeScript/JavaScript |
| Database | SQLite |
| ORM | Sequelize 6 |
| 핵심 관심사 | 제조 데이터 통합 관리, 데이터 정합성, 인증·권한, 유지보수성 |

### 해결하고자 한 문제

제조 현장의 생산·품질·설비·자재 정보가 여러 업무 단위로 분산되면 전체 운영 상황을 빠르게 파악하기 어렵고, 공정 상태 변경 이력이나 재고 위험을 놓칠 수 있습니다.

Project-MES는 다음 업무를 하나의 시스템에서 확인하고 관리할 수 있도록 구성했습니다.

- 생산 목표와 실적, 양품·불량 수량 및 수율 확인
- 공정 라인 상태 조회와 상태 변경 이력 관리
- 제품 시리얼 단위 품질 검사 결과 및 불량 사유 관리
- 클린룸 구역별 설비 상태와 온도·습도 확인
- 부품별 현재 재고와 안전 재고 관리
- 직원 정보 및 신규 가입 승인 관리
- 사내 쪽지와 개인·공용 일정 관리

---

## 🧩 주요 기능

| 도메인 | 주요 기능 | 구현 포인트 |
|---|---|---|
| 통합 대시보드 | 생산·공정·품질·설비·재고 현황 요약 | TanStack Query 기반 조회 및 주기적 갱신 |
| 공정 라인 | 라인 목록, 가동 상태 변경, 변경 사유 및 이력 조회 | `useQuery`, `useMutation`, 관련 Query 캐시 무효화 |
| 생산 실적·수율 | 생산 실적 등록, 목표 대비 실적 및 수율 확인 | 입력값 검증, 수율 계산, 조건별 필터링 |
| 품질 검사 | 시리얼 번호, 검사 유형, PASS/FAIL, 불량 사유 관리 | 검사 이력 조회 및 검색·필터링 |
| 클린룸 | 구역별 설비 상태, 온도·습도 확인 | 주기적 데이터 조회 및 이상 상태(WARNING/ERROR) 감지 |
| 부품 SCM | 부품 재고, 안전 재고 및 부족 상태 관리 | 재고 임계치 비교 및 경보 |
| 인사 관리 | 직원 정보, 가입 승인·반려 | 관리자 API 권한 검증, 사번 발급 |
| 사내 쪽지 | 수신함·발신함, 읽음 상태, 삭제 | API 연동 및 Query 캐시 갱신 |
| 일정 관리 | 개인·공용 일정, 일정 수정·삭제, 공휴일 표시 | 캘린더 UI 및 일정 데이터 관리 |
| 마이페이지 | 기본 정보, 계정 관련 메뉴 | 사용자 정보 조회 및 계정 UI |
| 인증 | 로그인, 회원가입, 세션 복원 | JWT, Zustand, Axios Interceptor |

> **품질 검사 범위:** 제품 시리얼별 검사 이력 관리, 검사 유형 및 PASS/FAIL 판정 결과 관리, 불량 사유 등록 및 조회

---

## 🛠 기술 스택

### Frontend

| 기술 | 사용 목적 |
|---|---|
| Next.js 16 (App Router) | 페이지 라우팅 및 보호 레이아웃 구성 |
| React 19 | 컴포넌트 기반 UI 구현 |
| TypeScript | 도메인 데이터 및 API 응답 타입 관리 |
| TanStack Query v5 | 서버 상태 조회, 캐싱, Mutation, 캐시 무효화 |
| TanStack Table | 테이블 데이터 표현 및 관리 |
| Zustand | 인증 및 전역 UI 상태 관리 |
| Axios | 공통 HTTP Client 및 Request/Response Interceptor |
| Styled-Components | 테마 기반 컴포넌트 스타일링 |
| Tailwind CSS v4 | 유틸리티 기반 스타일링 |
| Recharts | 데이터 시각화 |
| React Icons | 아이콘 UI |

### Backend

| 기술 | 사용 목적 |
|---|---|
| Node.js | JavaScript 런타임 |
| Express 5 | REST API 서버 |
| TypeScript / JavaScript | 서버 및 API 로직 구현 |
| Sequelize 6 | ORM 및 데이터베이스 모델 관리 |
| SQLite | 파일 기반 관계형 데이터베이스 |
| JWT | 사용자 인증 토큰 발급 및 검증 |
| bcryptjs | 비밀번호 해시 처리 |
| dotenv | 환경 변수 관리 |

---

## 🏗 시스템 아키텍처

### 전체 데이터 흐름

```text
┌──────────────────────────────────────────────────────┐
│                     Frontend                         │
│                                                      │
│  View                                                │
│  Next.js Pages / React Components                    │
│          │                                           │
│          ▼                                           │
│  Custom Hooks                                        │
│  TanStack Query                                      │
│          │                                           │
│          ▼                                           │
│  API Client                                          │
│  Axios / Domain API Modules                           │
│          │                                           │
│          └──────────── HTTP / JSON ──────────────┐    │
│                                                  │    │
│  Client State                                    │    │
│  Zustand / React Context                         │    │
└──────────────────────────────────────────────────┼────┘
                                                   │
                                                   ▼
┌──────────────────────────────────────────────────────┐
│                     Backend                          │
│                                                      │
│  Express REST API                                    │
│       │                                              │
│       ├─ JWT Authentication                          │
│       ├─ Role Authorization                          │
│       └─ Request Validation                          │
│       │                                              │
│       ▼                                              │
│  Sequelize ORM                                       │
│       │                                              │
│       ▼                                              │
│  SQLite Database                                     │
└──────────────────────────────────────────────────────┘
```

### 프론트엔드 책임 분리

프론트엔드는 화면, 서버 데이터 처리, HTTP 통신을 분리해 컴포넌트가 API 구현 세부사항에 직접 의존하지 않도록 구성했습니다.

| 영역 | 역할 | 주요 위치 |
|---|---|---|
| View | 화면 렌더링 및 사용자 인터랙션 | `src/app`, `src/components` |
| Custom Hooks | 서버 데이터 조회·변경, 캐시 관리 | `src/hooks` |
| API Client | 도메인별 HTTP 요청 캡슐화 | `src/api`, `src/lib/axios.ts` |
| Client State | 인증 및 전역 UI 상태 관리 | `src/store`, `src/context` |

서버 상태와 클라이언트 상태는 목적에 따라 별도로 관리합니다. TanStack Query는 서버에서 가져온 데이터의 캐시와 갱신을 담당하고, Zustand와 Context는 인증 정보 및 전역 UI 상태를 관리합니다.

예를 들어 공정 라인 화면은 Custom Hook을 통해 데이터를 사용하고, 실제 HTTP 요청은 `src/api/mes.http.ts`의 API 함수가 담당합니다. 인증 상태는 별도의 Zustand Store에서 관리하므로 서버 데이터 캐시와 혼합되지 않습니다.

---

## 🧱 프론트엔드 설계

### 1. 서버 상태 관리 — TanStack Query

서버에서 조회한 데이터의 캐싱, 재요청, 변경 후 갱신을 TanStack Query로 관리합니다.

- `useQuery`: 공정 라인, 변경 이력, 설비, 부품 등의 데이터 조회
- `useMutation`: 데이터 등록 및 상태 변경 요청
- `useQueryClient`: Mutation 성공 후 관련 Query 무효화
- `refetchInterval`: 설비·재고 등 모니터링 데이터의 주기적 재조회

**공정 상태 변경 흐름**

```tsx
export const useUpdateLineStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, reason }) =>
      updateLineStatus(id, status, reason),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["process-lines"],
      });

      queryClient.invalidateQueries({
        queryKey: ["process-history"],
      });
    },
  });
};
```

상태 변경 API가 성공하면 공정 라인 목록과 변경 이력 Query를 함께 무효화합니다. 이를 통해 사용자가 수동으로 새로고침하지 않아도 변경된 상태와 이력을 다시 조회하도록 구성했습니다.

### 2. 클라이언트 상태 관리 — Zustand / Context

Zustand는 여러 화면에서 공유해야 하는 인증 및 전역 UI 상태를 관리합니다.

`useAuthStore`의 주요 상태:

- `token`: JWT
- `username`: 사용자 이름
- `empId`: 사번
- `role`: 사용자 권한(`ADMIN`, `EMPLOYEE`)
- `isAuth`: 로그인 여부
- `isInitialized`: 인증 초기화 여부

`initializeAuth()`에서 LocalStorage의 인증 정보를 확인하고 JWT의 만료 여부를 검사해 새로고침 이후 인증 상태를 복원합니다.

전역 알림은 `useAlertStore`, 실시간 MES 경보는 `useMesAlertStore`로 분리했습니다. 일정 UI에서 공유하는 상태는 React Context를 사용합니다.

### 3. 공통 API 통신 — Axios Interceptor

`src/lib/axios.ts`에서 공통 Axios 인스턴스를 생성하고 Request / Response Interceptor를 적용했습니다.

**Request Interceptor**

- LocalStorage의 JWT를 `Authorization: Bearer` 헤더에 주입
- FormData 요청에서는 브라우저가 multipart boundary를 설정할 수 있도록 `Content-Type` 헤더 제거

**Response Interceptor**

- `401`: 현재 경로를 `sessionStorage`의 `postLoginRedirect`에 저장하고 로그아웃 처리 후 로그인 페이지로 이동
- `403`: 권한 부족 전역 알림 표시
- 서버 응답에서 사용자에게 표시할 안전한 오류 메시지 추출
- 로컬 개발 환경의 오류 로그에서 토큰·비밀번호 등 민감 키 값 마스킹

이를 통해 API 호출부마다 반복하던 인증 예외 및 공통 오류 처리 로직을 한곳에서 관리합니다.

### 4. 주기적 모니터링과 전역 경보

`MesAlertWatcher`에서 인증된 사용자를 대상으로 설비 및 부품 데이터를 조회합니다.

| 대상 | 조회 주기 | 경보 조건 |
|---|---:|---|
| 클린룸 설비 | 15초 | 상태가 `WARNING` 또는 `ERROR` |
| 부품 재고 | 15초 | 현재 재고가 안전 재고 미만이거나 상태가 `DANGER` |

경보는 `useMesAlertStore`를 통해 전역 UI에 표시합니다. 동일한 이상 상태가 반복 조회될 때 Toast가 계속 발생하지 않도록 경보 식별 키를 `Set`으로 관리하고, `sessionStorage`에 저장해 새로고침 이후에도 브라우저 세션 내 중복 표시를 방지합니다.

설비가 `NORMAL`로 복구되거나 부품 재고가 안전 재고 기준 이상으로 회복되면 해당 경보 키를 제거해 이후 새로운 이상 상황을 다시 감지할 수 있도록 했습니다.

### 5. 테마 및 디자인 토큰

`src/assets/css/theme.ts`에서 원시 색상 팔레트와 UI 역할에 따른 시맨틱 토큰을 분리했습니다.

- **Primitive Palette:** 브랜드 색상, Gray, 상태 색상 등 원시 색상 정의
- **Semantic Tokens:** `colors.primary`, `colors.bg`, `colors.text`, `colors.border`, `colors.status` 등 UI 역할에 맞는 색상 정의
- **공통 토큰:** 타이포그래피, 폰트 굵기, 모서리 반경, 그림자 정의

`ThemeProviderWrapper`에서는 다음 세 가지 테마를 관리합니다.

- Light
- Dark
- High Contrast

테마 선택은 LocalStorage에 저장하고, HTML 루트의 `data-theme` 속성과 동기화합니다. `styled.d.ts`에 테마 타입을 선언해 Styled-Components에서 토큰을 타입 안전하게 사용할 수 있도록 구성했습니다.

> Primitive Palette와 Semantic Token을 분리한 2계층 디자인 토큰 구조를 기반으로, Light / Dark / High Contrast 테마를 관리합니다. ThemeProvider를 통해 테마를 공유하고, LocalStorage를 활용해 사용자 설정을 유지하며, Styled-Components 타입 선언으로 테마의 타입 안정성을 확보했습니다.

---

## 🔐 인증 및 권한 관리

### 인증 흐름

```text
[로그인 요청]
     │
     ▼
[Express API]
     │
     ├─ 사용자 조회
     ├─ bcrypt 비밀번호 검증
     └─ 계정 승인 및 활성 상태 확인
     │
     ▼
[JWT 발급]
     │
     ▼
[Frontend Zustand Store]
     │
     ├─ LocalStorage 저장
     └─ 전역 인증 상태 갱신
     │
     ▼
[AuthGuard]
     │
     ├─ 초기화 전: Loading UI
     ├─ 비로그인: 로그인 페이지로 이동
     └─ 인증 확인: 보호 페이지 렌더링
```

### 프론트엔드와 백엔드의 권한 검증

프론트엔드의 `AuthGuard`는 인증 초기화 여부와 로그인 상태를 확인해 보호 페이지 접근을 제어합니다. `requiredRole`이 전달된 화면에서는 사용자 역할도 확인합니다.

백엔드에서는 다음 미들웨어로 API 접근을 검증합니다.

- `verifyToken`: Authorization 헤더의 Bearer JWT를 검증하고 사용자 정보를 요청 객체에 설정
- `verifyAdmin`: 인증된 사용자의 역할이 `ADMIN`인지 확인하고, 관리자 전용 API 접근을 제한

즉, 프론트엔드 라우트 가드는 화면 접근 제어를 담당하고, 실제 데이터 접근 권한은 백엔드 API에서도 검증하도록 구성했습니다.

### 신규 가입 승인 흐름

1. 사용자가 회원가입 정보를 입력합니다.
2. 백엔드는 비밀번호를 bcrypt로 해시 처리하고 가입 정보를 저장합니다.
3. 관리자가 승인 대기 사용자를 조회합니다.
4. 승인 과정에서 사번을 생성하고 Employee 정보를 등록합니다.
5. User 정보에 사번을 연결하고 승인 및 계정 상태를 갱신합니다.

Employee 생성과 User 갱신은 Sequelize Transaction으로 묶어 승인 처리 도중 일부 데이터만 반영되는 상황을 방지하도록 구현했습니다.

---

## ⚙️ 주요 구현과 기술적 의사결정

### 1. 설비·재고 모니터링의 중복 경보 제어

단순히 일정 주기로 데이터를 조회하는 것만으로는 같은 이상 상태에 대한 알림이 반복될 수 있습니다.

이를 해결하기 위해 다음과 같이 구성했습니다.

1. `MesAlertWatcher`에서 설비와 부품 데이터를 15초 간격으로 조회합니다.
2. 설비 ID와 상태, 부품 ID와 재고 수량을 기준으로 경보 식별 키를 생성합니다.
3. `Set`으로 이미 알림을 표시한 상태인지 확인합니다.
4. `sessionStorage`에 경보 이력을 저장해 새로고침 이후에도 브라우저 세션 내 기록을 복원합니다.
5. 정상 복구 시 해당 키를 제거해 이후 재발한 이상 상태는 다시 알림을 표시합니다.

### 2. 공정 상태와 변경 이력의 동기화

공정 라인의 상태를 변경한 직후 목록과 변경 이력이 서로 다른 데이터를 표시하지 않도록 Mutation 성공 시 관련 Query를 함께 무효화했습니다.

이를 통해 상태 변경 결과가 목록과 이력 화면에 일관되게 반영되도록 했습니다.

### 3. API 오류 처리와 민감 정보 마스킹

공통 Axios Interceptor에서 인증 오류와 일반 오류를 분기하고, 오류 로그 및 사용자 메시지를 별도로 처리합니다.

- `sanitizeForLog()`: 중첩 객체와 배열을 순회해 `authorization`, `token`, `password`, `secret` 등 민감 키의 값을 마스킹
- `pickDisplayMessage()`: 서버 응답에서 사용자에게 표시할 메시지를 추출하고, 500번대 오류나 내부 예외 패턴은 기본 안내 메시지로 대체
- `401 / 403`: 세션 만료와 권한 부족을 구분해 공통 처리

### 4. 테마 관리 구조화

컴포넌트별 색상 값과 UI 역할을 분리하기 위해 원시 팔레트와 시맨틱 토큰을 구분했습니다. 테마 변경 로직은 `ThemeProviderWrapper`에서 관리해 개별 컴포넌트가 테마 상태를 직접 관리하지 않도록 구성했습니다.

---

## 🧯 트러블슈팅

### Case 1. 15초 폴링에서 동일한 경보가 반복 발생하는 문제

**Problem**

설비의 `WARNING` / `ERROR` 상태나 부품의 안전 재고 미달 상태를 15초마다 조회하면서, 동일한 이상 상태에 대한 Toast가 반복 표시될 수 있었습니다. 초기에는 `useRef`와 `Set`으로 중복을 방지했지만 페이지를 새로고침하면 기록이 초기화되어 기존 이상 상태가 다시 알림으로 표시되었습니다.

**Cause**

`useRef`는 컴포넌트가 마운트된 동안만 값을 유지합니다. 새로고침으로 컴포넌트가 다시 마운트되면 기존 `Set`이 초기화되고, 서버에서 같은 이상 상태를 다시 조회하면서 중복 여부를 판단할 수 없었습니다.

**Solution**

- `Set`으로 중복 경보 식별 키 관리
- `sessionStorage`에 경보 이력 저장
- 컴포넌트 초기 실행 시 저장된 경보 이력 복원
- 설비 정상 복구 및 재고 회복 시 기존 경보 키 삭제

**Result**

- 주기적 조회 중 동일한 경보가 반복 표시되는 현상 개선
- 새로고침 이후에도 브라우저 세션 내 경보 기록 유지
- 정상 복구 이후 동일 대상에서 새로운 이상이 발생하면 다시 알림 표시

**Tech** `useRef`, `Set`, `sessionStorage`, TanStack Query, `useEffect`

### Case 2. 공정 상태 변경 후 목록과 이력 데이터가 일치하지 않는 문제

**Problem**

공정 라인 상태 변경 API가 성공해도 이미 조회된 Query 캐시는 자동으로 최신 서버 데이터로 변경되지 않기 때문에 목록과 변경 이력 간 데이터 시차가 발생할 수 있었습니다.

**Solution**

상태 변경을 `useMutation`으로 관리하고 성공 콜백에서 `process-lines`, `process-history` Query를 함께 무효화했습니다.

**Result**

- 상태 변경 후 관련 데이터 재조회
- 수동 새로고침 없이 변경 결과 반영
- 공정 상태와 변경 이력 간 화면 동기화 개선

**Tech** `useMutation`, `useQueryClient`, `invalidateQueries`

### Case 3. API 인증 오류 처리 중복과 민감 정보 로그 노출 위험

**Problem**

각 API 호출부에서 인증 오류와 일반 오류를 개별적으로 처리하면 중복 코드가 늘어나고, 디버깅 로그에 토큰이나 비밀번호가 포함될 위험이 있었습니다.

**Solution**

공통 Axios 인스턴스와 Interceptor를 구성했습니다. 인증 오류를 공통 분기하고 `sanitizeForLog()`로 민감 키 값을 마스킹했으며, `pickDisplayMessage()`로 사용자에게 노출할 오류 메시지를 정제했습니다.

**Result**

- 인증 오류 처리 로직 공통화
- 로그 내 민감 정보 노출 위험 감소
- 사용자 오류 메시지의 일관성 개선

**Tech** Axios Interceptor, JWT, `sanitizeForLog`, `pickDisplayMessage`

### Case 4. 테마 변경 시 컴포넌트별 스타일 관리 문제

**Problem**

컴포넌트 스타일에 색상 값이 직접 작성되어 있으면 다크 모드나 고대비 모드를 추가할 때 여러 스타일 파일을 개별적으로 수정해야 합니다.

**Solution**

원시 색상 팔레트와 역할 기반 시맨틱 토큰을 분리하고 `ThemeProviderWrapper`에서 Light / Dark / High Contrast 테마를 관리하도록 구성했습니다.

**Result**

- 테마별 색상 정책을 한곳에서 관리할 수 있는 구조 마련
- 개별 컴포넌트 스타일 수정 부담 감소
- 테마 확장 및 공통 스타일 유지보수 기반 확보

**Tech** Styled-Components, ThemeProvider, Context API, LocalStorage

---

## 📁 프로젝트 구조

```text
Project-MES/
├── docs/
│   ├── PROJECT_MES_ARCHITECTURE.md
│   ├── REQUIREMENTS.md
│   └── TEST_CASES.md
│
├── mes-frontend/
│   └── src/
│       ├── app/
│       │   ├── (protected)/
│       │   │   └── admin/
│       │   │       ├── analytics/
│       │   │       ├── cleanroom/
│       │   │       ├── components/
│       │   │       ├── dashboard/
│       │   │       ├── employee/
│       │   │       ├── hr/
│       │   │       ├── messages/
│       │   │       ├── mypage/
│       │   │       ├── process/
│       │   │       └── quality/
│       │   └── auth/
│       │
│       ├── api/          # 도메인별 API 함수
│       ├── hooks/        # TanStack Query 커스텀 훅
│       ├── store/        # Zustand 전역 상태
│       ├── context/      # React Context
│       ├── components/   # 공통 컴포넌트 및 Provider
│       ├── assets/
│       │   └── css/      # 테마 및 공통 스타일
│       ├── lib/          # Axios 및 공통 유틸리티
│       ├── types/        # 도메인 타입
│       └── ui/           # 공통 UI 컴포넌트
│
└── mes-backend/
    ├── src/
    │   ├── model/        # Sequelize 모델
    │   ├── routes/       # 라우터
    │   ├── db.js         # DB 연결
    │   └── server.ts     # Express 서버 및 API
    ├── seed-admin.js     # 초기 관리자 계정 생성
    └── seed.js           # 초기 데이터 생성
```

---

## 🚀 실행 방법

### Prerequisites

- Node.js
- npm

SQLite를 사용하므로 별도의 DB 서버 설치 없이 파일 기반 데이터베이스를 사용할 수 있습니다.

### 1. 프로젝트 Clone

```bash
git clone https://github.com/eukkshin/Project-MES.git
cd Project-MES
```

### 2. Backend 실행

```bash
cd mes-backend
npm install
npm run dev
```

### 3. Frontend 실행

새 터미널에서 프로젝트 루트 기준으로 실행합니다.

```bash
cd mes-frontend
npm install
npm run dev
```

프론트엔드 개발 서버가 실행되면 터미널에 표시되는 로컬 주소로 접속합니다.

### 배포용 Backend 실행

Backend의 `start` 스크립트는 초기 관리자 계정 생성 스크립트 실행 후 빌드 결과물을 실행하도록 구성되어 있습니다.

```bash
cd mes-backend
npm install
npm run build
npm start
```

---

## 🔑 환경 변수

실제 운영 비밀번호와 비밀키는 저장소에 커밋하지 않고 각 환경에서 별도로 설정해야 합니다.

### Frontend — `mes-frontend/.env.local`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

### Frontend — `mes-frontend/.env.production`

```env
NEXT_PUBLIC_API_BASE_URL=https://project-mes-factory.onrender.com
```

### Backend — `mes-backend/.env`

```env
PORT=4000
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
HOLIDAY_API_KEY=your_holiday_api_key
```

---

## 💡 개발을 통해 얻은 경험

### 1. 서버 상태와 클라이언트 상태의 경계 설계

TanStack Query와 Zustand의 책임을 구분해 서버 데이터 캐시와 브라우저 전역 상태를 분리했습니다. 이를 통해 데이터 조회·갱신과 인증·UI 상태를 각각의 목적에 맞게 관리하는 구조를 경험했습니다.

### 2. 데이터 변경 이후 화면 정합성 고려

공정 상태 변경 후 목록과 이력을 함께 갱신하고, 설비·재고 경보가 정상 복구 상태와 연결되도록 구현하며 단순히 API 요청 성공 여부뿐 아니라 화면에 표시되는 데이터의 일관성을 고려했습니다.

### 3. 공통 API 예외 처리와 방어적 로깅

Axios Interceptor를 통해 인증 오류 처리, 사용자 메시지 정규화, 민감 정보 마스킹을 공통화했습니다. API 호출부의 중복을 줄이는 동시에 디버깅 과정의 정보 노출 위험을 고려하는 경험을 쌓았습니다.

### 4. 인증과 권한 검증의 역할 분리

프론트엔드 AuthGuard는 화면 접근을 제어하고, 백엔드 미들웨어는 실제 API 요청의 JWT와 관리자 권한을 검증하도록 구성했습니다. 클라이언트 화면 제어만으로 데이터 접근 권한을 보장할 수 없다는 점을 구조에 반영했습니다.

### 5. 도메인 데이터를 UI 흐름으로 연결

생산 실적, 공정 상태, 품질 판정, 설비 임계치, 안전 재고 등 제조 업무 개념을 조회·등록·상태 변경·경보 흐름으로 연결하며 도메인 중심의 화면 설계 경험을 쌓았습니다.

---

## 📑 상세 설계 문서

프로젝트의 요구사항과 설계 의사결정, 기능 검증 시나리오는 아래 문서에서 확인할 수 있습니다.

- [프론트엔드 아키텍처 및 API·기능 설계 명세서](./docs/PROJECT_MES_ARCHITECTURE.md)
- [도메인 요구사항 정의서](./docs/REQUIREMENTS.md)
- [기능 검증 테스트 케이스](./docs/TEST_CASES.md)

---

## 👤 Author

Project-MES 개발 프로젝트
