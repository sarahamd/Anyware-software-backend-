"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const announcement_model_1 = __importDefault(require("../models/announcement.model"));
const ValidationError_1 = require("../errors/ValidationError");
const NotFoundError_1 = require("../errors/NotFoundError");
const announcement_validation_1 = require("../validations/announcement.validation");
class AnnouncementService {
    async createAnnouncement(title, description, course, semester, user) {
        try {
            await announcement_validation_1.createAnnouncementSchema.validate({ title, description, course, semester, user }, { abortEarly: false });
        }
        catch (err) {
            throw new ValidationError_1.ValidationError(err.errors || err.message);
        }
        const announcement = await announcement_model_1.default.create({
            title,
            description,
            course,
            semester,
            user,
        });
        return announcement;
    }
    async getAllAnnouncements() {
        return await announcement_model_1.default.find().sort({ createdAt: -1 });
    }
    async getAnnouncementById(id) {
        const announcement = await announcement_model_1.default.findById(id);
        if (!announcement) {
            throw new NotFoundError_1.NotFoundError("Announcement not found");
        }
        return announcement;
    }
    async updateAnnouncement({ id, title, description, course, semester, user, }) {
        try {
            await announcement_validation_1.updateAnnouncementSchema.validate({ title, description, course, semester, user }, { abortEarly: false });
        }
        catch (err) {
            throw new ValidationError_1.ValidationError(err.errors || err.message);
        }
        const updatedAnnouncement = await announcement_model_1.default.findByIdAndUpdate(id, { title, description, course, semester, user }, { new: true });
        if (!updatedAnnouncement) {
            throw new NotFoundError_1.NotFoundError("Announcement not found");
        }
        return updatedAnnouncement;
    }
    async deleteAnnouncement(id) {
        const deletedAnnouncement = await announcement_model_1.default.findByIdAndDelete(id);
        if (!deletedAnnouncement) {
            throw new NotFoundError_1.NotFoundError("Announcement not found");
        }
        return { message: "Announcement deleted successfully" };
    }
}
exports.default = new AnnouncementService();
