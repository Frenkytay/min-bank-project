import transaction from "../models/transaction.js";
import account from "../models/account.js";
import { format } from "date-fns";
export const income = async (req, res) => {
  try {
    const { accountId, title, categoryName, date, amount } = req.body;
    if (!accountId || !title || !categoryName || !date || !amount) {
      return res.status(400).json({ message: "must not empty " });
    }
    if (isNaN(amount)) {
      throw new Error("Passed value is not a number");
    }
    const isExist = await account.findOne({
      where: {
        accountId: accountId,
      },
    });
    if (!isExist) {
      return res.status(400).json({ message: "user not found" });
    }
    const now = new Date();
    const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");
    console.log(formattedDate);
    isExist.balance = isExist.balance + Number(amount);
    await isExist.save();
    await transaction.create({
      accountId: accountId,
      title: title,
      transactionType: "income",
      categoryName: categoryName,
      timestamps: formattedDate,
      amount: amount,
    });
    return res.status(201).json({ message: "transaction created" });
  } catch (error) {
    console.log(error);
  }
};
export const expense = async (req, res) => {
  try {
    const { accountId, title, categoryName, date, amount } = req.body;
    if (!accountId || !title || !categoryName || !date || !amount) {
      return res.status(400).json({ message: "must not empty " });
    }
    if (isNaN(amount)) {
      throw new Error("Passed value is not a number");
    }
    const isExist = await account.findOne({
      where: {
        accountId: accountId,
      },
    });

    if (!isExist) {
      return res.status(400).json({ message: "user not found" });
    }
    if (isExist.balance < amount) {
      return res.status(400).json({ message: "not enough money" });
    }
    isExist.balance = isExist.balance - Number(amount);
    await isExist.save();
    const now = new Date();
    const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss");
    console.log(formattedDate);
    await transaction.create({
      accountId: accountId,
      title: title,
      transactionType: "expense",
      categoryName: categoryName,
      timestamps: formattedDate,
      amount: amount,
    });
    return res.status(201).json({ message: "transaction created" });
  } catch (error) {
    console.log(error);
  }
};
export const getAccountTransaction = async (req, res) => {
  try {
    const { accountId } = req.body;
    if (!accountId) {
      return res.status(400).json({ message: "must not empty" });
    }
    const isExist = await account.findOne({
      where: {
        accountId: accountId,
      },
    });
    if (!isExist) {
      return res.status(400).json({ message: "account not found" });
    }
    const result = await transaction.findAll({
      where: {
        accountId: accountId,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
