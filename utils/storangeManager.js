import Multer from "multer";
import { Storage } from "@google-cloud/storage";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";
const maxSize = 50 * 1024 * 1024
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = new Storage({ keyFilename: path.join(__dirname, "../config/google-cloud-key.json" ) });

export const processFileMiddleware = Multer({
    storage: Multer.memoryStorage(),
    limits: { fileSize: maxSize },
  });

export const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);