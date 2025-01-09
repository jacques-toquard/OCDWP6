import User from '../../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

const OCDWP6_SECRET_KEY = process.env.OCDWP6_SECRET_KEY;

export const signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, saltRounds)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur crée' }))
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

export const login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
          }
          res.status(200).json({
            userId: user._id,
            token: `Bearer ${jwt.sign({ userId: user._id }, OCDWP6_SECRET_KEY, {
              expiresIn: '7d',
            })}`,
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
