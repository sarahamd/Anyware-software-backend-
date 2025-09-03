"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuth_controller_1 = require("../controllers/adminAuth.controller");
const router = express_1.default.Router();
router.get("/getCurrentAdmin", adminAuth_controller_1.getCurrentAdmin);
router.post("/login", adminAuth_controller_1.loginAdmin);
router.post("/signup", adminAuth_controller_1.registerAdmin);
exports.default = router;
