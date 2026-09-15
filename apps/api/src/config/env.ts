import "dotenv/config";
import { z } from "zod";

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().int().positive().default(4000),

    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

    JWT_ACCESS_SECRET: z.string().min(16, "JWT_ACCESS_SECRET must be at least 16 characters"),
    JWT_REFRESH_SECRET: z.string().min(16, "JWT_REFRESH_SECRET must be at least 16 characters"),
    JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
    JWT_REFRESH_EXPIRES_IN: z.string().default("30d"),

    COOKIE_DOMAIN: z.string().default("localhost"),
    CORS_ALLOWED_ORIGINS: z.string().min(1, "CORS_ALLOWED_ORIGINS is required"),

    THAWANI_API_KEY: z.string().optional(),
    THAWANI_PUBLISHABLE_KEY: z.string().optional(),
    THAWANI_WEBHOOK_SECRET: z.string().optional(),
    THAWANI_BASE_URL: z.string().optional(),

    WHATSAPP_STORE_NUMBER: z.string().optional(),

    STORAGE_PROVIDER: z.enum(["local", "s3"]).default("local"),
    STORAGE_LOCAL_UPLOAD_DIR: z.string().default("./uploads"),
    STORAGE_S3_ENDPOINT: z.string().optional(),
    STORAGE_S3_REGION: z.string().optional(),
    STORAGE_S3_BUCKET: z.string().optional(),
    STORAGE_S3_ACCESS_KEY_ID: z.string().optional(),
    STORAGE_S3_SECRET_ACCESS_KEY: z.string().optional(),
    STORAGE_S3_PUBLIC_BASE_URL: z.string().optional()
  })
  .superRefine((value, ctx) => {
    if (value.STORAGE_PROVIDER === "s3") {
      const required = [
        "STORAGE_S3_REGION",
        "STORAGE_S3_BUCKET",
        "STORAGE_S3_ACCESS_KEY_ID",
        "STORAGE_S3_SECRET_ACCESS_KEY",
        "STORAGE_S3_PUBLIC_BASE_URL"
      ] as const;

      for (const key of required) {
        if (!value[key]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [key],
            message: `${key} is required when STORAGE_PROVIDER=s3`
          });
        }
      }
    }
  });

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("Invalid environment configuration:");
    for (const issue of parsed.error.issues) {
      console.error(`  ${issue.path.join(".")}: ${issue.message}`);
    }
    process.exit(1);
  }

  return parsed.data;
}

export const env = loadEnv();

export const corsAllowedOrigins = env.CORS_ALLOWED_ORIGINS.split(",").map((origin) => origin.trim());
