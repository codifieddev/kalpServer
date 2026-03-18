"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageModel = exports.getDatabaseConnection = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const page_model_1 = require("../models/page.model");
let isConnected = false;
const pageModelCache = new Map();
const connectDB = async (mongoUri) => {
    if (isConnected) {
        return;
    }
    await mongoose_1.default.connect(mongoUri);
    isConnected = true;
    console.log("MongoDB cluster connected");
};
exports.connectDB = connectDB;
const getDatabaseConnection = (databaseName) => {
    return mongoose_1.default.connection.useDb(databaseName, { useCache: true });
};
exports.getDatabaseConnection = getDatabaseConnection;
const getPageModel = (databaseName) => {
    if (pageModelCache.has(databaseName)) {
        return pageModelCache.get(databaseName);
    }
    const db = (0, exports.getDatabaseConnection)(databaseName);
    const pageModel = db.model("Page", page_model_1.pageSchema);
    pageModelCache.set(databaseName, pageModel);
    return pageModel;
};
exports.getPageModel = getPageModel;
