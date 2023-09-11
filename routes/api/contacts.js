import express from 'express';

import ctrl from '../../controllers/contacts.js';

import * as contactSchema from '../../models/Contact.js';

import { isValidId } from '../../middlewares/index.js';
import { validateBody } from '../../helpers/index.js';

const contactsRouter = express.Router();
const contactAddValidate = validateBody(contactSchema.contactsAddSchema);
const contactUpdateValidate = validateBody(contactSchema.contactsUpdateSchema);

contactsRouter.get('/', ctrl.getAllContacts);

contactsRouter.get('/:id', isValidId, ctrl.getById);

contactsRouter.post('/', contactAddValidate, ctrl.add);

contactsRouter.delete('/:id', isValidId, ctrl.removeById);

contactsRouter.put('/:id', isValidId, contactUpdateValidate, ctrl.updateById);

contactsRouter.patch('/:id/favorite', isValidId, contactUpdateValidate, ctrl.updateStatusContact);

export default contactsRouter;
