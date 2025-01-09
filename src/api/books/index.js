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
} from './controller.js';
import validateRating from '../../middlewares/validateRating.js';
import multer from '../../middlewares/multer-config.js';

const booksRouter = express.Router();

booksRouter.get('/', getAllBooks);
booksRouter.get('/bestrating', getBestRatedBooks);
booksRouter.get('/:id', getBookById);

booksRouter.post('/', auth, multer, createBook);
booksRouter.post('/:id/rating', auth, validateRating, rateBook); // todo

booksRouter.put('/:id', auth, updateBook); // todo

booksRouter.delete('/:id', auth, deleteBook); // todo

export default booksRouter;
