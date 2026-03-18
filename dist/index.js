"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
dotenv_1.default.config();
const port = Number(process.env.PORT) || 5001;
const mongoUri = process.env.MONGODB_URI;
const startServer = async () => {
    if (!mongoUri) {
        throw new Error("MONGODB_URI is not defined in the environment");
    }
    await (0, db_1.connectDB)(mongoUri);
    const server = app_1.default.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    server.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
            console.error(`Port ${port} is already in use. Stop the existing process or use a different PORT.`);
            process.exit(1);
        }
        console.error("Server failed to start", error);
        process.exit(1);
    });
};
startServer().catch((error) => {
    console.error("Failed to start server", error);
    process.exit(1);
});
