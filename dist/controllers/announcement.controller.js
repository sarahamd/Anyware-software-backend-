"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnnouncement = exports.updateAnnouncement = exports.getAnnouncementById = exports.getAllAnnouncements = exports.createAnnouncement = void 0;
const announcement_validation_1 = require("../validations/announcement.validation");
const announcement_service_1 = __importDefault(require("../services/announcement.service"));
const NotFoundError_1 = require("../errors/NotFoundError");
const createAnnouncement = async (req, res, next) => {
    try {
        const validatedData = await announcement_validation_1.createAnnouncementSchema.validate(req.body, {
            abortEarly: false,
        });
        const { title, description, course, semester, user } = validatedData;
        const announcement = await announcement_service_1.default.createAnnouncement(title, description, course, semester, user);
        res.status(201).json({
            success: true,
            message: "Announcement created successfully",
            data: announcement,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createAnnouncement = createAnnouncement;
const getAllAnnouncements = async (req, res, next) => {
    try {
        const announcements = await announcement_service_1.default.getAllAnnouncements();
        res.status(200).json({
            success: true,
            data: announcements,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllAnnouncements = getAllAnnouncements;
const getAnnouncementById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const announcement = await announcement_service_1.default.getAnnouncementById(id);
        if (!announcement) {
            throw new NotFoundError_1.NotFoundError("Announcement not found");
        }
        res.status(200).json({
            success: true,
            data: announcement,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAnnouncementById = getAnnouncementById;
const updateAnnouncement = async (req, res, next) => {
    try {
        const validatedData = await announcement_validation_1.updateAnnouncementSchema.validate(req.body, {
            abortEarly: false,
        });
        const { id } = req.params;
        const updatedAnnouncement = await announcement_service_1.default.updateAnnouncement({
            id,
            ...validatedData,
        });
        if (!updatedAnnouncement) {
            throw new NotFoundError_1.NotFoundError("Announcement not found");
        }
        res.status(200).json({
            success: true,
            message: "Announcement updated successfully",
            data: updatedAnnouncement,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateAnnouncement = updateAnnouncement;
const deleteAnnouncement = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedAnnouncement = await announcement_service_1.default.deleteAnnouncement(id);
        if (!deletedAnnouncement) {
            throw new NotFoundError_1.NotFoundError("Announcement not found");
        }
        res.status(200).json({
            success: true,
            message: "Announcement deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAnnouncement = deleteAnnouncement;
