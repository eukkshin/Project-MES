const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "MESSAGE_ID",
    },
    senderEmpId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "SENDER_EMP_ID",
    },
    receiverEmpId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "RECEIVER_EMP_ID",
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "TITLE",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "CONTENT",
    },
    isRead: {
      type: DataTypes.STRING(1),
      defaultValue: "N",
      allowNull: false,
      field: "IS_READ", // Y / N
    },
    sentAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      field: "SENT_AT",
    },
  },
  {
    tableName: "MESSAGE",
    timestamps: false,
  }
);

module.exports = Message;