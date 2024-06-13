import express from "express";
import {
  getAllGoal,
  createGoal,
  updateGoal,
  changeEndGoal,
} from "../controllers/goals.controller.js";
const router = express.Router();
router.get("/getAllGoal", getAllGoal);
router.post("/createGoal", createGoal);
router.patch("/updateGoal", updateGoal);
router.patch("/changeGoal", changeEndGoal);
export default router;
