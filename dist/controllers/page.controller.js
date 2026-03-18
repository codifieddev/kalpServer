"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageBySlug = exports.getPages = exports.createPage = void 0;
const db_1 = require("../config/db");
const page_validator_1 = require("../validators/page.validator");
const getDatabaseName = (req) => {
    const { databaseName } = req.params;
    if (typeof databaseName !== "string" || databaseName.trim() === "") {
        throw new Error("databaseName route parameter is required");
    }
    return databaseName;
};
const createPage = async (req, res) => {
    try {
        const databaseName = getDatabaseName(req);
        const payload = (0, page_validator_1.parsePageInput)(req.body);
        const Page = (0, db_1.getPageModel)(databaseName);
        const existingPage = await Page.findOne({ slug: payload.slug }).lean();
        if (existingPage) {
            res.status(409).json({
                success: false,
                message: `Page with slug "${payload.slug}" already exists`
            });
            return;
        }
        const page = await Page.create(payload);
        res.status(201).json({
            success: true,
            data: page
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Unable to create page"
        });
    }
};
exports.createPage = createPage;
const getPages = async (req, res) => {
    try {
        const databaseName = getDatabaseName(req);
        const Page = (0, db_1.getPageModel)(databaseName);
        const pages = await Page.find().sort({ updatedAt: -1 }).lean();
        res.status(200).json({
            success: true,
            data: pages
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Unable to fetch pages"
        });
    }
};
exports.getPages = getPages;
const getPageBySlug = async (req, res) => {
    try {
        const databaseName = getDatabaseName(req);
        const { slug } = req.params;
        const Page = (0, db_1.getPageModel)(databaseName);
        const page = await Page.findOne({ slug }).lean();
        if (!page) {
            res.status(404).json({
                success: false,
                message: `No page found for slug "${slug}"`
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: page
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Unable to fetch page"
        });
    }
};
exports.getPageBySlug = getPageBySlug;
