const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../models/contacts');

const { HttpError, ctrlWrapper } = require('../helpers');


const listContacts = async (req, res) => {
  const result = await listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
