import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { handleSaveError, runValidateAtUpdate } from './hooks.js';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', runValidateAtUpdate);

userSchema.post('findOneAndUpdate', handleSaveError);

export const userSignupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email(emailRegexp).required(),
  subscription: Joi.string().required(),
});

export const userSigninSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email(emailRegexp).required(),
});

const User = model('user', userSchema);

export default User;
