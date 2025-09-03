import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getCurrentAdmin,
} from "../controllers/adminAuth.controller";
import { requireAdmin } from "../middlewares/requireAdmin.middleware";
import { requireFullControl } from "../middlewares/requireFullControl.middleware";

const router = express.Router();
router.get("/getCurrentAdmin", getCurrentAdmin);
router.post("/login", loginAdmin);

router.post("/signup", requireAdmin, requireFullControl, registerAdmin);

export default router;
