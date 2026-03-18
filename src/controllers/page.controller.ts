import { Request, Response } from "express";
import { getPageModel } from "../config/db";
import { PageInput, parsePageInput } from "../validators/page.validator";

const getDatabaseName = (req: Request): string => {
  const { databaseName } = req.params;
    console.log("Database name", databaseName)
  if (typeof databaseName !== "string" || databaseName.trim() === "") {
    throw new Error("databaseName route parameter is required");
  }

  return databaseName;
};

export const createPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const databaseName = getDatabaseName(req);
    const payload: PageInput = parsePageInput(req.body);
    const Page = getPageModel(databaseName);

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
  } catch (error: unknown) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Unable to create page"
    });
  }
};

export const getPages = async (req: Request, res: Response): Promise<void> => {
  try {
    const databaseName = getDatabaseName(req);
    const Page = getPageModel(databaseName);
    const pages = await Page.find().sort({ updatedAt: -1 }).lean();

    res.status(200).json({
      success: true,
      data: pages
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unable to fetch pages"
    });
  }
};

export const getPageBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const databaseName = getDatabaseName(req);
    const { slug } = req.params;
    const Page = getPageModel(databaseName);
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
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unable to fetch page"
    });
  }
};
