const express = require('express');
const router = express.Router();
const toolkitController = require('../controllers/toolkit.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const {
	numberToArabicWordsSchema,
	dateToArabicWordsSchema,
} = require('../middleware/validators/toolkitValidator.middleware');

router.get(
	'/general_data',
	auth(),
	awaitHandlerFactory(toolkitController.getGeneralData)
);

router.get(
	'/number_to_arabic_words',
	auth(),
	numberToArabicWordsSchema,
	awaitHandlerFactory(toolkitController.numberToArabicWords)
);
router.get(
	'/date_to_arabic_words',
	auth(),
	dateToArabicWordsSchema,
	awaitHandlerFactory(toolkitController.dateToArabicWords)
);

router.post(
	'/forgot_password',
	awaitHandlerFactory(toolkitController.forgotPassword)
);

router.post(
	'/reset_password',
	awaitHandlerFactory(toolkitController.resetPassword)
);

module.exports = router;
