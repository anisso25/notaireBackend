const { body } = require('express-validator');

const {
	roles: UserRoles,
} = require('../../utils/userValues.utils');
const { User: UserModel } = require('../../models');
const { Op } = require('sequelize');

exports.createEmployeeSchema = [
	body('name')
		.exists()
		.withMessage('Name is required')
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
	body('type')
		.optional()
		.isIn(Object.values(UserRoles).filter(v => v != UserRoles.SuperAdmin))
		.withMessage('Invalid Type'),
];

exports.updateEmployeeSchema = [
	body('name')
		.optional()
		.isString()
		.withMessage('Invalid name')
		.isLength({ min: 2 })
		.withMessage('Must be at least 2 chars long'),
	body('type')
		.optional()
		.isIn(Object.values(UserRoles).filter(v => v != UserRoles.SuperAdmin))
		.withMessage('Invalid Type'),
	body('email')
		.optional()
		.isEmail()
		.withMessage('Must be a valid email')
		.normalizeEmail({ gmail_remove_dots: false })
		.custom(async (email, { req }) => {
			await UserModel.findOne({
				where: { email, id: { [Op.not]: req.params.id } },
			}).then((user) => {
				if (user) return Promise.reject('E-mail already in use');
			});
		}),
	body('password')
		.optional()
		.notEmpty()
		.isLength({ min: 6 })
		.withMessage('Password must contain at least 6 characters')
		.isLength({ max: 10 })
		.withMessage('Password can contain max 10 characters'),
	body()
		.custom((value) => {
			return !!Object.keys(value).length;
		})
		.withMessage('Please provide any field to update')
		.custom((value) => {
			const updates = Object.keys(value);
			const allowUpdates = [
				'name',
				'email',
				'type',
				'password',
			];
			return updates.every((update) => allowUpdates.includes(update));
		})
		.withMessage('Invalid request!'),
];
