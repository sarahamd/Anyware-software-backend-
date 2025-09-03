import Announcement from "../models/announcement.model";
import { ValidationError } from "../errors/ValidationError";
import { NotFoundError } from "../errors/NotFoundError";
import { createAnnouncementSchema, updateAnnouncementSchema, } from "../validations/announcement.validation";
class AnnouncementService {
    async createAnnouncement(title, description, course, semester, user) {
        try {
            await createAnnouncementSchema.validate({ title, description, course, semester, user }, { abortEarly: false });
        }
        catch (err) {
            throw new ValidationError(err.errors || err.message);
        }
        const announcement = await Announcement.create({
            title,
            description,
            course,
            semester,
            user,
        });
        return announcement;
    }
    async getAllAnnouncements() {
        return await Announcement.find().sort({ createdAt: -1 });
    }
    async getAnnouncementById(id) {
        const announcement = await Announcement.findById(id);
        if (!announcement) {
            throw new NotFoundError("Announcement not found");
        }
        return announcement;
    }
    async updateAnnouncement({ id, title, description, course, semester, user, }) {
        try {
            await updateAnnouncementSchema.validate({ title, description, course, semester, user }, { abortEarly: false });
        }
        catch (err) {
            throw new ValidationError(err.errors || err.message);
        }
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(id, { title, description, course, semester, user }, { new: true });
        if (!updatedAnnouncement) {
            throw new NotFoundError("Announcement not found");
        }
        return updatedAnnouncement;
    }
    async deleteAnnouncement(id) {
        const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
        if (!deletedAnnouncement) {
            throw new NotFoundError("Announcement not found");
        }
        return { message: "Announcement deleted successfully" };
    }
}
export default new AnnouncementService();
