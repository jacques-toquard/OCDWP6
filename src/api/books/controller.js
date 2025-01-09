import Book from '../../models/Book.js';

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.log('ERROR at `GET/api/books/`:\n', error);
    res.status(500).json({ error });
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log('ERROR at `GET/api/books/:id`:\n', error);
    res.status(500).json({ error });
  }
};

export const getBestRatedBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ averageRating: -1 }).limit(3);
    res.status(200).json(books);
  } catch (error) {
    console.log('ERROR at `GET/api/books/bestrating`:\n', error);
    res.status(500).json({ error });
  }
};

export const createBook = (req, res, next) => {
  res.status(202).json({ message: 'Not implemented' });
  // todo
};

export const rateBook = (req, res, next) => {
  res.status(202).json({ message: 'Not implemented' });
  // todo
};

export const updateBook = (req, res, next) => {
  res.status(202).json({ message: 'Not implemented' });
  // todo
};

export const deleteBook = (req, res, next) => {
  res.status(202).json({ message: 'Not implemented' });
  // todo
};
