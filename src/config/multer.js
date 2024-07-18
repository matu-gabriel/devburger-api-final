import multer from "multer";
import { fileURLToPath } from "node:url";
import { resolve, extname, dirname } from "node:path";

import { v4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "..", "uploads"),
    filename: (request, file, callback) =>
      callback(null, v4() + extname(file.originalname)),
  }),
};
