export const userSchema = {
  email: {
    type: String,
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
};
