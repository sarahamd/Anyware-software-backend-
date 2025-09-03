import { createAnnouncementSchema, updateAnnouncementSchema, } from "../validations/announcement.validation";
import announcementService from "../services/announcement.service";
import { NotFoundError } from "../errors/NotFoundError";
export const createAnnouncement = async (req, res, next) => {
    try {
        const validatedData = await createAnnouncementSchema.validate(req.body, {
            abortEarly: false,
        });
        const { title, description, course, semester, user } = validatedData;
        const announcement = await announcementService.createAnnouncement(title, description, course, semester, user);
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
export const getAllAnnouncements = async (req, res, next) => {
    try {
        const announcements = await announcementService.getAllAnnouncements();
        res.status(200).json({
            success: true,
            data: announcements,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getAnnouncementById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const announcement = await announcementService.getAnnouncementById(id);
        if (!announcement) {
            throw new NotFoundError("Announcement not found");
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
export const updateAnnouncement = async (req, res, next) => {
    try {
        const validatedData = await updateAnnouncementSchema.validate(req.body, {
            abortEarly: false,
        });
        const { id } = req.params;
        const updatedAnnouncement = await announcementService.updateAnnouncement({
            id,
            ...validatedData,
        });
        if (!updatedAnnouncement) {
            throw new NotFoundError("Announcement not found");
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
export const deleteAnnouncement = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedAnnouncement = await announcementService.deleteAnnouncement(id);
        if (!deletedAnnouncement) {
            throw new NotFoundError("Announcement not found");
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
