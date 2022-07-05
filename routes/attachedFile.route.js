const express = require('express');
const router = express.Router();
const attachedFileController = require('../controllers/attachedFile.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const {
	filenameAttachedFileSchema,
	addAttachedFileSchema,
	updateAttachedFileSchema,
} = require('../middleware/validators/attachedFileValidator.middleware');

router.get(
	'/',
	auth(),
	filenameAttachedFileSchema,
	awaitHandlerFactory(attachedFileController.getAttachedFile)
);

router.delete(
	'/',
	auth(),
	filenameAttachedFileSchema,
	awaitHandlerFactory(attachedFileController.deleteAttachedFile)
);

router.post(
	'/',
	auth(),
	upload.single('file'),
	addAttachedFileSchema,
	awaitHandlerFactory(attachedFileController.addAttachedFile)
);

router.put(
	'/',
	auth(),
	filenameAttachedFileSchema,
	updateAttachedFileSchema,
	awaitHandlerFactory(attachedFileController.updateAttachedFile)
);

module.exports = router;
