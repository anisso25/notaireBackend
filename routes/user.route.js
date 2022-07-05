const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const {
	createUserSchema,
	//updateUserSchema,
	validateLogin,
} = require('../middleware/validators/userValidator.middleware');

router.post(
	'/login',
	validateLogin,
	awaitHandlerFactory(userController.userLogin)
);
router.post(
	'/register',
	createUserSchema,
	awaitHandlerFactory(userController.createUser)
);
router.get(
	'/profile',
	auth(),
	awaitHandlerFactory(userController.getCurrentUser)
);

/*
router.get('/', auth(), awaitHandlerFactory(userController.getAllUsers));
router.get('/id/:id', auth(), awaitHandlerFactory(userController.getUserById));
router.get('/username/:username', auth(), awaitHandlerFactory(userController.getUserByuserName));
router.patch('/id/:id', auth(UserRoles.Admin), updateUserSchema, awaitHandlerFactory(userController.updateUser));
router.delete('/id/:id', auth(UserRoles.Admin), awaitHandlerFactory(userController.deleteUser));
*/

module.exports = router;
