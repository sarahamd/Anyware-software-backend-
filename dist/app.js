import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { NotFoundError } from "./errors/NotFoundError";
import errorHandler from "./middlewares/errorHandler.middleware";
// IMPORT ROUTES
import authRoutes from "./routes/adminAuth.routes";
import uploadRoutes from "./routes/upload.routes";
import announcementRoutes from "./routes/announcement.routes";
import quizzesRoutes from "./routes/quiz.routes";
const app = express();
// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// CORS Middleware
const corsOptions = {
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
// Routes
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/announcements", announcementRoutes);
app.use("/quizzes", quizzesRoutes);
// Not Found Handler
app.use((req, res, next) => {
    next(new NotFoundError());
});
// Error Handler Middleware
app.use((err, req, res, next) => {
    errorHandler(err, req, res, next);
});
export default app;
