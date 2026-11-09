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
      field: "ROLE",  //ADMIN, EMPLOYEE
    },
    position: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: "POSITION",  //직책
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "active",
      field: "STATUS",  //active / leave / resigned
    },
    joinDate: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "JOIN_DATE",  
    },
  },
  {
    tableName: "EMPLOYEES", 
    timestamps: false,
  }
);

module.exports = Employee;