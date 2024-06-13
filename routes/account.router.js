import express from "express";
import {
  accountLogin,
  accountRegister,
  getBalanceTren,
} from "../controllers/account.controller.js";
const router = express.Router();

router.get("/login", accountLogin);
router.post("/register", accountRegister);
router.get("/getBalanceTren", getBalanceTren);
export default router;
