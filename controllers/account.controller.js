import account from "../models/account.js";
import validator from "email-validator";
import transaction from "../models/transaction.js";
import { json } from "sequelize";
export const accountLogin = async (req, res) => {
  try {
    const { accountEmail, accountPassword } = req.body;
    if (!accountEmail || !accountPassword) {
      return res
        .status(400)
        .json({ message: "user and password must not empty" });
    }
    const result = await account.findOne({
      where: {
        accountEmail: accountEmail,
      },
    });
    if (!result) {
      return res.status(400).json({ message: "user not found" });
    }
    if (!result.accountPassword == accountPassword) {
      return res.status(400).json({ message: "password wrong" });
    }
    return res.status(200).json(result.accountId);
  } catch (error) {
    console.log(error);
  }
};
export const accountRegister = async (req, res) => {
  try {
    const { accountEmail, accountPassword, accountName } = req.body;
    if (!accountEmail || !accountPassword || !accountName) {
      return res.status(400).json({ message: "body must not empty" });
    }
    if (!validator.validate(accountEmail)) {
      return res.status(400).json({ message: "email format wrong" });
    }
    const isExist = await account.findOne({
      where: {
        accountEmail: accountEmail,
      },
    });
    if (isExist) {
      return res.status(400).json({ message: "user already exist" });
    }
    const result = await account.create({
      accountEmail: accountEmail,
      accountPassword: accountPassword,
      accountName: accountName,
      balance: 0,
    });
    console.log(result);

    return res.status(201).json({ message: "account created" });
  } catch (error) {
    console.log(error);
  }
};
export const getBalanceTren = async (req, res) => {
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
      return res.status(400).json({ message: "user not found" });
    }
    const result = await transaction.findAll({
      where: {
        accountId: accountId,
      },
    });

    const hasil = result.map((result) => result.toJSON());
    console.log(hasil);
    let tren = [];
    let currentBalance = isExist.balance;
    tren.push({
      balance: currentBalance,
      date: hasil[hasil.length - 1].timestamps,
    });
    for (let i = hasil.length - 1; i > 0; i--) {
      if (hasil[i].transactionType == "income") {
        currentBalance = currentBalance - hasil[i].amount;
        tren.push({
          balance: currentBalance,
          date: hasil[i].timestamps,
        });
      } else {
        currentBalance = currentBalance + hasil[i].amount;
        tren.push({
          balance: currentBalance,
          date: hasil[i].timestamps,
        });
      }
    }
    const reversed = tren.reverse();
    return res.json(reversed);
  } catch (error) {
    console.log(error);
  }
};
