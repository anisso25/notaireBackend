const express = require('express');
const router = express.Router();
const templateController = require('../controllers/template.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { roles: UserRoles } = require('../utils/userValues.utils');

const {
	createTemplateSchema,
	updateTemplateSchema,
} = require('../middleware/validators/templateValidator.middleware');
const {
	idSchema,
} = require('../middleware/validators/globalValidator.middleware');

router.post(
	'/create',
	auth(UserRoles.SuperAdmin),
	createTemplateSchema,
	awaitHandlerFactory(templateController.createTemplate)
);
router.put(
	'/template/:id',
	auth(UserRoles.SuperAdmin),
	idSchema,
	updateTemplateSchema,
	awaitHandlerFactory(templateController.updateTemplate)
);
router.get(
	'/',
	auth(UserRoles.SuperAdmin),
	awaitHandlerFactory(templateController.getAllTemplates)
);

module.exports = router;
