const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { roles: UserRoles } = require('../utils/userValues.utils');

const {
	createEmployeeSchema,
	updateEmployeeSchema,
} = require('../middleware/validators/employeeValidator.middleware');

router.post(
	'/create',
	auth(UserRoles.Admin, UserRoles.SuperAdmin),
	createEmployeeSchema,
	awaitHandlerFactory(employeeController.createEmployee)
);

router.get(
	'/',
	auth(UserRoles.Admin, UserRoles.SuperAdmin),
	awaitHandlerFactory(employeeController.getAllEmployee)
);

router.get(
	'/employee/:id',
	auth(UserRoles.Admin, UserRoles.SuperAdmin),
	awaitHandlerFactory(employeeController.getEmployeeById)
);

router.put(
	'/employee/:id',
	auth(UserRoles.Admin, UserRoles.SuperAdmin),
	updateEmployeeSchema,
	awaitHandlerFactory(employeeController.updateEmployee)
);

router.delete(
	'/employee/:id',
	auth(UserRoles.Admin, UserRoles.SuperAdmin),
	awaitHandlerFactory(employeeController.deleteEmployee)
);

module.exports = router;
