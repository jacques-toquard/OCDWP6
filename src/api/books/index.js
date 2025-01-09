import express from 'express';
import { getAllBooks, getBookById, getBestRatedBooks } from './controller.js';

const booksRouter = express.Router();

booksRouter.get('/', getAllBooks);
booksRouter.get('/bestrating', getBestRatedBooks);
booksRouter.get('/:id', getBookById);

export default booksRouter;
