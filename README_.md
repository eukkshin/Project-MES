# 🏭 Smart Factory MES (Manufacturing Execution System)

> **제조 현장의 데이터 정합성 확보와 생산·공정·재고·품질 통합 관제를 위한 MES 웹 솔루션**
>
> 제조 실행 시스템(MES)의 핵심 업무 프로세스(생산 실적 추적, 공정 라인 제어, 품질 검사, 부품 SCM, 클린룸 환경 관제)를 웹 환경에서 통합 관리하는 풀스택 애플리케이션입니다. 프론트엔드에서는 **4-Layer 아키텍처 기반 상태 분리, RBAC 라우트 보호, 공통 API 예외 및 민감 정보 마스킹, 2계층 시맨틱 디자인 토큰 시스템**을 구축하여 현장 데이터의 신뢰성과 운영 안정성을 높였습니다.

---

## 📑 상세 설계 문서 (Architecture & Specs)
프론트엔드 관점에서 정리한 **도메인별 기능 정의서, API/DTO 연동 명세, 디자인 시스템 설계**는 아래 문서에서 확인하실 수 있습니다.
* 📄 **[프론트엔드 아키텍처 및 API·기능 설계 명세서](./docs/PROJECT_MES_ARCHITECTURE.md)**

---

## 1. 📌 프로젝트 개요 (Overview)

제조 현장에서는 공정별 데이터 수기 기록으로 인한 누락, 안전 재고 불일치, 비인가 설비 조작 위험 등으로 생산 효율성과 데이터 신뢰성이 저하되는 문제가 발생합니다. **Project-MES**는 이를 해결하기 위해 다음 목표를 중심으로 구축되었습니다.

* **실시간 공정 및 생산 관제:** 라인별 가동 상태(가동/점검/정지) 제어, 변경 이력 추적(`ProcessStatusLog`), 일일 목표 대비 양품·불량 수율(95% 기준) 실시간 분석
* **품질 및 설비·자재 정합성 확보:** 시리얼 단위 품질 검사(PASS/FAIL) 이력 추적, 클린룸 구역별 온·습도 모니터링, 안전 재고 기준 미달 부품 자동 경고(`WARNING`)
* **보안 및 사내 협업 통합:** JWT 기반 역할별 접근 제어(ADMIN / EMPLOYEE), 신규 사원 사번 승인 워크플로우, 사내 쪽지 및 공휴일 연동 일정 관리

---

## 2. 🛠 기술 스택 및 선정 이유 (Tech Stack & Why)

| 구분 | 기술 스택 | 선정 이유 및 기술적 근거 |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 15 (App Router), React** | 라우트 그룹 `(protected)` 기반 인증 레이아웃 분리 및 페이지 구조화 |
| **Language** | **TypeScript / JavaScript (ES6+)** | 도메인별 DTO 및 API 응답 타입 정의(`src/types/*`)를 통한 런타임 안정성 확보 |
| **Server State** | **TanStack Query, TanStack Table** | 비동기 데이터 캐싱, Mutation 후 선택적 쿼리 무효화, 사원·이력 데이터 검색 및 페이지네이션 |
| **Client State** | **Zustand, React Context API** | 인증 세션(`useAuthStore`)·전역 알림(`useAlertStore`)과 서버 캐시 상태의 명확한 책임 분리 |
| **HTTP Client** | **Axios** | 공통 인스턴스 기반 JWT 헤더 자동 주입 및 401/403 인증 예외·에러 메시지 일괄 정규화 |
| **Styling** | **Styled-Components, Tailwind CSS** | 2계층 시맨틱 토큰(`theme.ts`) 기반 다크/고대비 테마 확장 및 컴포넌트 단위 스타일 캡슐화 |
| **Backend & DB** | **Node.js (Express), Sequelize, SQLite** | 경량 관계형 DB(SQLite) 및 Sequelize ORM 기반 모델 정의·마이그레이션과 트랜잭션 데이터 무결성 관리 |

---

## 3. 🏗 프론트엔드 아키텍처 & 폴더 구조 (Architecture & Directory)

컴포넌트가 API 통신이나 에러 처리 세부 구현에 의존하지 않도록 **4-Layer 아키텍처(View → Custom Hooks → API Client → Store)**로 책임을 분리했습니다.

    mes-frontend/src/
    ├── app/
    │   ├── (protected)/admin/   # AuthGuard로 보호되는 관리자·현장 관제 페이지
    │   │   ├── process/         # 공정 라인 가동 제어 및 상태 변경 이력
    │   │   ├── analytics/       # 생산 실적 등록 및 수율(95% 기준) 분석
    │   │   ├── quality/         # AI 비전 품질 검사 및 불량 사유 추적
    │   │   ├── cleanroom/       # 클린룸 구역별 설비 온·습도 관제
    │   │   ├── components/      # 핵심부품 SCM 및 안전 재고 경고 관리
    │   │   ├── hr/ & employee/  # 관리자 사번 승인(RBAC) 및 사내 주소록
    │   │   └── messages/        # 사내 쪽지함 및 실시간 읽음/알림 처리
    │   └── auth/                # 3단계 회원가입(우편번호 API) 및 로그인
    ├── api/                     # 도메인별 HTTP 통신 캡슐화 (mes, hr, schedule, message, auth)
    ├── hooks/                   # TanStack Query 기반 비즈니스 로직 커스텀 훅 (useMes, useHr 등)
    ├── store/                   # Zustand 전역 상태 (useAuthStore, useAlertStore)
    ├── context/                 # 도메인 UI 컨텍스트 (ScheduleContext, ToastContext)
    ├── assets/css/              # 2계층 시맨틱 디자인 토큰(theme.ts) 및 GlobalStyle
    ├── components/ & ui/        # AuthGuard, QueryAlertProvider, ThemeProviderWrapper, 공통 UI
    └── lib/                     # Axios Interceptor, 민감 정보 마스킹 및 에러 메시지 유틸리티

---

## 4. 🔐 인증 및 권한 제어 흐름 (Auth & RBAC)

초기 렌더링 시 인증 상태 확인 전 잘못된 리다이렉트가 발생하는 문제를 막기 위해 `isInitialized` 플래그를 두고, 라우트 가드와 Axios 인터셉터가 유기적으로 동작하도록 설계했습니다.

    [보호 페이지 접근] ──▶ [AuthGuard]
                             ├─ isInitialized === false ──▶ Loading UI 표시 (깜빡임/오작동 방지)
                             ├─ isAuth === false        ──▶ 현재 경로 저장(postLoginRedirect) 후 로그인 이동
                             ├─ role !== requiredRole   ──▶ /forbidden 접근 차단 (예: /admin/hr 관리자 전용)
                             └─ 검증 통과               ──▶ 관리자 페이지 렌더링

    [API 요청/응답]   ──▶ [Axios Interceptor]
                             ├─ Request  ──▶ LocalStorage JWT 자동 주입 (FormData는 boundary 자동 설정)
                             └─ Response ──▶ 401: logout() 후 로그인 이동 / 403: 권한 부족 Alert 출력

---

## 5. ⚡ 트러블슈팅 및 기술적 고민 (Troubleshooting & Engineering Decisions)

### 🚨 Case 1. Axios Interceptor 기반 인증 예외 일괄 처리 및 민감 정보 유출 방어
* **문제 상황:** API 호출마다 개별적인 에러 처리를 작성해 중복 코드가 늘어나고, 401(세션 만료) 시 기존 작업 경로 유실 및 디버깅 로그 내 토큰·비밀번호 노출 위험이 존재했습니다.
* **해결 방법:**
  1. **401/403 분기 및 경로 복원:** Response Interceptor에서 401 발생 시 현재 경로를 `sessionStorage('postLoginRedirect')`에 저장한 뒤 `useAuthStore.logout()`을 실행하고, 로그인 페이지 내 중복 리다이렉트를 차단했습니다. 403 응답은 권한 부족 알림 모달로 분리했습니다.
  2. **재귀적 민감 정보 마스킹(`sanitizeForLog`):** 개발 환경 에러 로깅 시 중첩 객체와 배열 내부까지 재귀 순회하여 `authorization`, `token`, `password` 키 값을 마스킹 처리했습니다.
  3. **에러 메시지 정제(`pickDisplayMessage`):** 서버의 500번대 내부 예외 메시지가 사용자에게 직접 노출되지 않도록 안전한 사용자 안내 메시지만 추출하는 정규화 함수를 적용했습니다.
* **결과:** 모든 도메인 API 모듈에서 인증·보안 예외 처리 코드를 제거하여 유지보수성을 높이고, 로그 보안과 사용자 UX를 동시에 개선했습니다.

### 🚨 Case 2. 공정 라인 상태 변경과 이력 데이터 간 화면 동기화 일관성 확보
* **문제 상황:** 공정 라인 관리(`/admin/process`)에서 설비 가동 상태를 토글하거나 사유를 입력해 변경한 직후, 라인 목록 상태와 하단 변경 이력(`ProcessStatusLog`) 간 데이터 시차가 발생하는 문제가 있었습니다.
* **해결 방법:**
  1. 상태 변경 API를 `useMes` 내부의 `useMutation`으로 캡슐화하고, 관리자 권한(`role === 'ADMIN'`) 검증 하에 원클릭 토글 및 사유 입력 모달 두 가지 UX 흐름을 단일 뮤테이션 로직으로 통합했습니다.
  2. Mutation 성공 콜백(`onSuccess`)에서 공정 라인 목록 쿼리와 상태 변경 이력 쿼리 키를 동시에 선택적 무효화(`invalidateQueries`)하여 변경 즉시 최신 상태와 로그가 동기화되도록 구성했습니다.
* **결과:** 수동 새로고침 없이도 공정 상태와 이력 로그 간의 데이터 정합성을 즉각 보장하게 되었습니다.

### 🚨 Case 3. 전역 알림 스토어(`useAlertStore`)와 `QueryAlertProvider` 연계를 통한 피드백 표준화
* **문제 상황:** 생산 실적 등록, 품질 검사 판정, 사번 승인 등 다양한 비동기 액션 실패 시 컴포넌트마다 alert 처리 방식이 달라 일관된 사용자 피드백 제공이 어려웠습니다.
* **해결 방법:**
  1. Zustand 기반 `useAlertStore`와 최상위 `QueryAlertProvider`를 구축하여 API 요청 과정에서 발생하는 예외를 전역 알림 모달/토스트로 일원화했습니다.
  2. 수율 계산(95% 기준 필터)이나 안전 재고 미달(`currentStock < safetyStock`) 같은 도메인 임계치 경고는 클라이언트 파생 상태로 즉시 시각화하고, 서버 트랜잭션 결과는 전역 피드백 UI로 통일했습니다.
* **결과:** 컴포넌트 내부의 반복적인 `try-catch` 알림 코드를 제거하고 일관된 에러 안내 경험을 구축했습니다.

### 🚨 Case 4. 현장 조도 대응을 위한 2계층 시맨틱 디자인 토큰(`theme.ts`) 체계화
* **문제 상황:** 기존 스타일 파일(`Button.styles.ts`, `Modal.styles.ts` 등)에 브랜드 색상(`#004b9c`, `#e53935`)이 하드코딩되어 있어 공장 제어실(어두운 환경)이나 현장 단말기(강한 조명) 환경에 맞춘 테마 확장이 불가능했습니다.
* **해결 방법:**
  1. 원시 팔레트(`palette`)와 역할 기반 시맨틱 토큰(`colors.primary`, `colors.bg`, `colors.status`)을 분리한 2계층 구조로 `theme.ts`와 `styled.d.ts`를 설계했습니다.
  2. `ThemeProviderWrapper`에서 `lightTheme`, `darkTheme`, `highContrastTheme` 3가지 모드를 관리하고 `localStorage` 및 `data-theme` 속성과 동기화하여 브라우저 기본 UI(`color-scheme`)까지 일관되게 전환되도록 구현했습니다.
* **결과:** 개별 컴포넌트 수정 없이 테마 전환만으로 현장 시인성과 유지보수성을 확보할 수 있는 기반을 마련했습니다.

---

## 6. 🚀 로컬 실행 방법 (Getting Started)

### Prerequisites
* Node.js v18 이상 / npm (SQLite 기반 로컬 파일 DB 자동 연동으로 별도 DB 서버 설치 불필요)

### 1) Backend 실행
    cd mes-backend
    npm install
    npm run dev

### 2) Frontend 실행
    cd mes-frontend
    npm install
    npm run dev

### 3) 환경 변수 설정 (`mes-frontend/.env`)
    NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

---

## 7. 📈 프로젝트를 통해 얻은 경험 (What I Learned)

* **서버·클라이언트 상태 경계 설계:** TanStack Query의 캐시 생명주기와 Zustand 전역 상태의 역할을 명확히 분리하여 불필요한 전역 상태 비대화를 방지한 경험
* **방어적 프론트엔드 보안 아키텍처:** `AuthGuard` 초기화 플래그 제어, Axios 인터셉터 기반 토큰 갱신/세션 만료 처리, 민감 정보 로그 마스킹 등 실무 수준의 예외 방어 구현
* **도메인 특화 UI 엔지니어링:** 스마트팩토리 현장의 가독성을 고려한 시맨틱 디자인 토큰 설계 및 데이터 정합성 중심의 관제 화면 구축 경험