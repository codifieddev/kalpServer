import dotenv from "dotenv";
import { Server } from "node:http";
import app from "./app";
import { connectDB } from "./config/db";

dotenv.config();

const port = Number(process.env.PORT) || 5001;
const mongoUri = process.env.MONGODB_URI;

const startServer = async (): Promise<void> => {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in the environment");
  }

  await connectDB(mongoUri);

  const server: Server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use. Stop the existing process or use a different PORT.`);
      process.exit(1);
    }

    console.error("Server failed to start", error);
    process.exit(1);
  });
};

startServer().catch((error: unknown) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
