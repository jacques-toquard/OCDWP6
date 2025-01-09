export const ratingSchema = {
  userId: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
};
