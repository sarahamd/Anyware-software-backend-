"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AnnouncementSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    course: { type: String, required: true },
    semester: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "Admin", required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Announcement", AnnouncementSchema);
