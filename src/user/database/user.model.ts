import mongoose from 'mongoose';
import { model } from 'mongoose';
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
