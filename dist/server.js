"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const startServer = async () => {
    try {
        const port = process.env.PORT || 3000;
        app_1.default.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
        await (0, database_1.default)();
    }
    catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};
startServer();
