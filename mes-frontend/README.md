# 🏭 Smart Factory MES (Manufacturing Execution System)

> **제조 현장의 데이터 정합성 확보와 생산·공정·재고·품질 관리를 위한 MES 솔루션**
>
> 본 프로젝트는 제조 실행 시스템(MES)의 주요 업무 프로세스를 웹 환경에서 관리하기 위해 개발한 풀스택 애플리케이션입니다. 생산 실적 추적, 공정 상태 관리, 품질 검사, SCM 자재 관리 및 클린룸 모니터링 기능을 구현하고, 효율적인 상태 관리와 예외 처리를 통해 데이터의 신뢰성과 사용자 편의성을 높이는 데 중점을 두었습니다.

---

## 1. 📌 프로젝트 개요 (Overview)

제조 현장에서는 공정별 데이터 누락, 재고 수량 불일치, 생산 현황 파악 지연 등으로 인해 업무 효율성과 데이터 신뢰성이 저하될 수 있습니다.

**Project-MES**는 이러한 문제를 개선하고 제조 현장의 주요 업무를 통합적으로 관리하기 위해 개발했습니다.

### 프로젝트 목표

- **생산 및 공정 관리:** 작업 지시부터 생산 진행 상태 및 설비 가동 현황까지 통합 관리
- **데이터 정합성 확보:** 공정 상태 변경 및 자재 입출고 이력 관리를 통한 데이터 신뢰성 향상
- **품질 관리:** 공정별 품질 검사 및 불량 이력 추적
- **통합 모니터링:** 생산 현황, 공정 이력, 클린룸 환경 정보 등을 시각화하여 관리 효율성 향상

---

## 2. 🛠 기술 스택 및 선정 이유 (Tech Stack & Why)

| 구분 | 기술 스택 | 선정 이유 |
| :--- | :--- | :--- |
| Frontend | Next.js 15 (App Router) | 파일 기반 라우팅과 서버·클라이언트 컴포넌트를 활용한 페이지 구조화 |
| Language | TypeScript / JavaScript (ES6+) | 명확한 타입 정의를 통한 데이터 구조 관리 및 개발 안정성 향상 |
| State Management | Zustand | 인증 상태 및 전역 알림 등 클라이언트 상태 관리 |
| Server State | TanStack Query (React Query) | API 데이터 캐싱, 서버 상태 동기화 및 쿼리 무효화 관리 |
| HTTP Client | Axios | 공통 API 인스턴스 및 Request / Response Interceptor 구성 |
| Styling | Styled-components | 컴포넌트 단위 스타일 관리 및 동적 스타일링 |
| Backend | Node.js / Express | 비동기 API 서버 구축 및 RESTful API 제공 |
| ORM | Sequelize | 데이터베이스 모델 정의 및 SQL 쿼리 추상화 |
| Database | Oracle Database 21c XE | 관계형 데이터 모델링 및 제약조건을 통한 데이터 무결성 관리 |

---

## 3. 🏗 시스템 아키텍처 및 폴더 구조 (Architecture & Directory)

### Frontend Architecture

```text
mes-frontend/
└── src/
    ├── app/
    │   ├── (protected)/
    │   │   └── admin/       # 인증이 필요한 관리자 페이지
    │   └── auth/            # 인증 관련 페이지
    │
    ├── api/                 # 도메인별 API 통신 모듈
    │   ├── mes.http.ts
    │   ├── hr.http.ts
    │   └── auth.http.ts
    │
    ├── components/          # 공통 UI 및 재사용 컴포넌트
    ├── hooks/               # 비즈니스 로직 Custom Hooks
    ├── store/               # Zustand 전역 상태 관리
    ├── types/               # TypeScript 타입 정의
    ├── lib/                 # Axios 및 공통 유틸리티
    └── ui/                  # 공통 UI 요소
```

### 주요 설계 방향

- **Domain-oriented API:** 업무 도메인별 API 모듈을 분리하여 통신 로직 관리
- **Custom Hooks:** API 호출 및 비즈니스 로직을 컴포넌트에서 분리
- **State Separation:** Zustand를 통한 클라이언트 상태와 React Query를 통한 서버 상태 분리
- **Component Reusability:** 공통 UI 및 모달 컴포넌트를 분리하여 재사용성 향상

---

## 4. ⭐ 핵심 구현 기능 (Key Features)

### 1) 생산 및 공정 관리 (Process Management)

- 작업 지시 및 생산 진행 현황 관리
- 공정별 설비 가동 상태 조회 및 상태 변경
- 공정 상태 변경 이력 관리
- 생산 라인별 진행 상황 모니터링

### 2) 품질 검사 및 클린룸 모니터링 (Quality & Cleanroom)

- 공정별 품질 검사 및 불량 정보 관리
- 품질 검사 결과에 따른 승인 및 반려 처리
- 클린룸 환경 데이터 조회 및 시각화
- 품질 관련 이력 및 검사 결과 추적

### 3) 자재 및 재고 관리 (SCM)

- 자재 입고 및 출고 관리
- 자재별 재고 현황 조회
- 자재 입출고 이력 관리
- 생산 및 자재 관련 데이터 연계

### 4) 인사 및 조직 관리 (HR Management)

- 사원 정보 및 부서 관리
- 사원별 재직 상태 관리
- 사원 검색 및 조건별 필터링
- 사용자 권한 및 계정 상태 관리

### 5) 일정 및 알림 관리 (Schedule & Notification)

- 공용 및 개인 일정 관리
- 일정별 알림 설정 및 관리
- 일정 상태에 따른 진행 현황 표시
- 신규 메시지 및 읽음 상태 관리

---

## 5. 🔐 인증 및 권한 관리 아키텍처 (Authentication & Authorization)

JWT 기반 인증과 Zustand 전역 상태 관리를 활용하여 사용자 인증 상태를 관리하고, AuthGuard와 Axios Interceptor를 통해 보호된 페이지 접근 및 API 인증 예외 상황을 처리했습니다.

### 1) 인증 상태 관리 (Zustand Auth Store)

- JWT Token, Username, Role, 인증 여부(`isAuth`) 관리
- 인증 초기화 여부(`isInitialized`)를 통한 인증 상태 확인 시점 제어
- 로그인 및 로그아웃 시 전역 인증 상태 변경
- 컴포넌트 간 인증 정보 공유를 통한 일관된 상태 관리

### 2) 보호 페이지 접근 제어 (AuthGuard)

- Next.js App Router의 보호된 관리자 라우트에 AuthGuard 적용
- `isInitialized`를 먼저 확인하여 인증 초기화 전 잘못된 페이지 이동 방지
- `isAuth`를 통한 사용자 로그인 여부 확인
- `requiredRole`과 사용자 `role`을 비교하여 역할별 접근 권한 검증
- 비로그인 사용자는 로그인 페이지(`/`), 권한이 일치하지 않는 사용자는 권한 없음 페이지(`/forbidden`)로 이동
- 접근 권한 확인 전 로딩 UI를 표시하고, 검증 완료 후 보호된 페이지 렌더링

### 3) API 인증 처리 (Axios Interceptor)

- Request Interceptor에서 LocalStorage의 JWT를 Authorization 헤더에 자동 주입
- Response Interceptor에서 API 인증 및 권한 관련 오류 공통 처리
- 401 발생 시 Zustand Auth Store의 `logout()` 호출 및 로그인 페이지 이동
- 403 발생 시 Alert Store를 통한 권한 부족 안내
- 로그인 요청 및 로그인 페이지에서 중복 리다이렉트 방지

### 4) 로그인 후 접근 경로 복원 (Post-login Redirect)

- 인증 실패 시 현재 페이지 경로를 sessionStorage의 `postLoginRedirect`에 저장
- 로그인 이후 기존 접근 경로로 복귀할 수 있도록 처리

### 5) API 예외 처리 및 민감 정보 보호

- `sanitizeForLog()`를 구현하여 Authorization, Token, Password 등 민감 데이터 마스킹
- 재귀적 데이터 순회를 통해 중첩 객체 및 배열 내부의 민감 정보까지 처리
- `pickDisplayMessage()`를 통해 사용자에게 표시할 안전한 에러 메시지 추출
- 서버 내부 예외 메시지 및 500번대 오류의 직접적인 노출 방지
- 로컬 개발 환경에서만 상세 API 에러 로그를 출력하도록 분리

### 인증 처리 흐름

```text
[사용자 로그인]
       │
       ▼
[로그인 API 요청]
       │
       ▼
[Zustand Auth Store]
       │
       ├── Token
       ├── Username
       ├── Role
       └── isAuth
       │
       ▼
[AuthGuard]
       │
       ▼
[인증 초기화 여부 확인]
       │
       ├── 초기화 중 → Loading UI
       │
       ▼
[로그인 여부 확인]
       │
       ├── 비로그인 → 로그인 페이지
       │
       ▼
[Role 권한 확인]
       │
       ├── 권한 불일치 → /forbidden
       │
       ▼
[관리자 페이지 접근 허용]


[API 요청]
       │
       ▼
[Axios Request Interceptor]
       │
       ▼
[JWT Authorization 헤더 주입]
       │
       ▼
[Backend API]
       │
       ▼
[Axios Response Interceptor]
       │
       ├── 401 → logout() → 로그인 페이지
       │
       ├── 403 → 권한 부족 Alert
       │
       └── 정상 응답 → 데이터 반환
```

---

## 6. ⚡ 트러블슈팅 및 기술적 고민 (Troubleshooting & Engineering Decisions)

### 🚨 Case 1. Axios Interceptor 기반 인증 예외 처리 및 민감 정보 보호

- **문제 상황 (Problem)**
  - JWT 인증 실패 시 보호된 페이지에 대한 접근 및 세션 처리 필요
  - API 요청마다 개별적인 에러 처리가 필요하여 중복 코드 발생
  - 401(인증 실패)과 403(권한 부족)에 대한 일관된 예외 처리 필요
  - 개발 환경에서 API 로그 출력 시 토큰 및 비밀번호 등 민감 정보 노출 가능성 존재

- **원인 분석 (Cause)**
  - Axios 요청 및 응답에 대한 공통 처리 계층 부재
  - 인증 상태와 HTTP 상태 코드에 따른 예외 처리 로직 분산
  - API 디버깅 로그에 대한 민감 데이터 보호 처리 부족

- **해결 방법 (Solution)**
  1. **Axios Interceptor 공통화**
     - Request Interceptor에서 LocalStorage의 JWT를 Authorization 헤더에 자동 주입
     - Response Interceptor에서 API 에러를 공통 처리하도록 구성
     - FormData 요청 시 Content-Type을 제거하여 multipart boundary 자동 설정 지원

  2. **401 인증 실패 처리**
     - 로그인 요청 및 로그인 페이지에서 중복 리다이렉트 방지
     - 현재 접근 경로를 sessionStorage의 `postLoginRedirect`에 저장
     - Zustand Auth Store의 `logout()`을 호출하여 인증 상태 초기화
     - 로그인 페이지로 이동하도록 처리

  3. **403 권한 부족 처리**
     - 401 인증 실패와 403 권한 부족을 구분하여 처리
     - 공통 Alert Store를 통해 사용자에게 권한 부족 안내 메시지 출력

  4. **민감 정보 보호 및 에러 메시지 정규화**
     - `sanitizeForLog()`를 구현하여 Authorization, Token, Password 등 민감 데이터 마스킹
     - 재귀적 데이터 순회를 통해 중첩 객체와 배열 내부의 민감 정보까지 처리
     - `pickDisplayMessage()`를 통해 사용자에게 표시할 안전한 에러 메시지 추출
     - 서버 내부 예외 메시지 및 500번대 오류의 직접적인 노출 방지

- **개선 결과 (Result)**
  - 인증 및 권한 관련 예외 처리 로직을 공통화하여 코드 재사용성 향상
  - 인증 실패 시 로그아웃 및 로그인 페이지 이동을 일관되게 처리
  - 로그인 이후 기존 접근 경로를 복원할 수 있는 기반 마련
  - 개발 환경에서 민감 정보 노출을 방지하고 API 디버깅 편의성 개선
  - 서버 내부 오류 메시지의 무분별한 사용자 노출 방지

### 🚨 Case 2. 공정 설비 상태 변경 및 이력 관리의 일관성 확보

- **문제 상황 (Problem)**
  - 설비 가동 상태를 변경한 후 목록에 표시되는 상태와 변경 이력 간의 일관된 관리 필요
  - 상태 변경 결과가 화면에 적절하게 반영되지 않을 경우 사용자가 최신 정보를 확인하기 어려움

- **원인 분석 (Cause)**
  - 설비의 현재 상태와 변경 이력을 함께 관리해야 하는 구조
  - 상태 변경 API 처리 후 관련 조회 데이터의 갱신 필요

- **해결 방법 (Solution)**
  1. **상태 변경 로직 구현**
     - 설비 상태 변경을 위한 API 요청을 Mutation으로 분리
     - 상태 변경 결과에 따라 사용자에게 처리 결과 안내
  2. **변경 이력 관리**
     - 설비 상태 변경 이력을 별도로 조회할 수 있도록 구성
     - 현재 상태와 과거 변경 내역을 구분하여 관리
  3. **서버 상태 동기화**
     - 상태 변경 성공 후 관련 React Query 캐시를 갱신하여 최신 데이터 반영

- **개선 결과 (Result)**
  - 설비의 현재 가동 상태와 변경 이력을 구분하여 관리
  - 상태 변경 이후 최신 정보를 확인할 수 있는 관리 기능 구현
  - 공정 설비의 상태 변경 과정에 대한 추적 가능성 향상

### 🚨 Case 3. API 공통 예외 처리 및 사용자 피드백 개선

- **문제 상황 (Problem)**
  - API 요청 실패 및 서버 오류 발생 시 사용자에게 일관된 안내 메시지를 제공할 필요가 있음
  - 개별 컴포넌트에서 에러 메시지를 처리할 경우 중복 코드가 발생하고 사용자 피드백 방식이 달라질 수 있음

- **원인 분석 (Cause)**
  - 비동기 API 통신 과정에서 발생하는 예외를 공통적으로 처리할 수 있는 구조 필요
  - 전역 알림 상태와 API 응답 처리를 연계할 필요가 있음

- **해결 방법 (Solution)**
  1. **공통 알림 상태 관리**
     - Zustand 기반 `useAlertStore`를 통해 전역 알림 상태 관리
     - `QueryAlertProvider`와 연계하여 API 요청 과정의 에러 및 사용자 피드백 처리
  2. **에러 메시지 표준화**
     - 서버 응답에서 사용자에게 표시할 메시지를 추출하는 공통 함수 구현
     - 유효하지 않거나 노출하기 부적절한 메시지는 기본 에러 메시지로 대체
  3. **사용자 피드백 통합**
     - 성공, 오류 등 상황에 맞는 알림을 공통 UI로 제공
     - 개별 컴포넌트의 중복된 알림 처리 로직 최소화

- **개선 결과 (Result)**
  - API 예외 상황에 대한 일관된 사용자 피드백 제공
  - 공통 알림 관리로 컴포넌트 간 중복 코드 감소
  - 서버 오류 발생 시 사용자에게 불필요한 내부 정보가 노출되지 않도록 개선

---

## 7. 🚀 로컬 실행 방법 (Getting Started)

### Prerequisites

- Node.js v18 이상
- npm
- Oracle Database 21c XE

### 1) Backend 실행

```bash
cd mes-backend
npm install
npm run dev
```

### 2) Frontend 실행

```bash
cd mes-frontend
npm install
npm run dev
```

### 3) Environment Variables

프로젝트 실행에 필요한 환경 변수는 각 프로젝트의 `.env` 파일에 설정합니다.

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```
---

## 8. 📈 프로젝트를 통해 얻은 경험 (What I Learned)

- Next.js App Router 기반 페이지 구조 및 보호된 라우트 설계 경험
- Zustand와 React Query를 활용한 클라이언트 및 서버 상태 분리 경험
- Axios Interceptor를 활용한 인증 및 API 공통 예외 처리 경험
- Sequelize ORM과 Oracle Database를 활용한 관계형 데이터 관리 경험
- Custom Hooks를 통한 API 통신 및 비즈니스 로직 분리 경험
- 공정 상태 변경과 이력 관리를 통한 데이터 추적 기능 구현 경험
- 사용자 중심의 관리자 UI 및 공통 컴포넌트 설계 경험

---

**Project-MES | Smart Factory Manufacturing Execution System**