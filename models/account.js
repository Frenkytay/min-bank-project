import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const account = db.define(
  "accounts",
  {
    accountId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    accountName: DataTypes.STRING,
    accountEmail: DataTypes.STRING,
    accountPassword: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNo: DataTypes.STRING,
    accountPIN: DataTypes.STRING,
    balance: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
export default account;
(async () => {
  await db.sync();
})();
