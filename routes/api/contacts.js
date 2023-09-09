const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');

const { contactsAddSchema, contactsUpdateSchema } = require('../schemas/joiShema');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', validateBody(contactsAddSchema), ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', validateBody(contactsUpdateSchema), ctrl.updateContact);

module.exports = router;
