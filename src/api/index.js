import express from 'express';
import authRoutes from './auth/index.js';
import booksRoutes from './books/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.access(path.join(__dirname, '../images'), error => {
  if (error) {
    fs.mkdirSync(path.join(__dirname, '../images'));
  }
});

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/books', booksRoutes);
apiRouter.use('/images', express.static(path.join(__dirname, '../images')));

export default apiRouter;
