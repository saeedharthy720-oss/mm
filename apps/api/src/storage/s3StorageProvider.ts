import { randomUUID } from "node:crypto";
import path from "node:path";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "../config/env.js";
import type { StorageProvider, UploadedFile, UploadFileInput } from "./storageProvider.interface.js";

export class S3StorageProvider implements StorageProvider {
  readonly name = "s3" as const;
  private readonly client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: env.STORAGE_S3_REGION,
      endpoint: env.STORAGE_S3_ENDPOINT || undefined,
      // S3-compatible providers (Supabase Storage, MinIO, and R2) serve buckets as
      // a path segment rather than a subdomain of the endpoint. The AWS SDK
      // defaults to virtual-hosted style, which those providers reject.
      forcePathStyle: env.STORAGE_S3_FORCE_PATH_STYLE,
      credentials: {
        accessKeyId: env.STORAGE_S3_ACCESS_KEY_ID!,
        secretAccessKey: env.STORAGE_S3_SECRET_ACCESS_KEY!
      }
    });
  }

  async upload(input: UploadFileInput): Promise<UploadedFile> {
    const extension = path.extname(input.fileName);
    const key = `${randomUUID()}${extension}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: env.STORAGE_S3_BUCKET,
        Key: key,
        Body: input.buffer,
        ContentType: input.contentType
      })
    );

    return { key, url: `${env.STORAGE_S3_PUBLIC_BASE_URL}/${key}` };
  }

  async delete(key: string): Promise<void> {
    await this.client.send(new DeleteObjectCommand({ Bucket: env.STORAGE_S3_BUCKET, Key: key }));
  }
}
