const express = require('express');
const router = express.Router();
const entityController = require('../controllers/entity.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { roles: UserRoles } = require('../utils/userValues.utils');

const {
	createEntitySchema,
	updateEntitySchema,
} = require('../middleware/validators/entityValidator.middleware');
const {
	idSchema,
} = require('../middleware/validators/globalValidator.middleware');

router.post(
	'/create',
	auth(UserRoles.SuperAdmin),
	createEntitySchema,
	awaitHandlerFactory(entityController.createEntity)
);

router.get(
	'/',
	auth(),
	awaitHandlerFactory(entityController.getAllEntities)
);

router.get(
	'/entity/:id',
	auth(),
	awaitHandlerFactory(entityController.getEntityById)
);

router.put(
	'/entity/:id',
	auth(UserRoles.SuperAdmin),
	idSchema,
	updateEntitySchema,
	awaitHandlerFactory(entityController.updateEntity)
);

router.delete(
	'/entity/:id',
	auth(UserRoles.SuperAdmin),
	idSchema,
	awaitHandlerFactory(entityController.deleteEntity)
);

module.exports = router;
