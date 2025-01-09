import Book from '../../models/Book.js';
import fs from 'fs';

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

export const createBook = async (req, res, next) => {
  try {
    const createdBook = JSON.parse(req.body.book);
    delete createdBook.ratings;
    delete createdBook.averageRating;
    createdBook.userId = req.auth.userId;
    createdBook.imageUrl = `${req.protocol}://${req.get('host')}/api/images/${
      req.file.filename
    }`;
    const book = new Book(createdBook);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.log('ERROR at `POST/api/books/`:\n', error);
    res.status(400).json({ error });
    try {
      await fs.unlink(req.file.path);
    } catch (unlinkError) {
      console.log(
        'Warning: Could not delete uploaded file:',
        unlinkError,
        `\noldFilename: ${req.file.filename}`
      );
    }
  }
};

export const rateBook = async (req, res, next) => {
  const { userId, rating } = req.body;
  if (userId !== req.auth.userId) {
    // le document explicite que le body contient un champ userId
    return res.status(403).json({ message: 'Non autorisé' });
  }
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Livre non rencontré' });
    }
    const ratingIndex = book.ratings.findIndex(
      rating => rating.userId === userId
    );
    if (ratingIndex === -1) {
      book.ratings.push({ userId, rating });
    } else {
      book.ratings[ratingIndex].rating = rating;
    }
    const averageRating =
      book.ratings.reduce((runningTotal, rating) => runningTotal + rating.rating, 0) /
      book.ratings.length;
    book.averageRating = averageRating;
    await book.save();
    res.status(200).json({ book: book });
  } catch (error) {
    console.log('ERROR at `POST/api/books/:id/rating`:\n', error);
    res.status(500).json({ error });
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }
    if (book.userId !== req.auth.userId) {
      return res.status(403).json({ message: 'Non autorisé' });
    }
    let modifiedBook;
    try {
      modifiedBook = req.file ? JSON.parse(req.body.book) : { ...req.body };
    } catch (error) {
      if (req.file) {
        await fs.promises.unlink(req.file.path);
      }
      return res.status(400).json({ error: 'Invalid book data format' });
    }
    delete modifiedBook.ratings;
    delete modifiedBook.averageRating;
    delete modifiedBook.userId;
    if (req.file) {
      modifiedBook.imageUrl = `${req.protocol}://${req.get('host')}/api/images/${req.file.filename}`;
      if (book.imageUrl) {
        const oldFilename = book.imageUrl.split('/images/')[1];
        try {
          await fs.promises.unlink(
            path.join(__dirname, '../../images', oldFilename)
          );
        } catch (error) {
          console.log(
            'Warning: Could not delete old image:',
            error,
            `\noldFilename: ${oldFilename}`
          );
        }
      }
    }
    await Book.updateOne({ _id: req.params.id }, { $set: modifiedBook });
    res.status(200).json({ message: 'Livre mis à jour' });
  } catch (error) {
    console.log('ERROR at `PUT/api/books/:id`:\n', error);
    if (req.file) {
      try {
        await fs.promises.unlink(req.file.path);
      } catch (unlinkError) {
        console.log(
          'Warning: Could not delete uploaded file:',
          unlinkError,
          `\noldFilename: ${req.file.filename}`
        );
      }
    }
    res.status(500).json({ error });
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Livre non rencontré' });
    }
    if (book.userId !== req.auth.userId) {
      return res.status(403).json({ message: 'Non autorisé' });
    }
    await Book.deleteOne({ _id: req.params.id });
    if (book.imageUrl) {
      const oldFilename = book.imageUrl.split('/images/')[1];
      try {
        await fs.promises.unlink(
          path.join(__dirname, '../../images', oldFilename)
        );
      } catch (error) {
        console.log(
          'Warning: Could not delete old image:',
          error,
          `\noldFilename: ${oldFilename}`
        );
      }
    }
    res.status(200).json({ message: 'Livre supprimé' });
  } catch (error) {
    console.log('ERROR at `DELETE/api/books/:id`:\n', error);
    res.status(500).json({ error });
  }
};
