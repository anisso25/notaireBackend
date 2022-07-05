const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { roles: UserRoles } = require('../utils/userValues.utils');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const {
	createCategorySchema,
	updateCategorySchema,
} = require('../middleware/validators/categoryValidator.middleware');

const {
	idSchema,
} = require('../middleware/validators/globalValidator.middleware');

router.get(
	'/',
	auth(),
	awaitHandlerFactory(categoryController.getAllCategories)
);
router.post(
	'/create',
	auth(UserRoles.SuperAdmin),
	upload.single('icon'),
	createCategorySchema,
	awaitHandlerFactory(categoryController.createCategory)
);
router.put(
	'/category/:id',
	auth(UserRoles.SuperAdmin),
	upload.single('icon'),
	idSchema,
	updateCategorySchema,
	awaitHandlerFactory(categoryController.updateCategory)
);
router.delete(
	'/category/:id',
	auth(UserRoles.SuperAdmin),
	idSchema,
	awaitHandlerFactory(categoryController.deleteCategory)
);

module.exports = router;
