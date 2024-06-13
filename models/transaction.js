import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const transaction = db.define(
  "transactions",
  {
    transactionId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    accountId: DataTypes.STRING,
    transactionType: DataTypes.STRING,
    categoryName: DataTypes.STRING,
    title: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    timestamps: DataTypes.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
export default transaction;
(async () => {
  await db.sync();
})();
