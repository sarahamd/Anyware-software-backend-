import * as yup from "yup";
import { AnnouncementDoc } from "../models/announcement.model";
import mongoose, { Schema } from "mongoose";


export const createAnnouncementSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  course: yup.string().required("Course is required"),
  semester: yup.string().required("Semester is required"),
  user: yup.string().required("User is required"),
});

export const updateAnnouncementSchema = yup.object({
  title: yup.string(),
  description: yup.string(),
  course: yup.string(),
  semester: yup.string(),
  user: yup.string(),
});
