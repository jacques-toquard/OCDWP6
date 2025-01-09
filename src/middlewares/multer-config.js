import multer from 'multer';
import { uuidv4 } from 'uuid';
import path from 'path';

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
    fileSize: 5 * 1024 * 1024, // 5MB
  },
}).single('image');
