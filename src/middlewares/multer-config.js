import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../images'));
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPE_MAP[file.mimetype];
    if (!extension) {
      callback(new Error('Type de fichier non supporté'), null);
    } else {
      callback(null, `${uuidv4()}.${extension}`);
    }
  },
});

export default multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MiB
  },
}).single('image');
