const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');

const { contactsAddSchema, contactsUpdateSchema } = require('../../schemas/joiShema');

const router = express.Router();

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(contactsAddSchema), ctrl.add);

router.delete('/:contactId', ctrl.removeById);

router.put('/:contactId', validateBody(contactsUpdateSchema), ctrl.updateById);

module.exports = router;
