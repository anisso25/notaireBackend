const {
	Wilaya: WilayaModel,
	Country: CountryModel,
	Category: CategoryModel,
	User: UserModel,
	PasswordReset: PasswordResetModel,
} = require('../models');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const { nArabicWords } = require('../libs/nArabicWords');
const {
	dArabicDates,
	sendMail,
	encrypt,
	decrypt,
	generateChars,
} = require('../libs');
const bcrypt = require('bcryptjs');
const { formatCategoryObject } = require('./category.controller');

/******************************************************************************
 *                              Template Controller
 ******************************************************************************/
class ToolkitController {
	getGeneralData = async (req, res, next) => {
		const countries = await CountryModel.findAll()
			.then((countries) => {
				return countries.map((country) => {
					return {
						id: country.id,
						name: country.name,
						nationality: country.nationality,
					};
				});
			})
			.catch((e) => next(e));

		const wilayas = await WilayaModel.findAll()
			.then((wilayas) => {
				return wilayas.map((wilaya) => {
					return {
						id: wilaya.id,
						name: wilaya.name,
					};
				});
			})
			.catch((e) => next(e));

		const categories = await CategoryModel.findAll()
			.then((categories) => {
				return categories.map((category) => formatCategoryObject(category));
			})
			.catch((e) => next(e));

		return res.status(200).send({
			success: true,
			categories,
			countries,
			wilayas,
		});
	};

	numberToArabicWords = async (req, res, next) => {
		this.checkValidation(req);

		let { number, textToFollow, ag } = req.query;

		return res.status(200).send({
			success: true,
			result: nArabicWords(number, {
				TextToFollow: ['true', '1'].indexOf(textToFollow) >= 0 ? 'on' : 'off',
				AG: ['true', '1'].indexOf(ag) >= 0 ? 'on' : 'off',
			}),
		});
	};

	dateToArabicWords = async (req, res, next) => {
		this.checkValidation(req);

		let { date } = req.query;

		return res.status(200).send({
			success: true,
			result: dArabicDates(date),
		});
	};

	forgotPassword = async (req, res, next) => {
		this.checkValidation(req);
		const { email } = req.body;

		let user = await UserModel.findOne({ where: { email } }).catch((e) =>
			next(e)
		);
		if (!user) throw new HttpException(401, 'Incorrect email!');

		const token = generateChars(20),
			payload = encrypt(JSON.stringify({ UserId: user.id, token }));
		await PasswordResetModel.create({ token, UserId: user.id });

		const path = require('path'),
			fs = require('fs'),
			{
				directories: ResourceDirectories,
				urls: ResourceUrls,
			} = require('../utils/tool.utils'),
			template = path.join(
				ResourceDirectories.email_template,
				'forgotPassword.template.html'
			),
			forgotPasswordTemplate = fs.readFileSync(template).toString();

		await sendMail({
			to: user.email,
			from: process.env.MAIL_FROM_ADDRESS,
			subject: 'Reset Password',
			html: forgotPasswordTemplate.replace(
				'%forgot_password_link%',
				`${ResourceUrls.front_forgot_password}?token=${payload}`
			),
		}).catch((e) => next(e));
		return res.status(200).send({ success: true, message: 'Email sended' });
	};

	resetPassword = async (req, res, next) => {
		this.checkValidation(req);
		const { token, newPassword } = req.body,
			payload = JSON.parse(decrypt(token)),
			checkPasswordReset = await PasswordResetModel.findOne({
				where: { UserId: payload.UserId, token: payload.token },
				include: [{ model: UserModel, required: true }],
			}).catch((e) => next(e));

		if (!checkPasswordReset) throw new HttpException(401, 'Incorrect token!');

		let user = checkPasswordReset.User;
		user.password = await bcrypt.hash(newPassword, 8);
		await user.save();
		await PasswordResetModel.destroy({
			where: { UserId: payload.UserId },
		}).catch((e) => next(e));

		return res
			.status(200)
			.send({ success: true, message: 'Password reset successfully' });
	};

	checkValidation = (req) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw new HttpException(400, 'Validation faild', errors);
		}
	};
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ToolkitController();
