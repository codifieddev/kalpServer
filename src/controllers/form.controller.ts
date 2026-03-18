import { Request, Response } from "express";
import { getFormModel } from "../config/db";
// Removed validator import as requested for maximum flexibility

const getDatabaseName = (req: Request): string => {
  const { databaseName } = req.params;
  if (typeof databaseName !== "string" || databaseName.trim() === "") {
    throw new Error("databaseName route parameter is required");
  }
  return databaseName;
};

export const createForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const databaseName = getDatabaseName(req);
    const payload = req.body;
    const Form = getFormModel(databaseName);

    const form = await Form.create({ ...payload, created_at: new Date(), updated_at: new Date() });

    res.status(201).json({
      success: true,
      data: form
    });
  } catch (error: unknown) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Unable to create form"
    });
  }
};

export const getForms = async (req: Request, res: Response): Promise<void> => {
  try {
    const databaseName = getDatabaseName(req);
    const Form = getFormModel(databaseName);
    const forms = await Form.find().sort({ updatedAt: -1 }).lean();

    res.status(200).json({
      success: true,
      data: forms
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unable to fetch forms"
    });
  }
};

export const getFormById = async (req: Request, res: Response): Promise<void> => {
  try {
    const databaseName = getDatabaseName(req);
    const { id } = req.params;
    const Form = getFormModel(databaseName);
    const form = await Form.findById(id).lean();

    if (!form) {
      res.status(404).json({
        success: false,
        message: `No form found with id "${id}"`
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: form
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unable to fetch form"
    });
  }
};

export const updateForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const databaseName = getDatabaseName(req);
    const { id } = req.params;
    const payload = req.body;
    const Form = getFormModel(databaseName);

    const form = await Form.findByIdAndUpdate(id, payload, { new: true }).lean();

    if (!form) {
      res.status(404).json({
        success: false,
        message: `No form found with id "${id}"`
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: form
    });
  } catch (error: unknown) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Unable to update form"
    });
  }
};

export const deleteForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const databaseName = getDatabaseName(req);
    const { id } = req.params;
    const Form = getFormModel(databaseName);

    const result = await Form.findByIdAndDelete(id).lean();

    if (!result) {
      res.status(404).json({
        success: false,
        message: `No form found with id "${id}"`
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Form deleted successfully"
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unable to delete form"
    });
  }
};
