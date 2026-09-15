import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { env } from "../config/env.js";
import type { StorageProvider, UploadedFile, UploadFileInput } from "./storageProvider.interface.js";

export class LocalDiskStorageProvider implements StorageProvider {
  readonly name = "local" as const;

  async upload(input: UploadFileInput): Promise<UploadedFile> {
    await mkdir(env.STORAGE_LOCAL_UPLOAD_DIR, { recursive: true });
    const extension = path.extname(input.fileName);
    const key = `${randomUUID()}${extension}`;
    await writeFile(path.join(env.STORAGE_LOCAL_UPLOAD_DIR, key), input.buffer);
    return { key, url: `/uploads/${key}` };
  }

  async delete(key: string): Promise<void> {
    await unlink(path.join(env.STORAGE_LOCAL_UPLOAD_DIR, key)).catch(() => undefined);
  }
}
