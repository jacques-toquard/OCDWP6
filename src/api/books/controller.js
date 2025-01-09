import Book from '../../models/Book.js';

export const getAllBooks = (req, res, next) => {
  Book.find()
    .then(books => {
      res.status(200).json(books);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

export const getBookById = (req, res, next) => {
  const bookId = req.params.id;
  Book.findById(bookId)
    .then(book => {
      if (!book) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }
      res.status(200).json(book);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

export const getBestRatedBooks = (req, res, next) => {
  res.status(202).json({ message: 'Not implemented' });
  // todo
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
