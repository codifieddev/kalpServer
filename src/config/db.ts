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

  // Set up connection event listeners
  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to MongoDB cluster");
    isConnected = true;
  });

  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
    isConnected = false;
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from MongoDB cluster");
    isConnected = false;
  });

  try {
    await mongoose.connect(mongoUri);
    console.log("Initial MongoDB connection request sent");
  } catch (error) {
    console.error("Failed to connect to MongoDB cluster during initial call:", error);
    throw error;
  }
};

export const getDatabaseConnection = (databaseName: string): Connection => {
  console.log(`Getting connection for database: ${databaseName}`);
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
