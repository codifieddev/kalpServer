import mongoose, { Connection, Model } from "mongoose";
import { PageDocument, pageSchema } from "../models/page.model";
import { FormDocument, formSchema } from "../models/form.model";

let isConnected = false;

const pageModelCache = new Map<string, Model<PageDocument>>();
const formModelCache = new Map<string, Model<FormDocument>>();

export const connectDB = async (mongoUri: string): Promise<void> => {
  if (isConnected) {
    return;
  }

  await mongoose.connect(mongoUri);
  isConnected = true;
  console.log("MongoDB cluster connected");
};

export const getDatabaseConnection = (databaseName: string): Connection => {
  return mongoose.connection.useDb(databaseName, { useCache: true });
};

export const getPageModel = (databaseName: string): Model<PageDocument> => {
  if (pageModelCache.has(databaseName)) {
    return pageModelCache.get(databaseName)!;
  }

  const db = getDatabaseConnection(databaseName);
  const pageModel = db.model<PageDocument>("Page", pageSchema);
  pageModelCache.set(databaseName, pageModel);

  return pageModel;
};

export const getFormModel = (databaseName: string): Model<FormDocument> => {
  if (formModelCache.has(databaseName)) {
    return formModelCache.get(databaseName)!;
  }

  const db = getDatabaseConnection(databaseName);
  const formModel = db.model<FormDocument>("Form", formSchema);
  formModelCache.set(databaseName, formModel);

  return formModel;
};
