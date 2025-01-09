import express from 'express';
import authRoutes from './auth/index.js';
import booksRoutes from './books/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/books', booksRoutes);
apiRouter.use('/images', express.static(path.join(__dirname, '../images')));

export default apiRouter;
