import express from 'express';
// todo: import authRoutes from './auth/index.js';
import booksRoutes from './books/index.js';

const apiRouter = express.Router();

apiRouter.get('/test', (req, res) => {
  res.json({ message: 'Test' });
});

// todo: apiRouter.use('/auth', authRoutes);
apiRouter.use('/books', booksRoutes);

export default apiRouter;
