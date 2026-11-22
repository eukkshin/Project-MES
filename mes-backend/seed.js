
const sequelize = require("./src/db");

const ProcessLine = require("./src/model/ProcessLine");
const ProductionRecord = require("./src/model/ProductionRecord");
const QualityInspection = require("./src/model/QualityInspection");
const Equipment = require("./src/model/Equipment");
const ComponentSCM = require("./src/model/ComponentSCM");

const queryInterface = sequelize.getQueryInterface();

// 현재 시각을 기준으로 과거 시간 생성
const minutesAgo = (minutes) =>
  new Date(Date.now() - minutes * 60 * 1000);

const hoursAgo = (hours) =>
  new Date(Date.now() - hours * 60 * 60 * 1000);

const seedData = async () => {
  const transaction = await sequelize.transaction();

  try {
    // 1. 공정 라인
    const processLineCount = await ProcessLine.count({ transaction });

    if (processLineCount === 0) {
      await queryInterface.bulkInsert(
        "PROCESS_LINES",
        [
          {
            LINE_NAME: "AP SMT Line 1",
            PROCESS_TYPE: "SMT",
            STATUS: "RUNNING",
            CURRENT_PRODUCT: "iPhone 18 Pro",
            OPERATOR: "김민수",
            CREATED_AT: new Date(),
            UPDATED_AT: new Date(),
          },
          {
            LINE_NAME: "Titanium CNC Line",
            PROCESS_TYPE: "CNC",
            STATUS: "RUNNING",
            CURRENT_PRODUCT: "iPhone 18 Pro Max",
            OPERATOR: "이서연",
            CREATED_AT: new Date(),
            UPDATED_AT: new Date(),
          },
          {
            LINE_NAME: "OLED Display Bonding",
            PROCESS_TYPE: "DISPLAY",
            STATUS: "MAINTENANCE",
            CURRENT_PRODUCT: "iPhone 18 Pro",
            OPERATOR: "박지훈",
            CREATED_AT: new Date(),
            UPDATED_AT: new Date(),
          },
          {
            LINE_NAME: "Final Assembly Line A",
            PROCESS_TYPE: "ASSEMBLY",
            STATUS: "RUNNING",
            CURRENT_PRODUCT: "iPhone 18",
            OPERATOR: "최유진",
            CREATED_AT: new Date(),
            UPDATED_AT: new Date(),
          },
          {
            LINE_NAME: "Waterproof Sealing Line",
            PROCESS_TYPE: "SEALING",
            STATUS: "STOP",
            CURRENT_PRODUCT: "iPhone 18 Pro",
            OPERATOR: "정현우",
            CREATED_AT: new Date(),
            UPDATED_AT: new Date(),
          },
        ],
        { transaction },
      );

      console.log("✅ 공정 라인 더미 데이터 생성 완료");
    } else {
      console.log("⏭️ 공정 라인 데이터가 이미 존재합니다.");
    }

    // 2. 생산 실적
    const productionRecordCount = await ProductionRecord.count({
      transaction,
    });

    if (productionRecordCount === 0) {
      await queryInterface.bulkInsert(
        "PRODUCTION_RECORDS",
        [
          {
            LINE_NAME: "AP SMT Line 1",
            TARGET_COUNT: 1000,
            ACTUAL_COUNT: 965,
            DEFECT_COUNT: 35,
            YIELD_RATE: 96.5,
            RECORDED_AT: hoursAgo(5),
            UPDATED_AT: hoursAgo(5),
          },
          {
            LINE_NAME: "Titanium CNC Line",
            TARGET_COUNT: 1200,
            ACTUAL_COUNT: 1140,
            DEFECT_COUNT: 60,
            YIELD_RATE: 95.0,
            RECORDED_AT: hoursAgo(4),
            UPDATED_AT: hoursAgo(4),
          },
          {
            LINE_NAME: "OLED Display Bonding",
            TARGET_COUNT: 800,
            ACTUAL_COUNT: 728,
            DEFECT_COUNT: 72,
            YIELD_RATE: 91.0,
            RECORDED_AT: hoursAgo(3),
            UPDATED_AT: hoursAgo(3),
          },
          {
            LINE_NAME: "Final Assembly Line A",
            TARGET_COUNT: 1500,
            ACTUAL_COUNT: 1470,
            DEFECT_COUNT: 30,
            YIELD_RATE: 98.0,
            RECORDED_AT: hoursAgo(2),
            UPDATED_AT: hoursAgo(2),
          },
          {
            LINE_NAME: "AP SMT Line 1",
            TARGET_COUNT: 1100,
            ACTUAL_COUNT: 1078,
            DEFECT_COUNT: 22,
            YIELD_RATE: 98.0,
            RECORDED_AT: hoursAgo(1),
            UPDATED_AT: hoursAgo(1),
          },
          {
            LINE_NAME: "Titanium CNC Line",
            TARGET_COUNT: 1300,
            ACTUAL_COUNT: 1248,
            DEFECT_COUNT: 52,
            YIELD_RATE: 96.0,
            RECORDED_AT: new Date(),
            UPDATED_AT: new Date(),
          },
        ],
        { transaction },
      );

      console.log("✅ 생산 실적 더미 데이터 생성 완료");
    } else {
      console.log("⏭️ 생산 실적 데이터가 이미 존재합니다.");
    }

    // 3. AI 비전 품질 검사
    const qualityInspectionCount = await QualityInspection.count({
      transaction,
    });

    if (qualityInspectionCount === 0) {
      await queryInterface.bulkInsert(
        "QUALITY_INSPECTIONS",
        [
          {
            SERIAL_NUMBER: "SN-2026-IP18-0001",
            INSPECTION_TYPE: "VISION_SCRATCH",
            RESULT: "PASS",
            DEFECT_REASON: null,
            INSPECTOR: "AI-VISION-01",
            INSPECTED_AT: minutesAgo(40),
          },
          {
            SERIAL_NUMBER: "SN-2026-IP18-0002",
            INSPECTION_TYPE: "WATERPROOF_TEST",
            RESULT: "PASS",
            DEFECT_REASON: null,
            INSPECTOR: "AI-VISION-02",
            INSPECTED_AT: minutesAgo(35),
          },
          {
            SERIAL_NUMBER: "SN-2026-IP18-0003",
            INSPECTION_TYPE: "VISION_SCRATCH",
            RESULT: "FAIL",
            DEFECT_REASON: "프레임 미세 스크래치 감지",
            INSPECTOR: "AI-VISION-01",
            INSPECTED_AT: minutesAgo(30),
          },
          {
            SERIAL_NUMBER: "SN-2026-IP18-0004",
            INSPECTION_TYPE: "CAMERA_ALIGNMENT",
            RESULT: "PASS",
            DEFECT_REASON: null,
            INSPECTOR: "AI-VISION-03",
            INSPECTED_AT: minutesAgo(25),
          },
          {
            SERIAL_NUMBER: "SN-2026-IP18-0005",
            INSPECTION_TYPE: "WATERPROOF_TEST",
            RESULT: "FAIL",
            DEFECT_REASON: "방수 씰링 압력 편차 초과",
            INSPECTOR: "AI-VISION-02",
            INSPECTED_AT: minutesAgo(20),
          },
          {
            SERIAL_NUMBER: "SN-2026-IP18-0006",
            INSPECTION_TYPE: "VISION_SCRATCH",
            RESULT: "PASS",
            DEFECT_REASON: null,
            INSPECTOR: "AI-VISION-01",
            INSPECTED_AT: minutesAgo(15),
          },
          {
            SERIAL_NUMBER: "SN-2026-IP18-0007",
            INSPECTION_TYPE: "OLED_PIXEL_CHECK",
            RESULT: "PASS",
            DEFECT_REASON: null,
            INSPECTOR: "AI-VISION-04",
            INSPECTED_AT: minutesAgo(10),
          },
          {
            SERIAL_NUMBER: "SN-2026-IP18-0008",
            INSPECTION_TYPE: "CAMERA_ALIGNMENT",
            RESULT: "PASS",
            DEFECT_REASON: null,
            INSPECTOR: "AI-VISION-03",
            INSPECTED_AT: minutesAgo(5),
          },
        ],
        { transaction },
      );

      console.log("✅ 품질 검사 더미 데이터 생성 완료");
    } else {
      console.log("⏭️ 품질 검사 데이터가 이미 존재합니다.");
    }

    // 4. 클린룸 설비 상태
    const equipmentCount = await Equipment.count({ transaction });

    if (equipmentCount === 0) {
      await queryInterface.bulkInsert(
        "EQUIPMENTS",
        [
          {
            EQUIPMENT_NAME: "SMT Mounter #1",
            CLEANROOM_ZONE: "Zone A (Class 100)",
            TEMPERATURE: 21.5,
            HUMIDITY: 45.0,
            STATUS: "NORMAL",
            CREATED_AT: new Date(),
            UPDATED_AT: new Date(),
          },
          {
            EQUIPMENT_NAME: "CNC Precision #3",
            CLEANROOM_ZONE: "Zone B (Class 1000)",
            TEMPERATURE: 22.1,
            HUMIDITY: 48.2,
            STATUS: "NORMAL",
            CREATED_AT: new Date(),
            UPDATED_AT: new Date(),
          },
          {
            EQUIPMENT_NAME: "OLED Laminator #1",
            CLEANROOM_ZONE: "Zone C (Class 10)",
            TEMPERATURE: 20.9,
            HUMIDITY: 43.5,
            STATUS: "NORMAL",
            CREATED_AT: new Date(),
            UPDATED_AT: new Date(),
          },
        ],
        { transaction },
      );

      console.log("✅ 설비 더미 데이터 생성 완료");
    } else {
      console.log("⏭️ 설비 데이터가 이미 존재합니다.");
    }

    // 5. 부품 SCM 재고
    const componentCount = await ComponentSCM.count({ transaction });

    if (componentCount === 0) {
      await queryInterface.bulkInsert(
        "COMPONENT_SCM",
        [
          {
            COMPONENT_NAME: "A19 Pro AP Chip",
            CATEGORY: "CHIP",
            STOCK_QUANTITY: 450,
            MIN_THRESHOLD: 200,
            SUPPLIER: "TSMC Korea",
            STATUS: "NORMAL",
            CREATED_AT: new Date(),
            UPDATED_AT: new Date(),
          },
          {
            COMPONENT_NAME: "Grade 5 Titanium Frame",
            CATEGORY: "FRAME",
            STOCK_QUANTITY: 320,
            MIN_THRESHOLD: 100,
            SUPPLIER: "Foxconn Precision",
            STATUS: "NORMAL",
            CREATED_AT: new Date(),
            UPDATED_AT: new Date(),
          },
        ],
        { transaction },
      );

      console.log("✅ SCM 재고 더미 데이터 생성 완료");
    } else {
      console.log("⏭️ SCM 재고 데이터가 이미 존재합니다.");
    }

    await transaction.commit();

    console.log("🎉 MES 더미 데이터 초기화 완료");
  } catch (error) {
    await transaction.rollback();

    console.error("❌ MES 더미 데이터 생성 실패:", error);
    throw error;
  }
};

module.exports = seedData;
