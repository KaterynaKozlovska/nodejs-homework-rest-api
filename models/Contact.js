import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { handleSaveError, runValidateAtUpdate } from './hooks.js';

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

contactSchema.post('save', handleSaveError);

contactSchema.pre('findOneAndUpdate', runValidateAtUpdate);

contactSchema.post('findOneAndUpdate', handleSaveError);

export const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  favorite: Joi.boolean(),
});

export const contactsUpdateSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
  favorite: Joi.boolean().required(),
});

const Contact = model('contact', contactSchema);

export default Contact;
