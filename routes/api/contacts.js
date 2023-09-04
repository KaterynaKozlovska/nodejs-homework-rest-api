const express = require('express');

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');

const { schema } = require('../../schemas/joiShema');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);

    if (!result) {
      res.status(200).json(result);
      res.status(404).json({ message: `Contact by ID ${contactId}: not found` });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(500).json({ message: 'Missing required name field' });
    }

    const { name, email, phone } = req.body;
    const result = await addContact({ name, email, phone });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(500).json({ message: 'Missing fields' });
    }

    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const result = await updateContact(contactId, { name, email, phone });

    if (!result) {
      res.status(200).json(result);
      res.status(404).json({ message: `Contact by ID ${contactId}: not found` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
