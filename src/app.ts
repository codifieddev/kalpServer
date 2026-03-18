import express from "express";
import cors from "cors";
import pageRoutes from "./routes/page.routes";
import formRoutes from "./routes/form.routes";

const app = express();

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "").split(",").filter(Boolean);

// Always allow common local dev ports so the app works out-of-the-box
const DEFAULT_DEV_ORIGINS = [
  "http://localhost:8081", // Expo web
  "http://localhost:3000", // Next.js / CRA
  "http://localhost:19006", // Expo dev tools
  "http://127.0.0.1:8081",
  "http://127.0.0.1:3000"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server / curl requests (no Origin header)
      if (!origin) return callback(null, true);

      const allowed = [...DEFAULT_DEV_ORIGINS, ...ALLOWED_ORIGINS];
      if (allowed.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    },
    credentials: true, // required for cookies / Authorization header
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running"
  });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running"
  });
});

app.use("/api/:databaseName/pages", pageRoutes);
app.use("/api/:databaseName/forms", formRoutes);

export default app;
