import express from "express";
import { loginAdmin, getCurrentAdmin, } from "../controllers/adminAuth.controller";
const router = express.Router();
router.get("/getCurrentAdmin", getCurrentAdmin);
router.post("/login", loginAdmin);
export default router;
