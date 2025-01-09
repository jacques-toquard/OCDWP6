import User from '../../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
const OCDWP6_SECRET_KEY = process.env.OCDWP6_SECRET_KEY;

export const signup = async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, saltRounds),
    });
    await user.save();
    res.status(201).json({ message: 'Utilisateur crée' });
  } catch (error) {
    console.log('ERROR at `POST /api/auth/signup`:\n', error);
    res.status(500).json({ error });
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }
    res.status(200).json({
      userId: user._id,
      token: `${jwt.sign({ userId: user._id }, OCDWP6_SECRET_KEY, {
        expiresIn: '7d',
      })}`,
    });
  } catch (error) {
    console.log('ERROR at `POST/api/auth/login`:\n', error);
    res.status(500).json({ error });
  }
};
