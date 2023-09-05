const Joi = require('joi');

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

const contactsUpdateSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
});

module.exports = {
  contactsAddSchema,
  contactsUpdateSchema,
};
