const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const { User: UserModel } = require('../models');
const { Op } = require('sequelize');

/******************************************************************************
 *                              Employee Controller
 ******************************************************************************/
class EmployeeController {
	createEmployee = async (req, res, next) => {
		this.checkValidation(req);

		await this.hashPassword(req);

		req.body.OfficeId = req.currentUser.OfficeId;

		const employee = await UserModel.create(req.body).catch((e) => next(e));

		if (!employee) throw new HttpException(500, 'Something went wrong!');

		return res.send({
			success: true,
			message: 'Employee was created!',
			employee: this.formatEmployeeObject(employee),
		});
	};

	getAllEmployee = async (req, res, next) => {
		let { orderBy, orderDir, page, perPage, search } = req.query;

		orderBy =
			orderBy && ['createdAt', 'name'].includes(orderBy)
				? orderBy
				: 'createdAt';
		orderDir =
			orderDir && ['desc', 'asc'].includes(orderDir.toLowerCase())
				? orderDir
				: 'desc';
		perPage =
			perPage != undefined && perPage != '' && !isNaN(perPage)
				? parseInt(perPage)
				: 10;
		page = page != undefined && page != '' && !isNaN(page) ? parseInt(page) : 1;

		let where = { OfficeId: req.currentUser.OfficeId };
		if (search) {
			where['name'] = { [Op.like]: `%${search.trim()}%` };
		}

		let employees = await UserModel.findAndCountAll({
				where,
				order: [[orderBy, orderDir]],
				offset: (page - 1) * perPage,
				limit: perPage,
				distinct: true,
			}).catch((e) => next(e)),
			count = employees.count;

		return res.status(200).send({
			success: true,
			employees: {
				totalRows: count,
				totalPages: Math.ceil(count / perPage),
				currentPage: page,
				rows: employees.rows.map((employee) => {
					return this.formatEmployeeObject(employee);
				}),
			},
		});
	};

	getEmployeeById = async (req, res, next) => {
		this.checkValidation(req);

		const employee = await UserModel.findOne({
			where: {
				id: req.params.id,
				OfficeId: req.currentUser.OfficeId,
			},
		}).catch((e) => next(e));

		if (!employee)
			return res
				.status(404)
				.send({ success: false, message: 'Employee not found!' });

		return res
			.status(200)
			.send({ success: true, employee: this.formatEmployeeObject(employee) });
	};

	updateEmployee = async (req, res, next) => {
		this.checkValidation(req);

		let employee = await UserModel.findOne({
			where: {
				id: req.params.id,
				OfficeId: req.currentUser.OfficeId,
			},
		});

		if (!employee)
			return res.status(404).send({
				success: false,
				message: 'Employee not found!',
			});

		await this.hashPassword(req);

		Object.assign(employee, req.body);
		await employee.save();

		return res.status(200).send({
			success: true,
			message: 'Employee updated successfully.',
			employee: this.formatEmployeeObject(employee),
		});
	};

	deleteEmployee = async (req, res, next) => {
		this.checkValidation(req);

		if (req.params.id == req.currentUser.id)
			return res
				.status(404)
				.send({ success: false, message: "Can't delete your admin records" });
		const result = await UserModel.destroy({
			where: {
				id: req.params.id,
				OfficeId: req.currentUser.OfficeId,
			},
		}).catch((e) => next(e));

		if (!result)
			return res
				.status(404)
				.send({ success: false, message: 'Employee not found!' });

		return res
			.status(200)
			.send({ success: true, message: 'Employee has been deleted.' });
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

	formatEmployeeObject = (employee) => {
		return {
			id: employee.id,
			type: employee.type,
			email: employee.email,
			name: employee.name,
		};
	};
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new EmployeeController();
