import express from "express";
import {
  accountLogin,
  accountRegister,
  getBalanceTren,
  getAccountData
} from "../controllers/account.controller.js";
const router = express.Router();

router.get("/login", accountLogin);
router.post("/register", accountRegister);
router.get("/getBalanceTren", getBalanceTren);
router.get("/getAccountData/:id" , getAccountData )
export default router;
