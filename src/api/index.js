import express from 'express';
// todo: import authRoutes from './auth.js';
// todo: import booksRoutes from './books.js';

const apiRouter = express.Router();

apiRouter.get('/test', (req, res) => {
  res.json({ message: 'Test' });
});

// todo: apiRouter.use('/auth', authRoutes);
// todo: apiRouter.use('/books', booksRoutes);

export default apiRouter;
