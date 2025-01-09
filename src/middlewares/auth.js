import jwt from 'jsonwebtoken';

const OCDWP6_SECRET_KEY = process.env.OCDWP6_SECRET_KEY;

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, OCDWP6_SECRET_KEY);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
