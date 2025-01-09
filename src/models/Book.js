import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    description:
      "identifiant MongoDB unique de l'utilisateur qui a créé le livre",
  },
  title: {
    type: String,
    required: true,
    description: 'titre du livre',
  },
  author: {
    type: String,
    required: true,
    description: 'auteur du livre',
  },
  imageUrl: {
    type: String,
    required: true,
    description: 'illustration/couverture du livre',
  },
  year: {
    type: Number,
    required: true,
    description: 'année de publication du livre',
  },
  genre: {
    type: String,
    required: true,
    description: 'genre du livre',
  },
  ratings: {
    type: [
      {
        userId: {
          type: String,
          required: true,
        },
        grade: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
    description: 'notes données à un livre',
  },
  averageRating: {
    type: Number,
    default: 0,
    required: true,
    description: 'note moyenne du livre',
  },
});

export default mongoose.model('Book', bookSchema);
