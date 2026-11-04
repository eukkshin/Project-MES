const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
      field: "EMP_ID",
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "NAME",
    },
    department: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "DEPARTMENT",
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "ROLE",
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "active",
      field: "STATUS",
    },
    joinDate: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "JOIN_DATE",
    },
  },
  {
    tableName: "EMPLOYEES", // 실제 DB 테이블명 확인 필요
    timestamps: false,
  }
);

module.exports = Employee;