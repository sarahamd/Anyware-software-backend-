"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const NotFoundError_1 = require("./errors/NotFoundError");
const errorHandler_middleware_1 = __importDefault(require("./middlewares/errorHandler.middleware"));
// IMPORT ROUTES
const adminAuth_routes_1 = __importDefault(require("./routes/adminAuth.routes"));
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
const announcement_routes_1 = __importDefault(require("./routes/announcement.routes"));
const quiz_routes_1 = __importDefault(require("./routes/quiz.routes"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// CORS Middleware
const corsOptions = {
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use((0, cors_1.default)(corsOptions));
// Routes
app.use("/auth", adminAuth_routes_1.default);
app.use("/upload", upload_routes_1.default);
app.use("/announcements", announcement_routes_1.default);
app.use("/quizzes", quiz_routes_1.default);
// Not Found Handler
app.use((req, res, next) => {
    next(new NotFoundError_1.NotFoundError());
});
// Error Handler Middleware
app.use((err, req, res, next) => {
    (0, errorHandler_middleware_1.default)(err, req, res, next);
});
exports.default = app;
