import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getCurrentAdmin,
} from "../controllers/adminAuth.controller";
import { requireAdmin } from "../middlewares/requireAdmin.middleware";

const router = express.Router();
router.get("/getCurrentAdmin", getCurrentAdmin);
router.post("/login", loginAdmin);


export default router;
