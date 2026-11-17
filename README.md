# 🏭 Project-MES \| Smart Factory Manufacturing Execution System

> 제조 현장의 생산·공정·품질·설비·자재 데이터를 통합 관리하는 MES 웹
> 애플리케이션입니다.

Project-MES는 제조 현장에서 분산되어 관리되는 생산 실적, 공정 상태, 품질
검사, 클린룸 설비, 부품 재고 정보를 하나의 웹 시스템에서 조회하고
관리하기 위해 개발한 풀스택 프로젝트입니다.

단순한 CRUD 화면 구현을 넘어, **서버 상태와 클라이언트 상태의 분리, 공통
API 통신 및 예외 처리, JWT 인증, 역할 기반 API 접근 제어, 주기적 데이터
모니터링, 재사용 가능한 디자인 토큰**을 적용하는 데 중점을 두었습니다.

------------------------------------------------------------------------

## 📌 목차

-   [프로젝트 개요](#-프로젝트-개요)
-   [주요 기능](#-주요-기능)
-   [기술 스택](#-기술-스택)
-   [상세 설계 문서](#-상세-설계-문서-architecture--technical-specs)
-   [시스템 아키텍처](#-시스템-아키텍처)
-   [프론트엔드 설계](#-프론트엔드-설계)
-   [인증 및 권한 관리](#-인증-및-권한-관리)
-   [주요 기술 구현](#-주요-기술-구현)
-   [트러블슈팅](#-트러블슈팅)
-   [프로젝트 구조](#-프로젝트-구조)
-   [실행 방법](#-실행-방법)
-   [환경 변수](#-환경-변수)
-   [개발을 통해 얻은 경험](#-개발을-통해-얻은-경험)

------------------------------------------------------------------------

## 📑 상세 설계 문서 (Architecture & Technical Specs)

프로젝트의 프론트엔드 설계 및 구현 과정을 상세히 정리한 문서입니다.

**도메인별 기능 정의, API 및 DTO 연동 명세, 4-Layer 아키텍처, 상태 관리 전략, 디자인 시스템** 등 프로젝트의 핵심 설계 내용을 확인할 수 있습니다.

- 📄 [프론트엔드 아키텍처 및 API·기능 설계 명세서](./docs/PROJECT_MES_ARCHITECTURE.md)

> 단순한 기능 구현을 넘어 요구사항 분석부터 데이터 흐름 설계, 상태 관리 및 UI 시스템 구축까지 프론트엔드 개발 전반의 설계 과정을 담았습니다.


------------------------------------------------------------------------

## 📖 프로젝트 개요

  -----------------------------------------------------------------------
  항목                                내용
  ----------------------------------- -----------------------------------
  프로젝트명                          Project-MES

  유형                                스마트팩토리 제조 실행 시스템(MES)

  개발 형태                           풀스택 웹 애플리케이션

  Frontend                            Next.js App Router, React,
                                      TypeScript

  Backend                             Node.js, Express

  Database                            SQLite

  ORM                                 Sequelize

  주요 관심사                         제조 데이터 통합 관리, 데이터
                                      정합성, 인증·권한, 유지보수성
  -----------------------------------------------------------------------

### 해결하고자 한 문제

제조 현장의 생산·품질·설비·자재 정보가 분산되어 있으면 전체 운영 상황을
빠르게 파악하기 어렵고, 상태 변경 이력이나 재고 위험을 놓칠 수 있습니다.

Project-MES는 다음과 같은 업무를 한 곳에서 관리할 수 있도록
구성했습니다.

-   생산 목표와 실적, 양품·불량 수량 및 수율 확인
-   공정 라인 상태 조회와 상태 변경 이력 관리
-   제품 시리얼 단위 품질 검사 결과 관리
-   클린룸 설비의 온도·습도 및 상태 모니터링
-   부품별 현재 재고와 안전 재고 관리
-   직원 정보와 신규 가입 승인 관리
-   사내 쪽지 및 일정 관리

------------------------------------------------------------------------

## 🧩 주요 기능

  --------------------------------------------------------------------------
  기능                    주요 내용                  구현 포인트
  ----------------------- -------------------------- -----------------------
  통합 대시보드           생산·공정·품질·설비·재고   TanStack Query 기반
                          현황 요약                  데이터 조회 및 주기적
                                                     갱신

  공정 라인 관리          라인 목록, 가동 상태 변경, `useQuery`,
                          변경 사유 및 이력 조회     `useMutation`,
                                                     `invalidateQueries`

  생산 실적·수율          생산 실적 등록 및 목표     입력값 기반 계산 및
                          대비 실적·수율 확인        조회 데이터 관리

  품질 검사               시리얼 단위 검사           검사 이력 조회 및
                          결과(PASS/FAIL)와 불량     조건별 필터링
                          사유 관리                  

  클린룸 관리             구역별 설비 상태와         주기적 조회 및 임계
                          온도·습도 확인             상태 감지

  부품 SCM                부품 재고·안전 재고 및     재고 임계치 비교 및
                          부족 상태 관리             경보

  인사 관리               직원 정보 조회 및 신규     관리자 API 권한 검증,
                          가입 승인                  직원 정보 관리

  사내 쪽지               수신함·발신함 및 읽음 상태 API 연동 및 상태 갱신
                          관리                       

  일정 관리               개인·공용 일정 및 공휴일   일정 데이터 관리와
                          표시                       캘린더 UI

  마이페이지              기본 정보 및 계정 관련     사용자 정보 조회 및
                          메뉴                       계정 UI

  인증                    로그인·회원가입·세션 복원  JWT, Zustand, Axios
                                                     Interceptor
  --------------------------------------------------------------------------

> 품질 검사 화면은 검사 유형과 PASS/FAIL 결과를 관리하는 기능입니다.
> 별도의 AI 추론 모델을 호출하는 비전 검사 엔진이 포함된 것으로 설명하지
> 않습니다.

------------------------------------------------------------------------

## 🛠 기술 스택

### Frontend

  기술                      사용 목적
  ------------------------- -----------------------------------------------
  Next.js 16 (App Router)   페이지 라우팅 및 보호 레이아웃 구성
  React 19                  컴포넌트 기반 UI 구현
  TypeScript                API 응답 및 도메인 데이터 타입 관리
  TanStack Query v5         서버 상태 조회, 캐싱, Mutation 및 캐시 무효화
  TanStack Table            테이블 데이터 표현 및 관리
  Zustand                   인증 및 전역 UI 상태 관리
  Axios                     공통 HTTP Client 및 Interceptor
  Styled-Components         테마 기반 컴포넌트 스타일링
  Tailwind CSS v4           유틸리티 기반 스타일링
  Recharts                  데이터 시각화
  React Icons               아이콘 UI

### Backend

  기술          사용 목적
  ------------- -------------------------------
  Node.js       JavaScript 런타임
  Express 5     REST API 서버
  Sequelize 6   ORM 및 데이터베이스 모델 관리
  SQLite        파일 기반 관계형 데이터베이스
  JWT           사용자 인증 토큰 발급 및 검증
  bcryptjs      비밀번호 해시 처리
  dotenv        환경 변수 관리

------------------------------------------------------------------------

## 🏗 시스템 아키텍처

### 전체 데이터 흐름

``` text
┌─────────────────────────────────────────────┐
│                 Frontend                    │
│                                             │
│  View Layer                                 │
│  Next.js Pages / React Components           │
│                 │                           │
│                 ▼                           │
│  Custom Hooks                               │
│  TanStack Query                             │
│                 │                           │
│                 ▼                           │
│  API Client Layer                           │
│  Axios / Domain API Modules                 │
│                 │                           │
└─────────────────┼───────────────────────────┘
                  │ HTTP / JSON
                  ▼
┌─────────────────────────────────────────────┐
│                 Backend                     │
│                                             │
│  Express REST API                           │
│       │                                     │
│       ├─ JWT Authentication                 │
│       ├─ Role Authorization                 │
│       └─ Request Validation                 │
│       │                                     │
│       ▼                                     │
│  Sequelize ORM                              │
│       │                                     │
│       ▼                                     │
│  SQLite Database                            │
└─────────────────────────────────────────────┘

Client State:
Zustand - 인증 상태 및 전역 UI 상태
```

### 프론트엔드 4-Layer 구조

프론트엔드는 화면, 서버 데이터 로직, HTTP 통신을 분리해 컴포넌트가 API
구현 세부사항에 직접 의존하지 않도록 구성했습니다.

  -----------------------------------------------------------------------
  Layer                   역할                    주요 위치
  ----------------------- ----------------------- -----------------------
  View                    화면 렌더링과 사용자    `src/app`,
                          인터랙션                `src/components`

  Custom Hooks            서버 데이터 조회·변경   `src/hooks`
                          및 캐시 관리            

  API Client              도메인별 HTTP 요청      `src/api`,
                          캡슐화                  `src/lib/axios.ts`

  Client State            인증 및 전역 UI 상태    `src/store`,
                                                  `src/context`
  -----------------------------------------------------------------------

서버에서 가져오는 데이터는 TanStack Query가 관리하고, 로그인 상태나 전역
알림처럼 클라이언트에서 관리하는 상태는 Zustand 및 Context로
분리했습니다.

예를 들어 공정 라인 페이지는 `useFetchProcessLines()`를 호출해 데이터를
사용하고, 실제 요청은 `src/api/mes.http.ts`의 API 함수가 담당합니다.

------------------------------------------------------------------------

## 🧱 프론트엔드 설계

### 1. 서버 상태 관리 - TanStack Query

서버에서 조회한 데이터의 캐싱과 재요청, 변경 후 갱신을 TanStack Query로
관리합니다.

-   `useQuery`: 공정 라인, 이력, 설비, 부품 등의 조회
-   `useMutation`: 등록 및 상태 변경 요청
-   `useQueryClient`: Mutation 성공 후 관련 캐시 무효화
-   `refetchInterval`: 모니터링 데이터의 주기적 재조회

공정 상태 변경 예시:

``` tsx
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

상태 변경 요청이 성공하면 공정 목록과 변경 이력 쿼리를 함께
무효화합니다. 이후 최신 데이터를 다시 조회해 두 화면의 데이터가 서로
다른 상태로 남지 않도록 했습니다.

### 2. 클라이언트 상태 관리 - Zustand

Zustand는 서버 데이터가 아닌 브라우저 전역에서 공유해야 하는 상태를
관리합니다.

`useAuthStore`에서 관리하는 주요 상태:

-   `token`: JWT
-   `username`: 사용자 이름
-   `empId`: 사번
-   `role`: 사용자 권한(`ADMIN`, `EMPLOYEE`)
-   `isAuth`: 로그인 여부
-   `isInitialized`: 인증 상태 초기화 여부

새로고침 시 `initializeAuth()`에서 저장된 토큰과 사용자 정보를 확인하고,
JWT 만료 여부를 검사해 인증 상태를 복원합니다.

### 3. API 통신 공통화 - Axios

`src/lib/axios.ts`에서 공통 Axios 인스턴스를 생성하고 Request / Response
Interceptor를 적용했습니다.

**Request Interceptor** - LocalStorage에 저장된 JWT를
`Authorization: Bearer` 헤더에 주입 - FormData 요청에서는 Content-Type을
직접 지정하지 않도록 처리

**Response Interceptor** - 401: 현재 경로 저장, 로그아웃 처리 및 로그인
페이지 이동 - 403: 권한 부족 전역 알림 표시 - 응답 데이터에서 사용자에게
보여줄 안전한 오류 메시지 추출 - 로컬 개발 환경에서 민감한 값이 로그에
노출되지 않도록 마스킹

### 4. 전역 UI 상태 및 알림

Zustand 기반 Store와 Provider를 활용해 페이지 전반에서 공유하는 알림
상태를 관리합니다.

설비 이상이나 안전 재고 미달과 같은 모니터링 경보는 `useMesAlertStore`와
`MesAlertWatcher`를 통해 표시합니다.

### 5. 디자인 시스템 및 테마

Styled-Components의 ThemeProvider를 활용해 테마를 관리합니다.

-   Light
-   Dark
-   High Contrast

원시 색상과 UI 역할에 따른 시맨틱 색상 토큰을 분리해 컴포넌트가 특정 HEX
값에 직접 의존하지 않도록 구성했습니다.

테마 선택은 LocalStorage에 저장하며, `ThemeProviderWrapper`에서 초기
설정을 복원하고 HTML 루트의 `data-theme` 속성과 동기화합니다.

------------------------------------------------------------------------

## 🔐 인증 및 권한 관리

### 인증 흐름

``` text
[로그인 요청]
     │
     ▼
[Express API]
     │
     ├─ 사용자 조회
     ├─ bcrypt 비밀번호 검증
     ├─ 계정 승인 및 활성 상태 확인
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
     ├─ 비로그인: 로그인 페이지
     └─ 인증 확인: 보호 페이지 렌더링
```

### JWT 및 서버 권한 검증

-   비밀번호는 `bcryptjs`로 해시 처리해 저장합니다.
-   로그인 성공 시 JWT를 발급합니다.
-   프론트엔드는 Axios Request Interceptor를 통해 토큰을 요청 헤더에
    포함합니다.
-   백엔드는 `verifyToken` 미들웨어에서 토큰을 검증합니다.
-   관리자 전용 API에는 `verifyAdmin` 미들웨어를 적용해 `ADMIN` 권한을
    확인합니다.

프론트엔드 라우트 가드는 사용자 경험을 위한 화면 접근 제어이며, 실제
데이터 접근 권한은 백엔드 API에서도 검증하도록 구성했습니다.

### 신규 가입 승인 흐름

1.  사용자가 회원가입을 진행합니다.
2.  비밀번호를 해시화해 User 정보를 저장합니다.
3.  관리자가 승인 대기 사용자를 조회합니다.
4.  승인 시 사번을 생성하고 Employee 정보를 등록합니다.
5.  User와 Employee 정보를 연결하고 승인 및 계정 상태를 갱신합니다.

승인 과정의 Employee 생성과 User 갱신은 Sequelize Transaction으로 묶어
데이터 정합성을 유지하도록 구현했습니다.

------------------------------------------------------------------------

## ⚙️ 주요 기술 구현

### 주기적 설비·재고 모니터링

`MesAlertWatcher`에서 인증된 사용자를 대상으로 설비 및 부품 데이터를
15초 간격으로 조회합니다.

``` tsx
const equipmentQuery = useFetchEquipment({
  enabled: isAuthenticated,
  refetchInterval: 15000,
});

const scmQuery = useFetchComponents({
  enabled: isAuthenticated,
  refetchInterval: 15000,
});
```

조회된 데이터를 기준으로 설비의 `WARNING` / `ERROR` 상태와 부품의 안전
재고 미달 여부를 확인하고, 조건에 해당하면 전역 경보를 표시합니다.

### 경보 중복 방지 및 복구 처리

경보 식별 키를 이용해 동일한 이상 상태가 반복적으로 감지되더라도 중복
알림이 발생하지 않도록 관리합니다.

설비가 정상 상태로 복구되거나 부품 재고가 안전 재고 이상으로 회복되면
기존 경보 이력을 정리해, 이후 새로운 이상 상황이 발생했을 때 다시 알림을
표시할 수 있도록 합니다.

### 관리자 초기 계정 생성

백엔드의 `seed-admin.js`를 통해 서버 시작 전에 초기 관리자 계정을
확인하고 필요한 경우 생성합니다.

-   DB 연결 및 Sequelize 모델 동기화
-   기존 관리자 존재 여부 확인
-   환경 변수의 관리자 계정 정보 확인
-   비밀번호 bcrypt 해시 처리
-   Employee와 User 생성
-   Transaction으로 두 데이터 생성 작업 처리

------------------------------------------------------------------------

## 🧯 트러블슈팅

### 1. 실시간 설비 경보 중복 발생 및 새로고침 후 재발 문제

#### Problem

MES 실시간 모니터링 기능에서 설비의 `WARNING` 또는 `ERROR` 상태, 부품의
안전 재고 미달 상태를 감지하면 경보 Toast를 표시하도록 구현했습니다.

설비 및 부품 데이터를 15초 간격으로 폴링하기 때문에 동일한 이상 상태가
반복 감지되어 Toast가 계속 표시될 수 있었습니다.

초기에는 `useRef`와 `Set`을 사용해 중복 경보를 방지했지만, 페이지를
새로고침하면 동일한 경보가 다시 발생하는 문제가 있었습니다.

#### Cause

-   `useRef`는 컴포넌트가 마운트되어 있는 동안 값을 유지합니다.
-   페이지 새로고침 시 컴포넌트가 다시 마운트되면서 기존 `Set` 데이터가
    초기화됩니다.
-   서버에서 기존 `WARNING` 또는 `ERROR` 상태를 다시 조회하면 중복
    여부를 판단할 기록이 사라집니다.

즉, 경보 발생 이력을 컴포넌트 내부 메모리에만 저장한 것이
원인이었습니다.

#### Solution

경보 발생 이력을 `sessionStorage`에 저장하도록 개선했습니다.

-   `Set`을 이용해 동일 경보의 중복 발생 방지
-   `sessionStorage`에 경보 발생 이력을 저장해 새로고침 이후에도 유지
-   컴포넌트 초기 실행 시 저장된 경보 이력 복원
-   설비가 정상 상태로 복구되거나 부품 재고가 안전 재고 이상으로
    회복되면 해당 경보 이력 삭제
-   복구 후 동일 대상에서 새로운 이상이 발생하면 다시 경보 표시

#### Result

-   15초 주기의 폴링에서도 동일 경보가 반복 표시되는 현상 개선
-   페이지 새로고침 이후에도 기존 경보 발생 이력 유지
-   설비 및 부품 상태가 복구된 후 새로운 이상이 발생하면 다시 경보 표시
-   브라우저 세션 범위에서 경보 중복 방지 상태 유지

#### Tech

`React useRef`, `Set`, `sessionStorage`, `TanStack Query`, `useEffect`

------------------------------------------------------------------------

### 2. 공정 상태 변경 후 목록과 이력 데이터 불일치

#### Problem

공정 라인의 상태를 변경한 직후 라인 목록과 하단 상태 변경 이력 간에
데이터 시차가 발생할 수 있었습니다.

#### Cause

상태 변경 API 요청이 성공하더라도 이미 조회된 TanStack Query 캐시는
자동으로 최신 서버 데이터로 바뀌지 않습니다.

#### Solution

공정 상태 변경을 `useMutation`으로 관리하고, 성공 콜백에서 관련 쿼리를
무효화했습니다.

``` tsx
onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: ["process-lines"],
  });

  queryClient.invalidateQueries({
    queryKey: ["process-history"],
  });
}
```

#### Result

-   상태 변경 후 공정 목록과 변경 이력의 최신 데이터 재조회
-   수동 새로고침 없이 변경 결과 반영
-   서로 연관된 서버 데이터의 화면 동기화 개선

#### Tech

`TanStack Query`, `useMutation`, `useQueryClient`, `invalidateQueries`

------------------------------------------------------------------------

### 3. API 인증 오류 처리의 중복 및 민감 정보 로그 노출 방지

#### Problem

각 API 호출 위치에서 인증 오류와 일반 오류를 개별적으로 처리하면 중복
코드가 증가하고, 디버깅 과정에서 토큰이나 비밀번호와 같은 민감 정보가
로그에 노출될 위험이 있었습니다.

#### Cause

HTTP 요청과 응답에 대한 공통 처리 로직이 API 호출부에 분산되어 있으면
오류 정책을 일관되게 적용하기 어렵습니다.

#### Solution

공통 Axios 인스턴스와 Request / Response Interceptor를 구성했습니다.

-   Request Interceptor에서 JWT 자동 주입
-   401 발생 시 현재 경로를 `sessionStorage`의 `postLoginRedirect`에
    저장하고 로그아웃 후 로그인 페이지로 이동
-   403 발생 시 권한 부족 전역 알림 표시
-   `sanitizeForLog()`를 통해 `authorization`, `token`, `password` 등의
    민감 키 값을 마스킹
-   `pickDisplayMessage()`로 내부 서버 오류 메시지가 사용자에게 그대로
    노출되지 않도록 안전한 메시지 추출

#### Result

-   인증 오류 처리 로직 공통화
-   로그인 만료 후 기존 접근 경로 복귀를 위한 정보 보존
-   개발 로그의 민감 정보 노출 위험 감소
-   사용자에게 표시되는 오류 메시지 일관성 개선

#### Tech

`Axios Interceptor`, `JWT`, `sessionStorage`, `sanitizeForLog`,
`pickDisplayMessage`

------------------------------------------------------------------------

### 4. 테마 변경 시 컴포넌트별 스타일 관리 문제

#### Problem

컴포넌트 스타일에 색상 값이 직접 작성되어 있으면 다크 모드나 고대비
모드를 추가할 때 여러 스타일 파일을 개별적으로 수정해야 합니다.

#### Cause

색상 값과 색상의 사용 목적이 분리되어 있지 않아 테마별 스타일을 일관되게
관리하기 어려웠습니다.

#### Solution

원시 색상 팔레트와 역할 기반 시맨틱 토큰을 분리하고,
`ThemeProviderWrapper`에서 Light / Dark / High Contrast 테마를
관리하도록 구성했습니다.

-   `theme.ts`에서 테마별 색상 정의
-   Styled-Components ThemeProvider로 현재 테마 전달
-   LocalStorage에 선택한 테마 저장
-   HTML 루트의 `data-theme` 속성과 동기화

#### Result

-   테마별 색상 정책을 한 곳에서 관리
-   개별 컴포넌트의 스타일 수정 부담 감소
-   라이트·다크·고대비 테마 간 일관성 확보

#### Tech

`Styled-Components`, `ThemeProvider`, `ThemeProviderWrapper`,
`Context API`, `LocalStorage`

------------------------------------------------------------------------

## 📁 프로젝트 구조

``` text
Project-MES-dev/
│
├── docs/
│   └── PROJECT_MES_ARCHITECTURE.md
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
│       │   ├── auth/
│       │   └── page.tsx
│       │
│       ├── api/          # 도메인별 API 함수
│       ├── hooks/        # TanStack Query 커스텀 훅
│       ├── store/        # Zustand 전역 상태
│       ├── context/      # React Context
│       ├── components/
│       │   └── provider/ # 공통 Provider 및 모니터링 컴포넌트
│       ├── assets/
│       │   └── css/      # 테마 및 공통 스타일
│       ├── lib/          # Axios 및 공통 유틸리티
│       └── types/        # 타입 정의
│
└── mes-backend/
    ├── src/
    │   ├── model/        # Sequelize 모델
    │   ├── routes/       # API 라우터 (프로젝트 구성에 따름)
    │   ├── db.*          # DB 연결 모듈
    │   └── server.ts     # Express 서버
    ├── dist/             # TypeScript 빌드 결과물
    ├── seed-admin.js     # 초기 관리자 계정 생성
    └── package.json
```

------------------------------------------------------------------------

## 🚀 실행 방법

### Prerequisites

-   Node.js
-   npm

SQLite를 사용하므로 별도의 DB 서버를 설치하지 않고 파일 기반
데이터베이스를 사용할 수 있습니다.

### 1. 프로젝트 Clone

``` bash
git clone <repository-url>
cd Project-MES-dev
```

### 2. Backend 실행

``` bash
cd mes-backend
npm install
npm run dev
```

배포 환경에서 `npm start`를 사용하는 경우에는 사전에 TypeScript 빌드가
필요합니다.

``` bash
npm run build
npm start
```

`start` 스크립트는 `seed-admin.js`를 실행한 뒤 빌드된 서버를 시작하도록
구성되어 있습니다.

### 3. Frontend 실행

새 터미널에서 프로젝트 루트 기준으로 실행합니다.

``` bash
cd mes-frontend
npm install
npm run dev
```

개발 서버가 실행되면 터미널에 표시되는 로컬 주소로 접속합니다.


------------------------------------------------------------------------

## 🔑 환경 변수

실제 값이나 운영 비밀번호는 저장소에 커밋하지 않고 각 환경에서 별도로
설정해야 합니다.

### Frontend

개발 환경 (`mes-frontend/.env.local`):

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

배포 환경 (`mes-frontend/.env.production`):

```env
NEXT_PUBLIC_API_BASE_URL=http://heartbreakkid.co.kr/showcase
```

### Backend (`mes-backend/.env`)

```env
PORT=4000
JWT_SECRET=jwt_secret_key
ADMIN_EMAIL=관리자_이메일
ADMIN_PASSWORD=관리자_비밀번호
HOLIDAY_API_KEY=holiday_api_key
```

------------------------------------------------------------------------


## 📚 관련 문서

-   [프론트엔드 아키텍처 및 핵심 설계
    명세서](./docs/PROJECT_MES_ARCHITECTURE.md)

------------------------------------------------------------------------

## 💡 개발을 통해 얻은 경험

### 1. 데이터 흐름과 상태 관리 설계

TanStack Query와 Zustand의 역할을 구분해 서버 상태와 클라이언트 상태를
분리했습니다. 이를 통해 서버 데이터 캐싱과 전역 UI 상태가 서로 다른
목적에 맞게 관리되도록 구성했습니다.

### 2. 공통 API 통신 및 예외 처리

Axios Interceptor를 이용해 인증 헤더 주입, 인증 오류 분기, 안전한 오류
메시지 추출 및 로그 마스킹을 공통화했습니다.

### 3. 데이터 정합성을 고려한 UI 구현

공정 상태 변경 후 관련 목록과 이력 데이터를 함께 갱신하고, 설비·재고
경보가 복구 상태와 연결되도록 구현하며 화면에 표시되는 데이터의 일관성을
고려했습니다.

### 4. 제조 도메인에 대한 이해

생산 실적, 품질 검사, 설비 상태, 안전 재고 등 제조 현장의 업무 개념을
데이터 구조와 UI 흐름으로 연결하는 경험을 쌓았습니다.

### 5. 유지보수성을 고려한 구조화

도메인별 API 함수와 Custom Hook, 전역 Store, 테마 토큰을 분리해 기능
추가와 변경에 대응하기 쉬운 구조를 고민했습니다.

------------------------------------------------------------------------

## 👤 Author

Project-MES 개발 프로젝트
