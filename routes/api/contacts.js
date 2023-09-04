const express = require('express');

const { listContacts, getContactById } = require('../../models/contacts');

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

// router.post('/', createContact);

// router.delete('/:contactId', deleteContact);

// router.put('/:contactId', changeContact);

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.delete('/:id', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.put('/:id', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

module.exports = router;
