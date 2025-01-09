import { userSchema } from '../schemas/User.js';

export default (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];
  if (!email || !userSchema.email.pattern.test(email)) {
    errors.push("Le format de l'email est invalide");
  }
  if (
    !password ||
    password.length < userSchema.password.minLength ||
    password.length > userSchema.password.maxLength
  ) {
    errors.push('Le format du mot de passe est invalide');
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};
