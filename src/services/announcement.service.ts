import Announcement, { AnnouncementDoc } from "../models/announcement.model";
import { ValidationError } from "../errors/ValidationError";
import { NotFoundError } from "../errors/NotFoundError";
import {
  createAnnouncementSchema,
  updateAnnouncementSchema,
} from "../validations/announcement.validation";

class AnnouncementService {
  async createAnnouncement(
    title: string,
    description: string,
    course: string,
    semester: string,
    user: string
  ): Promise<AnnouncementDoc> {
    try {
      await createAnnouncementSchema.validate(
        { title, description, course, semester, user },
        { abortEarly: false }
      );
    } catch (err: any) {
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

  async getAllAnnouncements(): Promise<AnnouncementDoc[]> {
    return await Announcement.find().sort({ createdAt: -1 });
  }

  async getAnnouncementById(id: string): Promise<AnnouncementDoc> {
    const announcement = await Announcement.findById(id);
    if (!announcement) {
      throw new NotFoundError("Announcement not found");
    }
    return announcement;
  }

  async updateAnnouncement({
    id,
    title,
    description,
    course,
    semester,
    user,
  }: {
    id: string;
    title?: string;
    description?: string;
    course?: string;
    semester?: string;
    user?: string;
  }): Promise<AnnouncementDoc> {
    try {
      await updateAnnouncementSchema.validate(
        { title, description, course, semester, user },
        { abortEarly: false }
      );
    } catch (err: any) {
      throw new ValidationError(err.errors || err.message);
    }

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id,
      { title, description, course, semester, user },
      { new: true }
    );

    if (!updatedAnnouncement) {
      throw new NotFoundError("Announcement not found");
    }

    return updatedAnnouncement;
  }

  async deleteAnnouncement(id: string): Promise<{ message: string }> {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
    if (!deletedAnnouncement) {
      throw new NotFoundError("Announcement not found");
    }
    return { message: "Announcement deleted successfully" };
  }
}

export default new AnnouncementService();
