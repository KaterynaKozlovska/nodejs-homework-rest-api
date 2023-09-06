const express = require('express');

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');

const { contactsAddSchema, contactsUpdateSchema } = require('../../schemas/joiShema');

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
      res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Missing required name field' });
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

    if (!result) {
      res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
      res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
