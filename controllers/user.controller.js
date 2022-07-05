const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const { User: UserModel, Office: OfficeModel } = require('../models');
const { formatOfficeObject } = require('./office.controller');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {
	getCurrentUser = async (req, res, next) => {
		return res.send({
			success: true,
			user: this.formatUserObject(req.currentUser),
		});
	};

	createUser = async (req, res, next) => {
		// Disabled, external people cannot register on the platform
		return res.send({
			success: false,
			message: 'Registration disabled!',
		});

		this.checkValidation(req);

		await this.hashPassword(req);

		let user = await UserModel.create(req.body).catch((e) => next(e));

		if (!user) throw new HttpException(500, 'Something went wrong!');

		let office = await OfficeModel.findByPk(user.OfficeId);
		user.Office = office;

		const secretKey = process.env.SECRET_JWT || '';
		const token = jwt.sign({ userId: user.id.toString() }, secretKey, {
			expiresIn: '7d',
		});

		return res.send({
			success: true,
			message: 'User was created!',
			user: { ...this.formatUserObject(user), token },
		});
	};

	userLogin = async (req, res, next) => {
		this.checkValidation(req);

		const { email, password: pass } = req.body;

		let user = await UserModel.findOne({
			where: { email },
			include: [{ model: OfficeModel, required: true }],
			//raw: true,
			//nest: true,
		}).catch((e) => next(e));

		if (!user) {
			throw new HttpException(401, 'Incorrect email!');
		}

		const isMatch = await bcrypt.compare(pass, user.password);

		if (!isMatch) {
			throw new HttpException(401, 'Incorrect password!');
		}

		// user matched!
		const secretKey = process.env.SECRET_JWT || '';
		const token = jwt.sign({ userId: user.id.toString() }, secretKey, {
			expiresIn: '7d',
		});

		return res.send({
			success: true,
			user: { ...this.formatUserObject(user), token },
		});
	};

	checkValidation = (req) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw new HttpException(400, 'Validation faild', errors);
		}
	};

	// hash password if it exists
	hashPassword = async (req) => {
		if (req.body.password) {
			req.body.password = await bcrypt.hash(req.body.password, 8);
		}
	};

	formatUserObject = (user) => {
		return {
			id: user.id,
			type: user.type,
			email: user.email,
			name: user.name,
			Office: formatOfficeObject(user.Office),
		};
	};
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController();
