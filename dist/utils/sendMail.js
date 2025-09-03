"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const SomethingWentWrong_1 = require("../errors/SomethingWentWrong");
const transporter = nodemailer_1.default.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    host: process.env.NODEMAILER_HOST,
    port: parseInt(process.env.NODEMAILER_PORT || "465", 10),
    secure: process.env.NODEMAILER_PORT === "465",
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    },
    debug: true,
    logger: true,
});
console.log({
    service: process.env.NODEMAILER_SERVICE,
    host: process.env.NODEMAILER_HOST,
    port: parseInt(process.env.NODEMAILER_PORT || "465", 10),
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    },
    debug: true, // Enable logs
    logger: true, // Log SMTP interactions
});
const sendEmail = async ({ to, subject, html }) => {
    try {
        const mailOptions = {
            from: `"Invokers Software" <${process.env.NODEMAILER_EMAIL}>`,
            to,
            subject,
            replyTo: "no-reply@invokers.com",
            html,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
        return info;
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw new SomethingWentWrong_1.SomethingWentWrongError();
    }
};
exports.sendEmail = sendEmail;
