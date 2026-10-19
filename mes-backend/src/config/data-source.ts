import "reflect-metadata";

import fs from "fs";
import path from "path";
import { DataSource } from "typeorm";

import { WorkOrder } from "../entities/WorkOrder";

// ⚠️ [.env 파일 강제 파싱 및 주입 로직]
try {
  // 프로젝트 최상위 루트 디렉토리의 .env 파일 경로 지정
  const envPath = path.join(process.cwd(), ".env");

  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf-8");

    // 한 줄씩 읽으면서 빈 줄이나 주석(#)을 제외하고 process.env에 강제 할당
    envConfig.split("\n").forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith("#")) {
        const [key, ...values] = trimmedLine.split("=");
        if (key) {
          process.env[key.trim()] = values.join("=").trim();
        }
      }
    });
  }
} catch (e) {
  console.error("⚠️ 수동 .env 로드 실패:", e);
}

// ⚠️ 안전하게 파싱된 환경 변수 가져오기
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST || "localhost";
const port = Number(process.env.DB_PORT) || 1521;
const serviceName = process.env.DB_SERVICE_NAME || "XE";

console.log("=== [수동 주입 후 Oracle 연결 정보 점검] ===");
console.log("- HOST:", host);
console.log("- PORT:", port);
console.log("- SERVICE_NAME:", serviceName);
console.log("- USERNAME:", username ? `✅ [${username}]` : "❌ 여전히 누락됨");
console.log(
  "- PASSWORD:",
  password ? "✅ [비밀번호 존재함]" : "❌ 여전히 누락됨",
);
console.log("===========================================");

export const AppDataSource = new DataSource({
  type: "oracle",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 1521,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,

  serviceName: process.env.DB_SERVICE_NAME || "XE",
  synchronize: true,
  logging: true,

  entities: [WorkOrder],

  extra: {
    poolMin: 2,
    poolMax: 10,
    poolIncrement: 1,
  },
});
