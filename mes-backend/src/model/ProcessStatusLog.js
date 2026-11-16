const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ProcessStatusLog = sequelize.define(
  "ProcessStatusLog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "ID",
    },
    lineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "LINE_ID",
    },
    lineName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "LINE_NAME",
    },
    previousStatus: {
      type: DataTypes.STRING(30),
      field: "PREVIOUS_STATUS",
    },
    newStatus: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: "NEW_STATUS",
    },
    changedBy: {
      type: DataTypes.STRING(50),
      field: "CHANGED_BY",
    },
    reason: {
      type: DataTypes.STRING(255),
      field: "REASON",
    },
  },
  {
    tableName: "PROCESS_STATUS_LOGS",
    timestamps: true,
    createdAt: "CREATED_AT",
    updatedAt: false,
  }
);

module.exports = ProcessStatusLog;
