const HttpException = require('../utils/HttpException.utils');
const { User: UserModel, Office: OfficeModel } = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = (...roles) => {
	return async function (req, res, next) {
		try {
			const authHeader = req.headers.authorization;
			const bearer = 'Bearer ';

			if (!authHeader || !authHeader.startsWith(bearer)) {
				throw new HttpException(401, 'Access denied. No credentials sent!');
			}

			const token = authHeader.replace(bearer, '');
			const secretKey = process.env.SECRET_JWT || '';

			// Verify Token
			let decoded;
			try {
				decoded = jwt.verify(token, secretKey);
			} catch (error) {
				throw new HttpException(401, 'Expired token, try to login again!');
			}
			const user = await UserModel.findByPk(decoded.userId, {
				include: [{ model: OfficeModel, required: true }],
				//raw: true,
				//nest: true,
			}).catch((e) => next(e));

			if (!user) {
				throw new HttpException(401, 'Authentication failed!');
			}

			// check if the current user is the owner user
			//const ownerAuthorized = req.params.id == user.id;

			// if the current user is not the owner and
			// if the user role don't have the permission to do this action.
			// the user will get this error

			if (roles.length && !roles.includes(user.type)) {
				throw new HttpException(401, 'Unauthorized action');
			}

			// if the user has permissions
			req.currentUser = user;
			next();
		} catch (e) {
			e.status = 401;
			next(e);
		}
	};
};

module.exports = auth;
