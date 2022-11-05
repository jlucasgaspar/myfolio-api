import mongoose, { model } from 'mongoose';
import { validateBr } from 'js-brasil';
import { IUser } from '../dto/user.dto';

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, 'E-mail is required'],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    validate: validateBr.telefone,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

export const UserModel = model('users', userSchema, 'users');
