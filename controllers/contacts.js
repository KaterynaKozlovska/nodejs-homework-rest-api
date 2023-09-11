const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../models/contacts');

const { HttpError, ctrlWrapper } = require('../helpers');
const { contactsAddSchema, contactsUpdateSchema } = require('../schemas/joiShema');

const getAllContacts = async (req, res) => {
  const result = await listContacts();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

const add = async (req, res) => {
  const { error } = contactsAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'Missing required name field');
  }
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

const updateById = async (req, res) => {
  const { error } = contactsUpdateSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'Missing fields');
  }
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};
