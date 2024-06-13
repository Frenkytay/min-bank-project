import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const goal = db.define(
  "goals",
  {
    goalId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    accountId: DataTypes.STRING,
    goalTitle: DataTypes.STRING,
    endGoal: DataTypes.INTEGER,
    currentGoal: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
export default goal;
(async () => {
  await db.sync();
})();
