const express = require('express');

const contacts = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
});

router.get('/:id', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:id', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:id', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
