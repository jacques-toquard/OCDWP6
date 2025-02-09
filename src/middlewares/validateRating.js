import { ratingSchema } from '../schemas/Rating.js';

export default (req, res, next) => {
  const { userId, rating } = req.body;
  const errors = [];
  if (!userId) {
    errors.push("Le format de l'id de l'utilisateur est invalide");
  }
  if (
    isNaN(rating) ||
    rating < ratingSchema.rating.min ||
    rating > ratingSchema.rating.max
  ) {
    errors.push('Le format de la note est invalide');
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};
