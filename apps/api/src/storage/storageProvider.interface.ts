export interface UploadFileInput {
  fileName: string;
  contentType: string;
  buffer: Buffer;
}

export interface UploadedFile {
  key: string;
  url: string;
}

export interface StorageProvider {
  readonly name: "local" | "s3";
  upload(input: UploadFileInput): Promise<UploadedFile>;
  delete(key: string): Promise<void>;
}
