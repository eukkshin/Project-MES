const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Schedule = sequelize.define(
  "Schedule",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "ID",
    },

    // PUBLIC / PERSONAL / NOTICE
    scheduleType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "PERSONAL",
      field: "SCHEDULE_TYPE",
      validate: {
        isIn: [["PUBLIC", "PERSONAL", "NOTICE"]],
      },
    },

    title: {
      type: DataTypes.STRING(150),
      allowNull: true,
      field: "TITLE",
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "CONTENT",
    },

    // 일정 날짜: YYYY-MM-DD
    scheduleDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "SCHEDULE_DATE",
    },

    // 일정 시간: HH:mm
    time: {
      type: DataTypes.STRING(8),
      allowNull: true,
      field: "TIME",
    },

    alarmEnabled: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "ALARM_ENABLED",
    },

    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "PENDING",
      field: "STATUS",
      validate: {
        isIn: [["PENDING", "IN_PROGRESS", "COMPLETED"]],
      },
    },

    // 일정을 등록한 직원 ID
    createdBy: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "CREATED_BY",
    },
  },
  {
    tableName: "SCHEDULES",
    timestamps: true,
    createdAt: "CREATED_AT",
    updatedAt: "UPDATED_AT",
  },
);

module.exports = Schedule;