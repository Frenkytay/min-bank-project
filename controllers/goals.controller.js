import goal from "../models/goal.js";
import account from "../models/account.js";
import transaction from "../models/transaction.js";
import { format } from "date-fns";
import { json } from "sequelize";
export const getAllGoal = async (req, res) => {
  try {
    const { accountId } = req.body;
    if (!accountId) {
      return res.status(400).json({
        message: "account id must not empty",
      });
    }
    const isExist = await account.findOne({
      where: {
        accountId: accountId,
      },
    });

    if (!isExist) {
      return res.status(400).json({ message: "user is not exist" });
    }
    const result = await goal.findAll({
      where: {
        accountId: accountId,
      },
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
export const createGoal = async (req, res) => {
  try {
    const { accountId, goalTitle, endGoal } = req.body;
    if (!accountId || !goalTitle || !endGoal) {
      return res.status(400).json({ message: "must not empty" });
    }
    if (isNaN(endGoal)) {
      throw new Error("Passed value is not a number");
    }
    const isExist = await account.findOne({
      where: {
        accountId: accountId,
      },
    });
    if (!isExist) {
      return res.status(400).json({ message: "account is not exist" });
    }
    const result = await goal.create({
      accountId: accountId,
      goalTitle: goalTitle,
      endGoal: endGoal,
      currentGoal: 0,
    });

    return res.status(201).json({ message: "goal created" });
  } catch (error) {
    console.log(error);
  }
};
export const updateGoal = async (req, res) => {
  try {
    const { goalId, accountId, amount } = req.body;
    if (!goalId || !amount || !accountId) {
      return res.status(400).json({ meesage: "must not empty" });
    }
    if (isNaN(amount)) {
      return res.status(400).json({ message: "passed is not number" });
    }
    const isExist = await goal.findOne({
      where: {
        goalId: goalId,
      },
    });
    if (!isExist) {
      return res.status(400).json({ message: "goal id not found" });
    }
    if (isExist.balance < amount) {
      return res.status(400).json({ message: "balance is not enough" });
    }

    const userGoal = await goal.findOne({
      where: {
        goalId: goalId,
        accountId: accountId,
      },
    });

    userGoal.currentGoal = userGoal.currentGoal + Number(amount);

    await userGoal.save();
    console.log("ANG", userGoal.currentGoal);
    const now = new Date();

    const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");
    isExist.balance = isExist.balance - Number(amount);
    await isExist.save();
    await transaction.create({
      accountId: accountId,
      transactionType: "expense",
      categoryName: "saving in",
      title: userGoal.goalTitle,
      amount: amount,
      timestamps: formattedDate,
    });

    return res.status(200).json({ message: "current goal has change" });
  } catch (error) {
    console.log(error);
  }
};
export const changeEndGoal = async (req, res) => {
  try {
    const { accountId, goalId, endGoal } = req.body;
    if (!accountId || !goalId || !endGoal) {
      return res.status(400).json({ message: "must not empty" });
    }
    if (isNaN(endGoal)) {
      throw new Error("Passed value is not a number");
    }
    const isExist = await account.findOne({
      where: {
        accountId: accountId,
      },
    });
    if (!isExist) {
      return res.status(400).json({ message: "account not found" });
    }
    const userGoal = await goal.findOne({
      where: {
        goalId: goalId,
        accountId: accountId,
      },
    });
    if (!userGoal) {
      return res.status(400).json({ message: "goal not found" });
    }
    userGoal.endGoal = endGoal;
    await userGoal.save();
    return res.status(200).json({ message: "end goal has change" });
  } catch (error) {
    console.log(error);
  }
};
