import express from 'express';
import auth from '../../middlewares/auth.js';
import {
  getAllBooks,
  getBookById,
  getBestRatedBooks,
  createBook,
  rateBook,
  updateBook,
  deleteBook,
} from './controllers.js';
import validateRating from '../../middlewares/validateRating.js';
import multer from '../../middlewares/multer-config.js';

const booksRouter = express.Router();

booksRouter.get('/', getAllBooks);
booksRouter.get('/bestrating', getBestRatedBooks);
booksRouter.get('/:id', getBookById);

booksRouter.post('/', auth, multer, createBook);
booksRouter.post('/:id/rating', auth, validateRating, rateBook);

booksRouter.put('/:id', auth, multer, updateBook);

booksRouter.delete('/:id', auth, deleteBook);

export default booksRouter;
