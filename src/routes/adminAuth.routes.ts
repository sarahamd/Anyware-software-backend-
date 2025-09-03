import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getCurrentAdmin,
} from "../controllers/adminAuth.controller";

const router = express.Router();

router.get("/getCurrentAdmin", getCurrentAdmin);
router.post("/login", loginAdmin);
router.post("/signup", registerAdmin);


export default router;
