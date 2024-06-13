import express from "express";
import {
  expense,
  income,
  getAccountTransaction,
} from "../controllers/transaction.controller.js";
const router = express.Router();
router.post("/income", income);
router.post("/expense", expense);
router.get("/getAccountTransaction", getAccountTransaction);
export default router;
