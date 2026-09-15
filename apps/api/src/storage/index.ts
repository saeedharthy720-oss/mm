import { env } from "../config/env.js";
import { LocalDiskStorageProvider } from "./localDiskStorageProvider.js";
import { S3StorageProvider } from "./s3StorageProvider.js";
import type { StorageProvider } from "./storageProvider.interface.js";

export function createStorageProvider(): StorageProvider {
  return env.STORAGE_PROVIDER === "s3" ? new S3StorageProvider() : new LocalDiskStorageProvider();
}

export type { StorageProvider, UploadFileInput, UploadedFile } from "./storageProvider.interface.js";
