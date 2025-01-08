import express from 'express';
import mongoose from 'mongoose';
import { Book, User } from './models/index.js';
import apiRouter from './api/index.js';

const app = express();

mongoose
  .connect('mongodb://admin:password@localhost:27017/ocdwp6?authSource=admin')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(error => console.log('Connexion à MongoDB échouée !', error));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use('/api', apiRouter);

export default app;
