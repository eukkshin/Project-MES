
const bcrypt = require("bcryptjs");
require("dotenv").config();

const sequelize = require("./src/db");
const User = require("./src/model/User");
const Employee = require("./src/model/Employee");

// 다음 사번 자동 생성
async function generateNextEmpId(transaction) {
  const employees = await Employee.findAll({
    attributes: ["id"],
    transaction,
  });

  let maxNum = 0;

  for (const employee of employees) {
    const match = employee.id.match(/^EMP(\d+)$/i);

    if (match) {
      maxNum = Math.max(maxNum, Number(match[1]));
    }
  }

  return `EMP${String(maxNum + 1).padStart(3, "0")}`;
}

async function createAdmin() {
  try {
    // 1. DB 연결
    await sequelize.authenticate();

    // 2. 기존 관리자 확인
    const existingAdmin = await Employee.findOne({
      where: { role: "ADMIN" },
    });

    if (existingAdmin) {
      const linkedUser = await User.findOne({
        where: { empId: existingAdmin.id },
      });

      if (!linkedUser) {
        throw new Error(
          "관리자 Employee는 존재하지만 연결된 User가 없습니다."
        );
      }

      console.log("기존 관리자 계정이 있습니다. 생성을 건너뜁니다.");
      return;
    }

    // 3. 환경변수 확인
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error("관리자 이메일 또는 비밀번호가 없습니다.");
    }

    if (password.length < 8) {
      throw new Error("관리자 비밀번호는 8자 이상이어야 합니다.");
    }

    // 4. 이메일 중복 확인
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new Error(
        "해당 이메일이 이미 USERS에 존재합니다. 기존 계정을 확인해 주세요."
      );
    }

    // 5. 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. USERS + EMPLOYEES 생성
    await sequelize.transaction(async (transaction) => {
      const empId = await generateNextEmpId(transaction);

      // Employee 먼저 생성
      await Employee.create(
        {
          id: empId,
          name: "시스템 관리자",
          department: "시스템관리",
          role: "ADMIN",
          position: "시스템 관리자",
          status: "active",
          joinDate: new Date().toISOString().slice(0, 10),
        },
        { transaction }
      );

      // User 생성 및 사번 연결
      await User.create(
        {
          firstName: "관리자",
          lastName: "시스템",
          email,
          password: hashedPassword,
          companyName: "시스템 관리",
          position: "시스템 관리자",
          approvalStatus: "APPROVED",
          accountStatus: "ACTIVE",
          empId,
        },
        { transaction }
      );

      console.log("초기 관리자 계정 생성 완료!");
      console.log("이메일:", email);
      console.log("사번:", empId);
      console.log("권한: ADMIN");
    });
  } catch (error) {
    console.error("관리자 초기화 실패:", error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

createAdmin();
