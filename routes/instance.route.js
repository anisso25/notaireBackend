const express = require('express');
const router = express.Router();
const instanceController = require('../controllers/instance.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const {
	createInstanceSchema,
	updateInstanceSchema,
} = require('../middleware/validators/instanceValidator.middleware');
const {
	idSchema,
} = require('../middleware/validators/globalValidator.middleware');

router.post(
	'/create',
	auth(),
	createInstanceSchema,
	awaitHandlerFactory(instanceController.createInstance)
);

router.get(
	'/instance/:id',
	auth(),
	awaitHandlerFactory(instanceController.getInstanceById)
);

router.get(
	'/',
	auth(),
	awaitHandlerFactory(instanceController.getAllInstances)
);

router.delete(
	'/instance/:id',
	auth(),
	idSchema,
	awaitHandlerFactory(instanceController.deleteInstance)
);

router.put(
	'/instance/:id',
	auth(),
	idSchema,
	updateInstanceSchema,
	awaitHandlerFactory(instanceController.updateInstance)
);

module.exports = router;
