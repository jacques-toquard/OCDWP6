import express from 'express';
import authRoutes from './auth/index.js';
import booksRoutes from './books/index.js';

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/books', booksRoutes);

export default apiRouter;
