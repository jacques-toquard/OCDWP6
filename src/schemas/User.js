export const userSchema = {
  email: {
    type: String,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    minLength: 12,
    maxLength: 1000,
  },
};
