# 🏭 Smart Factory MES (Manufacturing Execution System) Front-end & System Architecture

> **제조 현장의 데이터 정합성 확보와 실시간 공정·재고·품질 관리를 위한 풀스택 MES 솔루션**  
> 본 프로젝트는 제조 실행 시스템의 핵심 요구사항인 **생산 실적 추적, 품질 검사(Defect Tracking), SCM 자재 관리, 클린룸 모니터링**을 정밀한 상태 관리와 예외 처리를 기반으로 구현한 웹 애플리케이션입니다.

---

## 1. 📌 프로젝트 개요 (Overview)

제조 현장(Smart Factory)에서는 공정 간 데이터 누락, 재고 수량 불일치, 실시간 생산 현황 파악 지연으로 인한 품질 하자와 생산성 저하 문제가 자주 발생합니다.

**Project-MES**는 다음과 같은 현업 문제를 해결하기 위해 구축되었습니다:
* **실시간 생산 및 공정 관리:** 작업 지시(Work Order) 수립부터 라인별 공정 상태(Process Line Status) 추적을 통한 병목 구간 감지.
* **데이터 정합성 보장:** 자율적 입력 오류 방지 및 상태 전이(State Transition) 검증을 통한 재고(SCM) 및 품질 검사 데이터 신뢰성 확보.
* **직관적인 모니터링 UI:** Cleanroom 환경 데이터, 공정 이력, 일일 생산 실적(Production Record)을 시각화하여 현장 관리자의 의사결정 지원.

---

## 2. 🛠 기술 스택 및 선정 이유 (Tech Stack & Why)

| 구 분 | 기술 스택 | 선정 이유 및 기술적 근거 |
| :--- | :--- | :--- |
| **Front-end** | **Next.js 15 (App Router)** | SSR/CSR 하이브리드 랜더링을 통한 초기 로딩 속도 최적화 및 보안 강화, 라우팅 모듈화 |
| **Language** | **TypeScript / JavaScript (ES6+)** | 엄격한 타입 정의(`src/types/*`)를 통해 공정 데이터/DTO의 타입 안정성 확보 및 런타임 에러 최소화 |
| **State Management** | **Zustand, React Query (@tanstack/react-query)** | 클라이언트 UI 상태(`useAuthStore`, `useAlertStore`)와 서버 캐시 데이터의 명확한 분리 및 효율적 재요청 제어 |
| **Styling** | **Styled-Components / Emotion** | Component-Driven Development(CDD)를 적용하여 MES 관리자 페이지 UI 재사용성 및 동적 스타일링 극대화 |
| **Back-end** | **Node.js (Express) & TypeORM / Prisma** | 비동기 I/O 기반 데이터 처리, ORM을 활용한 데이터베이스 엔티티 구조화 및 SQL 인젝션 방지 |
| **Database** | **MySQL / Relational DB** | 외래키 제약조건 및 트랜잭션을 통한 생산·재고 데이터의 ACID 정합성 보장 |

---

## 3. 🏗 시스템 아키텍처 & 폴더 구조 (Architecture & Directory)

### Frontend Layer Architecture

mes-frontend/src/
├── app/                      # Next.js App Router (Protected Routes & Auth)
│   ├── (protected)/admin/    # MES 관리자 영역 (Analytics, Cleanroom, HR, Process, Quality)
│   └── auth/                 # 인증/로그인 관련 페이지
├── api/                      # Domain-driven HTTP Clients (axios 기반 API 캡슐화)
│   ├── mes.http.ts           # MES 공정/생산 HTTP 통신 모듈
│   ├── hr.http.ts            # 인권/사원 관리 통신 모듈
│   └── auth.http.ts          # JWT/Session 인증 모듈
├── components/               # 재사용 가능한 UI 컴포넌트 & Modal & Layout
├── hooks/                    # 비즈니스 로직 캡슐화 Custom Hooks (useMes, useHr, useSchedule 등)
├── store/                    # Zustand 전역 상태 (인증, 알림 등)
├── types/                    # Domain Type Definitions (Process, HR, Schedule 등)
└── lib/                      # Axios Interceptor 및 공통 유틸리티

## 4. ⭐ 핵심 구현 기능 (Key Features)

### 1) 생산 및 공정 관리 (Process & Work Order Tracking)
* 작업지시서 생성, 라인별 공정 이동(Process Status Log) 기록 및 상태 감시.
* 공정별 설비(Equipment) 가동 상태 모니터링 및 실시간 라인 비가동 알림 제어.

### 2) 품질 검사 및 클린룸 모니터링 (Quality & Cleanroom Control)
* 공정 단계별 불량 유형 집계 및 품질 검사(Quality Inspection) 승인/반려 워크플로우 구현.
* Cleanroom 환경 파라미터(온도, 습도, 미세먼지 농도 등) 모니터링 및 시각화.

### 3) 자율적 SCM & 재고 추적 (Component SCM)
* 자재 입출고 이력 관리 및 생산 실적(Production Record) 연동을 통한 자동 자재 차감 로직 처리.

### 4) 권한 기반 시스템 보안 (RBAC & Auth Guard)
* JWT 기반 인증 guard(`AuthGuard.tsx`) 및 Axios Interceptors를 활용한 토큰 자동 갱신 및 401/403 예외 세션 처리.

---

## 5. ⚡ 트러블슈팅 및 기술적 고민 (Troubleshooting & Engineering Decisions)

### 🚨 Case 1. Axios Interceptor를 통한 토큰 만료 처리 및 Infinite Loop 방지
* **문제 상황:** API 요청 중 JWT 토큰이 만료(401 Unauthorized)되었을 때, 무한 재요청 발생 또는 페이지 튕김 현상 발생.
* **원인 분석:** 예외 처리 로직 내에서 토큰 갱신 실패 시 동일한 Axios 인스턴스로 다시 요청을 보내어 재귀적 401 에러가 발생하는 구조적인 취약점 존재.
* **해결 방법:** `lib/axios.ts` 내에 응답 인터셉터를 구축하고, `isRetry` 플래그 관리 및 토큰 갱신 실패 시 Zustand Auth Store(`useAuthStore.logout()`)를 즉시 호출하여 안전하게 로그인 페이지로 리다이렉트하는 방어 로직 구현.

### 🚨 Case 2. MES 실시간 공정 상태 변경 시 UI 불일치 및 N+1 렌더링 최적화
* **문제 상황:** 공정 라인 상태 업데이트 시 전체 목록이 불필요하게 리렌더링되거나 대용량 공정 데이터 상태 변경 반영이 지연됨.
* **원인 분석:** React Query 캐시 키 세분화 미흡 및 불필요한 상태 렌더링 구독 문제.
* **해결 방법:** `useMes` 커스텀 훅 내에 `useQuery` / `useMutation` 패턴을 정교화하여 성공 시 해당 공정 도메인 캐시만 Selectively Invalidate(선택적 무효화) 처리하도록 구조 변경.

### 🚨 Case 3. 사용자 입력 및 API 예외 상황에 대한 防禦(Defensive) 코딩 및 사용자 피드백
* **문제 상황:** 백엔드 DB 서버 응답 지연이나 Network Error 발생 시 화면 멈춤 현상 및 사용자 안내 부재.
* **원인 분석:** Async API 통신에 대한 공통 예외 핸들링 레이어 부족.
* **해결 방법:** `QueryAlertProvider`와 `useAlertStore`를 연계하여 글로벌 에러 바운더리 구축. 모든 API 에러 수집 시 사용자에게 명확한 에러 메시지를 토스트/모달로 전달하고 런타임 붕괴 방지.

---

## 6. 🚀 로컬 실행 방법 (Getting Started)

### Prerequisites
* Node.js v18.x 이상
* npm 또는 yarn

### 1) Backend 실행
```bash
cd mes-backend
npm install
npm run dev