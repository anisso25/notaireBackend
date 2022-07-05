const express = require('express');
const router = express.Router();
const documentController = require('../controllers/document.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const {
	createDocumentSchema,
	updateDocumentSchema,
} = require('../middleware/validators/documentValidator.middleware');

const {
	idSchema,
} = require('../middleware/validators/globalValidator.middleware');

router.post(
	'/create',
	auth(),
	createDocumentSchema,
	awaitHandlerFactory(documentController.createDocument)
);
router.put(
	'/document/:id',
	auth(),
	idSchema,
	updateDocumentSchema,
	awaitHandlerFactory(documentController.updateDocument)
);
router.put(
	'/document/:id/make_as_finilased',
	auth(),
	idSchema,
	awaitHandlerFactory(documentController.makeDocumentAsFinalised)
);
router.delete(
	'/document/:id',
	auth(),
	idSchema,
	awaitHandlerFactory(documentController.deleteDocument)
);
router.get(
	'/',
	auth(),
	awaitHandlerFactory(documentController.getAllDocuments)
);
router.get(
	'/document/:id',
	auth(),
	idSchema,
	awaitHandlerFactory(documentController.getDocumentById)
);

router.post(
	'/document/:id/clone',
	auth(),
	idSchema,
	awaitHandlerFactory(documentController.cloneDocument)
);

module.exports = router;
