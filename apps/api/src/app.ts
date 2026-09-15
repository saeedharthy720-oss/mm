import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { pinoHttp } from "pino-http";
import { corsAllowedOrigins, env } from "./config/env.js";
import { logger } from "./lib/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { paymentsRouter } from "./modules/payments/payments.routes.js";
import { apiRouter, healthRouter } from "./routes/index.js";

export function createApp() {
  const app = express();

  // Render/most PaaS terminate TLS at a proxy. Without this Express sees the
  // connection as plain http (so Secure cookies never get set) and rate limiting
  // would bucket every request under the proxy's IP instead of the client's.
  if (env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }

  app.use(
    cors({
      origin(origin, callback) {
        callback(null, !origin || corsAllowedOrigins.includes(origin));
      },
      credentials: true
    })
  );

  // Mounted before express.json() so the webhook handler gets the raw body
  // (needed for any future signature verification, and to avoid double-parsing).
  app.use("/api/v1/payments", paymentsRouter);

  app.use(express.json());
  app.use(cookieParser());
  app.use(pinoHttp({ logger }));

  app.use("/health", healthRouter);
  app.use("/uploads", express.static(env.STORAGE_LOCAL_UPLOAD_DIR));
  app.use("/api/v1", apiRouter);

  app.use((req, res) => {
    res.status(404).json({ error: { code: "NOT_FOUND", message: `No route for ${req.method} ${req.path}` } });
  });

  app.use(errorHandler);

  return app;
}
