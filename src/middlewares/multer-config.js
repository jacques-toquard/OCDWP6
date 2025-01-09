import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  if (!MIME_TYPES.includes(file.mimetype)) {
    callback(new Error('Type de fichier non supporté'), false);
  } else {
    callback(null, true);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // * 20MiB
  },
  fileFilter,
}).single('image');

export default async function (req, res, next) {
  upload(req, res, async err => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return next();
    }
    try {
      const filename = `${uuidv4()}.webp`;
      const outputPath = path.join(__dirname, '../images', filename);

      await sharp(req.file.buffer)
        .webp({ quality: 50 }) // * WebP with 50% quality
        .resize(800, 1200, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .toFile(outputPath);

      req.file.filename = filename;
      req.file.path = outputPath;
      req.file.mimetype = 'image/webp';

      next();
    } catch (error) {
      console.log('Error processing image:', error);
      return res.status(500).json({ error: 'Error processing image' });
    }
  });
}
