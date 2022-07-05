const { body } = require('express-validator');
const { User: UserModel, Office: OfficeModel } = require('../../models');

exports.validateLogin = [
	body('email')
		.exists()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Must be a valid email')
		.normalizeEmail({ gmail_remove_dots: false }),
	body('password')
		.exists()
		.withMessage('Password is required')
		.notEmpty()
		.withMessage('Password must be filled'),
];

exports.createUserSchema = [
	body('OfficeId')
		.exists()
		.withMessage('OfficeId is required')
		.custom(async (OfficeId) => {
			await OfficeModel.findByPk(OfficeId).then((office) => {
				if (!office) return Promise.reject('Office not found');
			});
		}),
	body('name')
		.exists()
		.withMessage('Your name is required')
		.isString()
		.withMessage('Invalid name')
		.isLength({ min: 2 })
		.withMessage('Must be at least 2 chars long'),
	body('email')
		.exists()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Must be a valid email')
		.normalizeEmail({ gmail_remove_dots: false })
		.custom(async (email) => {
			await UserModel.findOne({
				where: { email },
			}).then((user) => {
				if (user) return Promise.reject('E-mail already in use');
			});
		}),
	/*
	body('role')
		.optional()
		.isIn([UserRoles.Admin, UserRoles.SupeAdmin])
		.withMessage('Invalid Role'),
	*/
	body('password')
		.exists()
		.withMessage('Password is required')
		.notEmpty()
		.isLength({ min: 6 })
		.withMessage('Password must contain at least 6 characters')
		.isLength({ max: 10 })
		.withMessage('Password can contain max 10 characters'),
	body('confirm_password')
		.exists()
		.custom((value, { req }) => value === req.body.password)
		.withMessage(
			'confirm_password field must have the same value as the password field'
		),
];

/*
exports.updateUserSchema = [
	body('username')
		.optional()
		.isLength({ min: 2 })
		.withMessage('Must be at least 2 chars long'),
	body('first_name')
		.optional()
		.isAlpha()
		.withMessage('Must be only alphabetical chars')
		.isLength({ min: 2 })
		.withMessage('Must be at least 2 chars long'),
	body('last_name')
		.optional()
		.isAlpha()
		.withMessage('Must be only alphabetical chars')
		.isLength({ min: 2 })
		.withMessage('Must be at least 2 chars long'),
	body('email')
		.optional()
		.isEmail()
		.withMessage('Must be a valid email')
		.normalizeEmail({ gmail_remove_dots: false }),
	body('role')
		.optional()
		.isIn([UserRoles.Admin, UserRoles.SupeAdmin])
		.withMessage('Invalid Role type'),
	body('password')
		.optional()
		.notEmpty()
		.isLength({ min: 6 })
		.withMessage('Password must contain at least 6 characters')
		.isLength({ max: 10 })
		.withMessage('Password can contain max 10 characters')
		.custom((value, { req }) => !!req.body.confirm_password)
		.withMessage('Please confirm your password'),
	body('confirm_password')
		.optional()
		.custom((value, { req }) => value === req.body.password)
		.withMessage('confirm_password field must have the same value as the password field'),
	body('age')
		.optional()
		.isInt()
		.withMessage('Must be a number'),
	body()
		.custom(value => {
			return !!Object.keys(value).length;
		})
		.withMessage('Please provide required field to update')
		.custom(value => {
			const updates = Object.keys(value);
			const allowUpdates = ['username', 'password', 'confirm_password', 'email', 'role', 'first_name', 'last_name', 'age'];
			return updates.every(update => allowUpdates.includes(update));
		})
		.withMessage('Invalid updates!')
];
*/
