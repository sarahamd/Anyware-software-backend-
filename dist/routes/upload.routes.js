import AWS from "aws-sdk";
import path from "path";
import express from "express";
import sharp from "sharp";
import multer from "multer";
import { ValidationError } from "../errors/ValidationError";
import { requireAdmin } from "../middlewares/requireAdmin.middleware";
// FILE FILTER: Only allow JPEG and PNG images.
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        // Instead of passing an error, signal rejection by passing `null` and `false`.
        cb(null, false);
    }
};
// (Optional) File size validation function (not used in current config)
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const validateFileSize = (req, file, cb) => {
    if (file.size > MAX_SIZE) {
        cb(new Error("File too large. Max size is 5MB."));
    }
    else {
        cb(null, true);
    }
};
// THUMBNAIL CREATOR: Generates a 150x150 webp thumbnail from a buffer.
const createThumbnail = async (buffer) => {
    return await sharp(buffer)
        .resize({ width: 150, height: 150, fit: "cover" })
        .webp({ quality: 70 })
        .toBuffer();
};
// IMAGE DIMENSION VALIDATION: Ensures dimensions do not exceed 1920x1080.
const validateImageDimensions = async (buffer) => {
    const metadata = await sharp(buffer).metadata();
    const { width, height } = metadata;
    if (width && height && (width > 1920 || height > 1080)) {
        throw new Error("Image dimensions exceed 1920x1080");
    }
};
// MULTER CONFIGURATION: Use memory storage so we can process the file buffer.
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    fileFilter,
});
// AWS S3 CONFIGURATION
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Ensure these environment variables are set
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});
// EXPRESS ROUTER
const router = express.Router();
// Single file upload endpoint
router.post("/", requireAdmin, upload.single("image"), async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            throw new ValidationError("You must upload an image");
        }
        const optimizedImage = await sharp(file.buffer)
            .resize({ width: 800, height: 800, fit: "inside" })
            .jpeg({ quality: 80 })
            .toBuffer();
        // Optionally convert the image to webp format
        const convertedImage = await sharp(file.buffer)
            .toFormat("webp")
            .toBuffer();
        // Prepare S3 upload parameters.
        // (Here we're using the original file.buffer, but you might use one of the processed buffers.)
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME, // Ensure this variable is set
            Key: `images/file-${Date.now()}${path.extname(file.originalname)}`,
            Body: file.buffer,
            ACL: "public-read-write",
            ContentType: file.mimetype,
        };
        const data = await s3.upload(params).promise();
        // Call the response method without returning its value
        res.status(200).json({
            message: "File uploaded successfully",
            success: true,
            location: data.Location,
        });
    }
    catch (error) {
        next(error);
    }
});
// Multiple files upload endpoint
router.post("/multiple", upload.array("images", 10), async (req, res) => {
    try {
        // We cast req.files to the type defined by multer.
        const files = req.files;
        if (!files || files.length === 0) {
            res.status(400).json({ message: "No files uploaded" });
            return;
        }
        // Upload each file to S3.
        const uploadPromises = files.map((file) => {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `images/file-${Date.now()}${path.extname(file.originalname)}`,
                Body: file.buffer,
                ACL: "public-read-write",
                ContentType: file.mimetype,
            };
            return s3.upload(params).promise();
        });
        const uploadResults = await Promise.all(uploadPromises);
        const locations = uploadResults.map((result) => result.Location);
        res.status(200).json({
            message: "Files uploaded successfully",
            success: true,
            locations,
        });
    }
    catch (error) {
        console.error("Upload error:", error);
        let message = "File upload failed";
        if (error instanceof Error) {
            message = error.message;
        }
        res.status(500).json({
            message,
            error: message,
        });
    }
});
export default router;
