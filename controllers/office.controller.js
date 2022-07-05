const { Office: OfficeModel, User: UserModel } = require('../models');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const { roles: UserRoles } = require('../utils/userValues.utils');
const bcrypt = require('bcryptjs');

/******************************************************************************
 *                              Office Controller
 ******************************************************************************/
class OfficeController {
	getOfficeInfos = async (req, res, next) => {
		return res.status(200).send({
			success: true,
			office: this.formatOfficeObject(req.currentUser.Office),
		});
	};

	updateOffice = async (req, res, next) => {
		this.checkValidation(req);

		let office = req.currentUser.Office;

		Object.assign(office, req.body);
		await office.save();

		return res.status(200).send({
			success: true,
			message: 'Office updated successfully.',
			office: this.formatOfficeObject(office),
		});
	};

	createOffice = async (req, res, next) => {
		this.checkValidation(req);

		let body = req.body;

		const office = await OfficeModel.create(
			{
				name: body.name,
				address: body.address,
				Users: [
					{
						...body.admin,
						type: UserRoles.Admin,
						password: await bcrypt.hash(body.admin.password, 8),
					},
				],
			},
			{ include: [UserModel] }
		).catch((e) => next(e));

		if (!office) throw new HttpException(500, 'Something went wrong!');

		return res.send({
			success: true,
			message: 'Office was created.',
			office: this.formatOfficeObject(office),
		});
	};

	checkValidation = (req) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw new HttpException(400, 'Validation faild', errors);
		}
	};

	formatOfficeObject = (office) => {
		return {
			id: office.id,
			name: office.name,
			address: office.address,
			reference: office.reference,
		};
	};
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new OfficeController();
