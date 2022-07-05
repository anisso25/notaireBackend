const { query, body } = require('express-validator');

exports.numberToArabicWordsSchema = [
	query('number')
		.exists()
		.withMessage('Number is required')
		.isInt()
		.withMessage('Invalid number'),
	query('textToFollow')
		.exists()
		.withMessage('TextToFollow is required')
		.isBoolean()
		.withMessage('Invalid TextToFollow value'),
	query('ag')
		.exists()
		.withMessage('AG is required')
		.isBoolean()
		.withMessage('Invalid AG value'),
];

exports.dateToArabicWordsSchema = [
	query('date')
		.exists()
		.withMessage('Date is required')
		.isDate({ format: 'YYYY-MM-DD', strictMode: true })
		.withMessage('Invalid date'),
];

exports.forgotPasswordSchema = [
	body('email')
		.exists()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Invalid email')
		.normalizeEmail(),
];

exports.resetPasswordSchema = [
	body('token')
		.exists()
		.withMessage('Token is required'),
	body('newPassword')
		.exists()
		.withMessage('newPassword is required')
		.notEmpty()
		.isLength({ min: 6 })
		.withMessage('Newpassword must contain at least 6 characters')
		.isLength({ max: 10 })
		.withMessage('newPassword can contain max 10 characters'),
];
