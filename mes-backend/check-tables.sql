INSERT INTO PRODUCTION_RECORDS (
  LINE_NAME,
  TARGET_COUNT,
  ACTUAL_COUNT,
  DEFECT_COUNT,
  YIELD_RATE,
  RECORDED_AT,
  UPDATED_AT
) VALUES
  ('LINE-A', 1000, 960, 40, 96.00, datetime('now', '-9 hours'), datetime('now', '-9 hours')),
  ('LINE-B', 1200, 1140, 60, 95.00, datetime('now', '-8 hours'), datetime('now', '-8 hours')),
  ('LINE-C', 800, 710, 90, 88.75, datetime('now', '-7 hours'), datetime('now', '-7 hours')),
  ('LINE-D', 1500, 1455, 45, 97.00, datetime('now', '-6 hours'), datetime('now', '-6 hours')),
  ('LINE-A', 1100, 1067, 33, 97.00, datetime('now', '-5 hours'), datetime('now', '-5 hours')),
  ('LINE-B', 1300, 1209, 91, 93.00, datetime('now', '-4 hours'), datetime('now', '-4 hours')),
  ('LINE-C', 900, 864, 36, 96.00, datetime('now', '-3 hours'), datetime('now', '-3 hours')),
  ('LINE-D', 1600, 1568, 32, 98.00, datetime('now', '-2 hours'), datetime('now', '-2 hours')),
  ('LINE-A', 1250, 1225, 25, 98.00, datetime('now', '-1 hours'), datetime('now', '-1 hours')),
  ('LINE-B', 1400, 1344, 56, 96.00, datetime('now'), datetime('now'));



  -- 1. 공정 라인 (PROCESS_LINES)
INSERT INTO PROCESS_LINES (LINE_NAME, PROCESS_TYPE, STATUS, CURRENT_PRODUCT, OPERATOR, CREATED_AT, UPDATED_AT) VALUES
  ('AP SMT Line 1', 'SMT', 'RUNNING', 'iPhone 18 Pro', '김민수', datetime('now'), datetime('now')),
  ('Titanium CNC Line', 'CNC', 'RUNNING', 'iPhone 18 Pro Max', '이서연', datetime('now'), datetime('now')),
  ('OLED Display Bonding', 'DISPLAY', 'MAINTENANCE', 'iPhone 18 Pro', '박지훈', datetime('now'), datetime('now')),
  ('Final Assembly Line A', 'ASSEMBLY', 'RUNNING', 'iPhone 18', '최유진', datetime('now'), datetime('now')),
  ('Waterproof Sealing Line', 'SEALING', 'STOP', 'iPhone 18 Pro', '정현우', datetime('now'), datetime('now'));

-- 2. 생산 실적 (PRODUCTION_RECORDS)
INSERT INTO PRODUCTION_RECORDS (LINE_NAME, TARGET_COUNT, ACTUAL_COUNT, DEFECT_COUNT, YIELD_RATE, RECORDED_AT, UPDATED_AT) VALUES
  ('AP SMT Line 1', 1000, 965, 35, 96.5, datetime('now', '-5 hours'), datetime('now', '-5 hours')),
  ('Titanium CNC Line', 1200, 1140, 60, 95.0, datetime('now', '-4 hours'), datetime('now', '-4 hours')),
  ('OLED Display Bonding', 800, 728, 72, 91.0, datetime('now', '-3 hours'), datetime('now', '-3 hours')),
  ('Final Assembly Line A', 1500, 1470, 30, 98.0, datetime('now', '-2 hours'), datetime('now', '-2 hours')),
  ('AP SMT Line 1', 1100, 1078, 22, 98.0, datetime('now', '-1 hours'), datetime('now', '-1 hours')),
  ('Titanium CNC Line', 1300, 1248, 52, 96.0, datetime('now'), datetime('now'));

-- 3. AI 비전 품질 검사 (QUALITY_INSPECTIONS)
INSERT INTO QUALITY_INSPECTIONS (SERIAL_NUMBER, INSPECTION_TYPE, RESULT, DEFECT_REASON, INSPECTOR, INSPECTED_AT) VALUES
  ('SN-2026-IP18-0001', 'VISION_SCRATCH', 'PASS', NULL, 'AI-VISION-01', datetime('now', '-40 minutes')),
  ('SN-2026-IP18-0002', 'WATERPROOF_TEST', 'PASS', NULL, 'AI-VISION-02', datetime('now', '-35 minutes')),
  ('SN-2026-IP18-0003', 'VISION_SCRATCH', 'FAIL', '프레임 미세 스크래치 감지', 'AI-VISION-01', datetime('now', '-30 minutes')),
  ('SN-2026-IP18-0004', 'CAMERA_ALIGNMENT', 'PASS', NULL, 'AI-VISION-03', datetime('now', '-25 minutes')),
  ('SN-2026-IP18-0005', 'WATERPROOF_TEST', 'FAIL', '방수 씰링 압력 편차 초과', 'AI-VISION-02', datetime('now', '-20 minutes')),
  ('SN-2026-IP18-0006', 'VISION_SCRATCH', 'PASS', NULL, 'AI-VISION-01', datetime('now', '-15 minutes')),
  ('SN-2026-IP18-0007', 'OLED_PIXEL_CHECK', 'PASS', NULL, 'AI-VISION-04', datetime('now', '-10 minutes')),
  ('SN-2026-IP18-0008', 'CAMERA_ALIGNMENT', 'PASS', NULL, 'AI-VISION-03', datetime('now', '-5 minutes'));

-- 4. 클린룸 설비 상태 (EQUIPMENTS)
INSERT INTO EQUIPMENTS (EQUIPMENT_NAME, CLEANROOM_ZONE, TEMPERATURE, HUMIDITY, STATUS, CREATED_AT, UPDATED_AT) VALUES
  ('SMT Mounter #1', 'Zone A (Class 100)', 21.5, 45.0, 'NORMAL', datetime('now'), datetime('now')),
  ('CNC Precision #3', 'Zone B (Class 1000)', 22.1, 48.2, 'NORMAL', datetime('now'), datetime('now')),
  ('Laser Welding Unit #2', 'Zone A (Class 100)', 26.8, 62.5, 'WARNING', datetime('now'), datetime('now')),
  ('OLED Laminator #1', 'Zone C (Class 10)', 20.9, 43.5, 'NORMAL', datetime('now'), datetime('now'));

-- 5. 부품 SCM 재고 (COMPONENT_SCM)
INSERT INTO COMPONENT_SCM (COMPONENT_NAME, CATEGORY, STOCK_QUANTITY, MIN_THRESHOLD, SUPPLIER, STATUS, CREATED_AT, UPDATED_AT) VALUES
  ('A19 Pro AP Chip', 'CHIP', 450, 200, 'TSMC Korea', 'NORMAL', datetime('now'), datetime('now')),
  ('48MP Telephoto Camera Module', 'CAMERA', 65, 150, 'LG Innotek', 'WARNING', datetime('now'), datetime('now')),
  ('Grade 5 Titanium Frame', 'FRAME', 320, 100, 'Foxconn Precision', 'NORMAL', datetime('now'), datetime('now')),
  ('6.3-inch LTPO OLED Panel', 'DISPLAY', 40, 120, 'Samsung Display', 'DANGER', datetime('now'), datetime('now'));