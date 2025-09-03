"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const announcement_controller_1 = require("../controllers/announcement.controller");
const requireAdmin_middleware_1 = require("../middlewares/requireAdmin.middleware");
const router = express_1.default.Router();
router
    .route("/")
    .post(requireAdmin_middleware_1.requireAdmin, announcement_controller_1.createAnnouncement)
    .get(requireAdmin_middleware_1.requireAdmin, announcement_controller_1.getAllAnnouncements);
router
    .route("/:id")
    .get(requireAdmin_middleware_1.requireAdmin, announcement_controller_1.getAnnouncementById)
    .put(requireAdmin_middleware_1.requireAdmin, announcement_controller_1.updateAnnouncement)
    .delete(requireAdmin_middleware_1.requireAdmin, announcement_controller_1.deleteAnnouncement);
exports.default = router;
