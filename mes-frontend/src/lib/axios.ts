
import axios, { type AxiosInstance, type AxiosError } from "axios";
import { useAlertStore } from "@/store/useAlertStore";
import { useAuthStore } from "@/store/useAuthStore";

export type SafeError = AxiosError & {
  displayMessage?: string;
};

// 로컬 개발 환경 확인
const isLocalDev =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const REDACTED = "[redacted]";

// 민감한 데이터 키 패턴
const SENSITIVE_KEY_PATTERN =
  /(authorization|cookie|set-cookie|token|secret|password|passphrase|api[-_]?key|refresh[-_]?token|access[-_]?token|id[-_]?token)/i;

// 민감한 서버 내부 에러 메시지 패턴
const SENSITIVE_MESSAGE_PATTERN =
  /(exception|stack\s*trace|traceback|caused by:|org\.|java\.|jdbc|sql|at\s+\w+)/i;

// 순수 객체 여부 확인
const isPlainObject = (
  value: unknown
): value is Record<string, unknown> => {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
};

// 민감한 데이터 마스킹
const sanitizeForLog = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeForLog(item));
  }

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        SENSITIVE_KEY_PATTERN.test(key)
          ? REDACTED
          : sanitizeForLog(item),
      ])
    );
  }

  return value;
};

// 중첩된 객체의 특정 경로 접근
const getNestedValue = (
  source: unknown,
  path: string[]
): unknown => {
  let current: unknown = source;

  for (const key of path) {
    if (!isPlainObject(current)) {
      return undefined;
    }
    current = current[key];
  }

  return current;
};

// 사용자에게 보여줄 안전한 에러 메시지 추출
const pickDisplayMessage = (
  data: unknown,
  status?: number
): string => {
  const candidates = [
    getNestedValue(data, ["message"]),
    getNestedValue(data, ["result", "errors", "message"]),
    getNestedValue(data, ["errors", "message"]),
  ];

  for (const candidate of candidates) {
    if (typeof candidate !== "string") continue;

    const trimmed = candidate.trim();

    if (!trimmed) continue;
    if (status && status >= 500) continue;
    if (SENSITIVE_MESSAGE_PATTERN.test(trimmed)) continue;
    if (trimmed.length > 500) continue;

    return trimmed;
  }

  return "요청 처리 중 오류가 발생했습니다.";
};

// API URL 정규화
const normalizeApiBaseURL = (value: string): string => {
  const trimmed = value.trim();

  if (!trimmed || trimmed === "/") {
    return "";
  }

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  ) {
    return trimmed.replace(/\/+$/, "");
  }

  return (trimmed.startsWith("/") ? trimmed : `/${trimmed}`)
    .replace(/\/+$/, "");
};

const apiBaseURL = normalizeApiBaseURL(
  process.env.NEXT_PUBLIC_API_BASE_URL ?? ""
);

// 로그인 페이지 경로
const LOGIN_PATH = "/";

// Axios 인스턴스는 하나만 생성
export const api: AxiosInstance = axios.create({
  baseURL: apiBaseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};

    if (
      typeof FormData !== "undefined" &&
      config.data instanceof FormData
    ) {
      delete config.headers["Content-Type"];
    }

    // 브라우저에서 토큰 가져오기
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {
    const status = error.response?.status;
    const method = (error.config?.method || "GET").toUpperCase();
    const url = `${error.config?.baseURL || ""}${error.config?.url || ""}`;

    const requestHeaders = error.config?.headers ?? {};
    const responseHeaders = error.response?.headers ?? {};
    const requestParams = error.config?.params ?? {};
    const requestBody = error.config?.data ?? null;
    const responseBody = error.response?.data ?? null;

    // 로그인 요청인지 확인
    const isLoginPage =
      typeof window !== "undefined" &&
      window.location.pathname === "/";

    const isLoginRequest = /\/login(?:\/|$|\?)/i.test(
      error.config?.url ?? ""
    );

    // 401 / 403 인증 관련 로그
    if (status === 401 || status === 403) {
      if (isLocalDev) {
        console.groupCollapsed(`[AUTH ${status}] ${method} ${url}`);

        console.log("Request Headers:", sanitizeForLog(requestHeaders));
        console.log("Request Params:", sanitizeForLog(requestParams));
        console.log("Request Body:", sanitizeForLog(requestBody));
        console.log("Response Headers:", sanitizeForLog(responseHeaders));
        console.log("Response Body:", sanitizeForLog(responseBody));

        console.groupEnd();
      }
    }
    // 토큰 만료 또는 유효하지 않은 토큰인지 확인
    const responseMessage = pickDisplayMessage(error.response?.data, status)
    const isInvalidToken = status === 403 &&
      responseMessage === "유효하지 않거나 만료된 토큰입니다.";
    
    // 401 또는 토큰이 유효하지 않은 403
    const isAuthExpired = status === 401 || isInvalidToken;
    
    // 401: 인증 만료
    if (
      isAuthExpired && 
      typeof window !== "undefined" && 
      !isLoginRequest &&  
      !isLoginPage
    ) {
      try {
        // 로그인 후 원래 접근하려던 페이지로 돌아가기
        const currentPath =
          `${window.location.pathname}${window.location.search}`;

        if (currentPath !== LOGIN_PATH) {
          sessionStorage.setItem("postLoginRedirect", currentPath);
        }

        useAuthStore.getState().logout();

        // Axios 기본 인증 헤더 제거
        delete api.defaults.headers.common["Authorization"];

        // 로그인 페이지로 이동
        window.location.assign(LOGIN_PATH);
        
      } catch {
        window.location.assign(LOGIN_PATH);
      }
    }

    // 403:인증 만료가 아닌 실제 권한 부족
    if (
      status === 403 && 
      typeof window !== "undefined" &&
      !isInvalidToken
    ) {
      const message = "접근 권한이 없습니다.";

      useAlertStore.getState().showAlert(message, "error");
    }

    // 공통 에러 메시지 추출
    const data = error.response?.data;
    const message = pickDisplayMessage(data, status);

    (error as SafeError).displayMessage = message;

    // 로컬 개발 환경 API 에러 로그
    if (isLocalDev) {
      console.error("[API Error]", {
        status,
        method,
        url,
        message,
        responseBody: sanitizeForLog(responseBody),
        responseHeaders: sanitizeForLog(responseHeaders),
      });
    }

    return Promise.reject(error);
  }
);
