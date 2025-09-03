import express from "express";
import {
    createAnnouncement,
    deleteAnnouncement,
    getAllAnnouncements,
    getAnnouncementById,
    updateAnnouncement,
} from "../controllers/announcement.controller";
import { requireAdmin } from "../middlewares/requireAdmin.middleware";
const router = express.Router();

router
    .route("/")
    .post(requireAdmin, createAnnouncement)
    .get(requireAdmin, getAllAnnouncements);

router
    .route("/:id")
    .get(requireAdmin, getAnnouncementById)
    .put(requireAdmin, updateAnnouncement)
    .delete(requireAdmin, deleteAnnouncement);

export default router;
