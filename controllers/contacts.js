import { HttpError, ctrlWrapper } from '../helpers/index.js';
import Contact from '../models/Contact.js';

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, { skip, limit }).populate(
    'owner',
    'email, subscription'
  );
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.status(200).json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const removeById = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.status(200).json({
    message: 'Delete success',
  });
};

const updateById = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { favorite } = req.body;
  const result = await Contact.findOneAndUpdate({ _id: id, owner }, { favorite }, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
