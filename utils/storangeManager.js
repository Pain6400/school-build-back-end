import Multer from "multer";
import util  from "util";
const maxSize = 50 * 1024 * 1024


let processFile = Multer({
    storage: Multer.memoryStorage(),
    limits: { fileSize: maxSize },
  }).single("file");

export const processFileMiddleware = util.promisify(processFile);