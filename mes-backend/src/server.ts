import bcrypt from 'bcryptjs';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

const sequelize = require("./db");
const User = require("./model/User");
const ProcessLine = require("./model/ProcessLine");
const ComponentSCM = require("./model/ComponentSCM");
const QualityInspection = require("./model/QualityInspection");
const Equipment = require("./model/Equipment");
const ProductionRecord = require("./model/ProductionRecord");
const Employee = require('./model/Employee');
const Schedule = require('./model/Schedule');

//============================================
// 👇 모델 관계 설정
//============================================
//User ↔ Employee
User.belongsTo(Employee, {
  foreignKey: "empId",
  targetKey: "id",
  as: "employee",
});

Employee.hasOne(User, {
  foreignKey: "empId",
  sourceKey: "id",
  as: "user",
});

// Employee ↔ Schedule
Schedule.belongsTo(Employee, {
  foreignKey: "createdBy",
  targetKey: "id",
  as: "creator",
});

Employee.hasMany(Schedule, {
  foreignKey: "createdBy",
  sourceKey: "id",
  as: "schedules",
});

//========================================
const app = express();

// 기본 미들웨어
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// JWT 비밀키
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET 환경변수가 설정되지 않았습니다.");
}

// JWT 인증 미들웨어
const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "인증 토큰이 제공되지 않았습니다.",
    });
    return;
  }

  const token = authHeader.slice(7).trim();

  if (!token) {
    res.status(401).json({
      success: false,
      message: "인증 토큰이 올바르지 않습니다.",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      typeof decoded === "string" ||
      typeof decoded.id !== "number" ||
      typeof decoded.email !== "string"
    ) {
      res.status(403).json({
        success: false,
        message: "인증 토큰의 사용자 정보가 올바르지 않습니다.",
      });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "유효하지 않거나 만료된 토큰입니다.",
    });
  }
};

// 회원가입 API
app.post(
  "/api/auth/register",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        companyName,
        position,
        tel,
        address,
        detailAddress,
        gender,
      } = req.body;

      if (!firstName || !lastName || !email || !password) {
        res.status(400).json({
          success: false,
          message: "이름, 성, 이메일, 비밀번호는 필수입니다.",
        });
        return;
      }

      // 이메일 중복 확인
      const existingUser = await User.findOne({
        where: { email },
      });

      if (existingUser) {
        res.status(409).json({
          success: false,
          message: "이미 존재하는 이메일입니다.",
        });
        return;
      }

      // 비밀번호 암호화
      const hashedPassword = await bcrypt.hash(password, 10);

      // 사용자 등록
      await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        companyName,
        position,
        tel,
        address,
        detailAddress,
        gender,
      });

      res.status(201).json({
        success: true,
        message: "회원가입이 완료되었습니다.",
      });
    } catch (error) {
      console.error("회원가입 오류:", error);

      res.status(500).json({
        success: false,
        message: "회원가입 중 서버 오류가 발생했습니다.",
      });
    }
  },
);

// 로그인 API
app.post(
  "/api/auth/login",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "이메일과 비밀번호는 필수입니다.",
        });
        return;
      }

      // 사용자 조회
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        res.status(401).json({
          success: false,
          message: "이메일 또는 비밀번호가 올바르지 않습니다.",
        });
        return;
      }

      // 비밀번호 검증
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: "이메일 또는 비밀번호가 올바르지 않습니다.",
        });
        return;
      }

      // JWT 생성
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          empId: user.empId,
        },
        JWT_SECRET,
        {
          expiresIn: "2h",
        },
      );

      res.status(200).json({
        success: true,
        message: "로그인이 완료되었습니다.",
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${user.lastName ?? ""}${user.firstName ?? ""}`.trim(),
          email: user.email,
        },
      });
    } catch (error) {
      console.error("로그인 오류:", error);

      res.status(500).json({
        success: false,
        message: "로그인 중 서버 오류가 발생했습니다.",
      });
    }
  },
);

// 사용자 프로필 조회 API
app.get(
  "/api/user/profile",
  verifyToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const decoded = req.user;

      if (
        !decoded ||
        typeof decoded === "string" ||
        typeof decoded.id !== "number"
      ) {
        res.status(401).json({
          success: false,
          message: "사용자 인증 정보가 올바르지 않습니다.",
        });
        return;
      }

      const userId = decoded.id;

      // OracleDB에서 사용자 조회
      const user = await User.findByPk(userId, {
        attributes: [
          "id",
          "firstName",
          "lastName",
          "email",
          "tel",
          "companyName",
          "position",
          "address",
          "detailAddress",
          "gender",
        ],
      });

      if (!user) {
        res.status(404).json({
          success: false,
          message: "사용자를 찾을 수 없습니다.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${user.lastName ?? ""}${user.firstName ?? ""}`.trim(),
          email: user.email,
          tel: user.tel,
          companyName: user.companyName,
          position: user.position,
          address: user.address,
          detailAddress: user.detailAddress,
          gender: user.gender,
        },
      });
    } catch (error) {
      console.error("사용자 정보 조회 오류:", error);

      res.status(500).json({
        success: false,
        message: "사용자 정보를 불러오지 못했습니다.",
      });
    }
  },
);

app.get("/api/process/lines", verifyToken, async (req, res) => {
  try {
    const line = await ProcessLine.findAll();
    return res.status(200).json({
      success: true,
      line,
    });
  } catch (error) {
    console.error("라인 조회 실패:", error);
    res.status(500).json({
      success: false,
      message: "라인 조회 실패",
    });
  }
});

app.post("/api/process/lines", verifyToken, async (req, res) => {
  try {
    const { lineName, processType, currentProduct, operator } = req.body;
    const newLine = await ProcessLine.create({
      lineName,
      processType,
      currentProduct,
      operator,
    });
    return res.status(201).json({
      success: true,
      line: newLine,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다.",
    });
  }
});

// SCM API
app.get("/api/scm/components", verifyToken, async (req, res) => {
  try {
    const components = await ComponentSCM.findAll();
    return res.status(200).json({
      success: true,
      components,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "SCM 자재 조회 실패",
    });
  }
});

app.post("/api/scm/components", verifyToken, async (req, res) => {
  try {
    const { componentName, category, stockQuantity, minThreshold, supplier } =
      req.body;
    const status = stockQuantity <= minThreshold ? "WARNING" : "NORMAL";
    const components = await ComponentSCM.create({
      componentName,
      category,
      stockQuantity,
      minThreshold,
      supplier,
      status,
    });
    return res.status(201).json({
      success: true,
      components,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "SCM 자재 조회 실패",
    });
  }
});

// quality API
app.get("/api/quality/inspections", verifyToken, async (req, res) => {
  try {
    const inspections = await QualityInspection.findAll({
      limit: 50,
      order: [["INSPECTED_AT", "DESC"]],
    });
    return res.status(200).json({
      success: true,
      inspections,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "품질 검사 이력 조회 실패",
    });
  }
});

app.post("/api/quality/inspections", verifyToken, async (req, res) => {
  try {
    const { serialNumber, inspectionType, result, defectReason, inspector } =
      req.body;
    const inspection = await QualityInspection.create({
      serialNumber,
      inspectionType,
      result,
      defectReason,
      inspector,
    });
    return res.status(201).json({
      success: true,
      inspection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "품질 검사 결과 등록 실패",
    });
  }
});

//equipment API
app.get("/api/equipment/status", verifyToken, async (req, res) => {
  try {
    const equipments = await Equipment.findAll();
    return res.status(200).json({
      success: true,
      equipments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "설비 상태 조회 실패",
    });
  }
});

app.post("/api/equipment/status", verifyToken, async (req, res) => {
  try {
    const { equipmentName, cleanroomZone, temperature, humidity, status } =
      req.body;
    const equipment = await Equipment.create({
      equipmentName,
      cleanroomZone,
      temperature,
      humidity,
      status,
    });
    return res.status(201).json({
      success: true,
      equipment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "설비 상태 등록 실패",
    });
  }
});

// 설비 상태 변경 API
app.patch("/api/equipment/status/:id", verifyToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "유효하지 않은 설비 ID입니다.",
      });
    }

    if (!["NORMAL", "WARNING", "ERROR"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "유효하지 않은 설비 상태입니다.",
      });
    }

    const equipment = await Equipment.findByPk(id);

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "해당 설비를 찾을 수 없습니다.",
      });
    }

    await equipment.update({ status });

    return res.status(200).json({
      success: true,
      message: "설비 상태가 변경되었습니다.",
      equipment,
    });
  } catch (error) {
    console.error("설비 상태 변경 오류:", error);

    return res.status(500).json({
      success: false,
      message: "설비 상태 변경 실패",
    });
  }
});

//production API
app.get("/api/analytics/records", verifyToken, async (req, res) => {
  try {
    const records = await ProductionRecord.findAll();
    return res.status(200).json({
      success: true,
      records,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "통합 관제 데이터 조회 실패",
    });
  }
});

app.post("/api/analytics/records", verifyToken, async (req, res) => {
  try {
    const { lineName, targetCount, actualCount, defectCount } = req.body;
    const total = actualCount + defectCount;
    const yieldRate =
      total > 0 ? Number(((actualCount / total) * 100).toFixed(2)) : 100.0;
    const records = await ProductionRecord.create({
      lineName,
      targetCount,
      actualCount,
      defectCount,
      yieldRate,
    });
    return res.status(201).json({
      success: true,
      records,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "통합 관제 데이터 등록 실패",
    });
  }
});

//====================================
// 일정
//===================================
// 일정 목록 조회
app.get("/api/schedules", verifyToken, async (req: Request, res: Response) => {
  try {
    const decoded = req.user;

    if (!decoded || typeof decoded === "string") {
      res.status(401).json({
        success: false,
        message: "인증 정보가 올바르지 않습니다.",
      });
      return;
    }

    // 로그인한 사용자의 사번
    const empId = decoded.empId;

    if (!empId) {
      res.status(400).json({
        success: false,
        message: "직원 정보가 연결되지 않은 계정입니다.",
      });
      return;
    }

    const schedules = await Schedule.findAll({
      where: {
        [require("sequelize").Op.or]: [
          { scheduleType: "PUBLIC" },
          {
            scheduleType: "PERSONAL",
            createdBy: empId,
          },
          {
            scheduleType: "NOTICE",
          },
        ],
      },
      order: [
        ["scheduleDate", "ASC"],
        ["time", "ASC"],
      ],
    });

    res.status(200).json({
      success: true,
      schedules: schedules.map((item:any) => {
        const schedule = item.toJSON();

        return {
          ...schedule,
          createdAt: schedule.CREATED_AT,
          updatedAt: schedule.UPDATED_AT,
        };
      }),
    });


  } catch (error) {
    console.error("일정 조회 오류:", error);

    res.status(500).json({
      success: false,
      message: "일정을 불러오지 못했습니다.",
    });
  }
});

// 일정 등록
app.post("/api/schedules", verifyToken, async (req: Request, res: Response) => {
  try {
    const decoded = req.user;

    if (!decoded || typeof decoded === "string" || !decoded.empId) {
      res.status(400).json({
        success: false,
        message: "직원 정보가 연결되지 않은 계정입니다.",
      });
      return;
    }

    const {
      scheduleType,
      title,
      content,
      scheduleDate,
      time,
      alarmEnabled,
      status,
    } = req.body;

    if (!scheduleDate || !content) {
      res.status(400).json({
        success: false,
        message: "일정 날짜와 내용은 필수입니다.",
      });
      return;
    }

    // 일반 직원은 개인 일정만 등록 가능
    if (scheduleType && scheduleType !== "PERSONAL") {
      res.status(403).json({
        success: false,
        message: "개인 일정만 등록할 수 있습니다.",
      });
      return;
    }

    const schedule = await Schedule.create({
      scheduleType: "PERSONAL",
      title,
      content,
      scheduleDate,
      time,
      alarmEnabled: alarmEnabled ? 1 : 0,
      status: status ?? "PENDING",
      createdBy: decoded.empId,
    });

    res.status(201).json(schedule);
  } catch (error) {
    console.error("일정 등록 오류:", error);

    res.status(500).json({
      success: false,
      message: "일정을 등록하지 못했습니다.",
    });
  }
});

// 일정 수정
app.patch(
  "/api/schedules/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const decoded = req.user;

      if (!decoded || typeof decoded === "string" || !decoded.empId) {
        res.status(400).json({
          success: false,
          message: "직원 정보가 연결되지 않은 계정입니다.",
        });
        return;
      }

      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
          success: false,
          message: "유효하지 않은 일정 ID입니다.",
        });
        return;
      }

      const schedule = await Schedule.findOne({
        where: {
          id,
          scheduleType: "PERSONAL",
          createdBy: decoded.empId,
        },
      });

      if (!schedule) {
        res.status(404).json({
          success: false,
          message: "수정할 일정을 찾을 수 없습니다.",
        });
        return;
      }

      const {
        scheduleType,
        createdBy,
        ...updateData
      } = req.body;

      // 작성자와 일정 유형은 클라이언트가 변경할 수 없음
      await schedule.update({
        ...updateData,
        alarmEnabled:
          updateData.alarmEnabled === undefined
            ? schedule.alarmEnabled
            : updateData.alarmEnabled
              ? 1
              : 0,
      });

      res.status(200).json(schedule);
    } catch (error) {
      console.error("일정 수정 오류:", error);

      res.status(500).json({
        success: false,
        message: "일정을 수정하지 못했습니다.",
      });
    }
  },
);

// 일정 삭제
app.delete(
  "/api/schedules/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const decoded = req.user;

      if (!decoded || typeof decoded === "string" || !decoded.empId) {
        res.status(400).json({
          success: false,
          message: "직원 정보가 연결되지 않은 계정입니다.",
        });
        return;
      }

      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
          success: false,
          message: "유효하지 않은 일정 ID입니다.",
        });
        return;
      }

      const schedule = await Schedule.findOne({
        where: {
          id,
          scheduleType: "PERSONAL",
          createdBy: decoded.empId,
        },
      });

      if (!schedule) {
        res.status(404).json({
          success: false,
          message: "삭제할 일정을 찾을 수 없습니다.",
        });
        return;
      }

      await schedule.destroy();

      res.status(200).json({
        success: true,
        message: "일정이 삭제되었습니다.",
      });
    } catch (error) {
      console.error("일정 삭제 오류:", error);

      res.status(500).json({
        success: false,
        message: "일정을 삭제하지 못했습니다.",
      });
    }
  },
);


console.log("등록된 모델:", Object.keys(sequelize.models));
// 서버 실행
const PORT = Number(process.env.PORT) || 4000;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 완료");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error: unknown) => {
    console.error("데이터베이스 연결 오류:", error);
  });
