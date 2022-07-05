const express = require('express');
const router = express.Router();
const officeController = require('../controllers/office.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { roles: UserRoles } = require('../utils/userValues.utils');

const {
	updateOfficeSchema,
	createOfficeSchema,
} = require('../middleware/validators/officeValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(officeController.getOfficeInfos));
router.put(
	'/office',
	auth(UserRoles.Admin, UserRoles.SuperAdmin),
	updateOfficeSchema,
	awaitHandlerFactory(officeController.updateOffice)
);
router.post(
	'/office',
	auth(UserRoles.SuperAdmin),
	createOfficeSchema,
	awaitHandlerFactory(officeController.createOffice)
);

module.exports = router;
