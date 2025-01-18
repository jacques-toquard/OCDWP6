import Book from '../../models/Book.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { ratingSchema } from '../../schemas/Rating.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  try {
    const createdBook = JSON.parse(req.body.book);
    const bookRatingsCopy = {
      ratings: createdBook.ratings,
      averageRating: createdBook.averageRating,
    };
    delete createdBook.ratings;
    delete createdBook.averageRating;
    createdBook.userId = req.auth.userId;
    createdBook.imageUrl = `${req.protocol}://${req.get('host')}/api/images/${
      req.file.filename
    }`;
    try {
      if (bookRatingsCopy.ratings.length === 1) {
        if (bookRatingsCopy.ratings[0].userId !== req.auth.userId) {
          throw new Error('You are not allowed to rate this book');
        }
        if (
          bookRatingsCopy.ratings[0].grade < ratingSchema.rating.min ||
          bookRatingsCopy.ratings[0].grade > ratingSchema.rating.max
        ) {
          throw new Error(
            `Rating must be between ${ratingSchema.rating.min} and ${ratingSchema.rating.max}`
          );
        }
        createdBook.ratings = bookRatingsCopy.ratings;
        createdBook.averageRating = bookRatingsCopy.ratings[0].grade;
      } else {
        throw new Error('Erreur lors de la création du livre');
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
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
  const ratingInt = parseInt(rating, 10);
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
      book.ratings.push({ userId, grade: ratingInt });
    } else {
      return res.status(400).json({ message: 'Vous avez déjà noté ce livre' });
    }
    const averageRating =
      book.ratings.reduce(
        (runningTotal, rating) => runningTotal + rating.grade,
        0
      ) / book.ratings.length;
    book.averageRating = averageRating;
    await book.save();
    res.status(200).json(book);
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
        await fs.unlink(req.file.path);
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
          await fs.unlink(path.join(__dirname, '../../images', oldFilename));
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
        await fs.unlink(req.file.path);
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
        await fs.unlink(path.join(__dirname, '../../images', oldFilename));
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
