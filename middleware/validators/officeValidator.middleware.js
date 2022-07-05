const { body } = require('express-validator');
const { User: UserModel } = require('../../models');

exports.createOfficeSchema = [
	body('name')
		.exists()
		.withMessage('Name is required')
		.isString()
		.withMessage('Invalid name')
		.isLength({ min: 2 })
		.withMessage('Must be at least 2 chars long'),
	body('address')
		.exists()
		.withMessage('Address is required')
		.isString()
		.withMessage('Invalid Address')
		.isLength({ min: 2 })
		.withMessage('Must be at least 2 chars long'),
	body('admin.name')
		.exists()
		.withMessage('Admin name is required')
		.isString()
		.withMessage('Invalid admin name')
		.isLength({ min: 2 })
		.withMessage('Must be at least 2 chars long'),
	body('admin.email')
		.exists()
		.withMessage('Admin email is required')
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
	body('admin.password')
		.exists()
		.withMessage('Admin password is required')
		.notEmpty()
		.isLength({ min: 6 })
		.withMessage('Password must contain at least 6 characters')
		.isLength({ max: 10 })
		.withMessage('Password can contain max 10 characters'),
];

exports.updateOfficeSchema = [
	body('name')
		.optional()
		.isString()
		.withMessage('Invalid name')
		.isLength({ min: 2 })
		.withMessage('Must be at least 2 chars long'),
	body('address')
		.optional()
		.isString()
		.withMessage('Invalid Address')
		.isLength({ min: 2 })
		.withMessage('Must be at least 2 chars long'),
	body('reference')
		.optional()
		.isInt()
		.withMessage('Reference must be of type integer'),
	body()
		.custom((value) => {
			return !!Object.keys(value).length;
		})
		.withMessage('Please provide any field to update')
		.custom((value) => {
			const updates = Object.keys(value);
			const allowUpdates = ['name', 'address', 'reference'];
			return updates.every((update) => allowUpdates.includes(update));
		})
		.withMessage('Invalid request!'),
];
