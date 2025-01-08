import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    description: 'adresse e-mail de l’utilisateur [unique]',
  },
  password: {
    type: String,
    required: true,
    description: 'mot de passe haché de l’utilisateur',
  },
});

export default mongoose.model('User', userSchema);
