import { ratingSchema } from '../schemas/Rating.js';

export default (req, res, next) => {
  const { rating } = req.body;
  const errors = [];
  if (!userId) {
    errors.push("Le format de l'id de l'utilisateur est invalide");
  }
  if (
    isNaN(parseFloat(rating)) ||
    rating < Rating.rating.min ||
    rating > Rating.rating.max
  ) {
    errors.push('Le format de la note est invalide');
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};
