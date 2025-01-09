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

const booksRouter = express.Router();

booksRouter.get('/', getAllBooks);
booksRouter.get('/bestrating', getBestRatedBooks); // todo
booksRouter.get('/:id', getBookById);

booksRouter.post('/', auth, createBook); // todo
booksRouter.post('/:id/rating', auth, rateBook); // todo

booksRouter.put('/:id', auth, updateBook); // todo

booksRouter.delete('/:id', auth, deleteBook); // todo

export default booksRouter;
