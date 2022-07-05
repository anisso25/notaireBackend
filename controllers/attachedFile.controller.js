const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const pathModule = require('path');
const fs = require('fs');
const {
	directories: ResourceDirectories,
	urls: ResourceUrls,
} = require('../utils/tool.utils');
const { AttachedFile: AttachedFileModel } = require('../models');

/******************************************************************************
 *                              Instance File Controller
 ******************************************************************************/
class AttachedFileController {
	getAttachedFile = async (req, res, next) => {
		this.checkValidation(req);

		const filePath = pathModule.resolve(
			ResourceDirectories.attached_file,
			req.currentUser.OfficeId,
			req.query.filename
		);

		return res.status(200).sendFile(filePath, {}, function (err) {
			if (err)
				return res
					.status(404)
					.send({ success: false, message: 'File not found!' });
		});
	};

	deleteAttachedFile = async (req, res, next) => {
		this.checkValidation(req);

		const filePath = pathModule.resolve(
			ResourceDirectories.attached_file,
			req.currentUser.OfficeId,
			req.query.filename
		);

		fs.unlink(filePath, async (err) => {
			if (err)
				return res
					.status(404)
					.send({ success: false, message: 'File not found!' });
			else {
				await AttachedFileModel.destroy({
					where: {
						filename: req.query.filename,
					},
				}).catch((e) => next(e));
				return res
					.status(200)
					.send({ success: true, message: 'File has been deleted.' });
			}
		});
	};

	addAttachedFile = async (req, res, next) => {
		this.checkValidation(req);

		const filename =
			Date.now() + '-' + req.currentUser.OfficeId + '-' + req.file.originalname;

		const dirPath = pathModule.resolve(
				ResourceDirectories.attached_file,
				req.currentUser.OfficeId
			),
			filePath = pathModule.join(dirPath, filename);

		if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
		fs.writeFileSync(filePath, req.file.buffer);

		const attachedFile = await AttachedFileModel.create({
			InstanceId: req.body.InstanceId ? req.body.InstanceId : null,
			InstanceRelationshipId: req.body.InstanceRelationshipId
				? req.body.InstanceRelationshipId
				: null,
			DocumentId: req.body.DocumentId ? req.body.DocumentId : null,
			title: req.body.title,
			filename: filename,
		}).catch((e) => next(e));

		return res.status(200).send({
			success: true,
			file: this.formatAttachedFileObject(attachedFile),
		});
	};

	updateAttachedFile = async (req, res, next) => {
		this.checkValidation(req);

		const attachedFile = await AttachedFileModel.findByPk(req.query.filename);

		const filePath = pathModule.resolve(
			ResourceDirectories.attached_file,
			req.currentUser.OfficeId,
			req.query.filename
		);

		// To confirm that the file belongs to the current user office,
		// it must be found in the folder
		if (!attachedFile || !fs.existsSync(filePath))
			return res
				.status(404)
				.send({ success: false, message: 'File not found!' });

		attachedFile.title = req.body.title;

		await attachedFile.save();

		return res.status(200).send({
			success: true,
			file: this.formatAttachedFileObject(attachedFile),
		});
	};

	checkValidation = (req) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw new HttpException(400, 'Validation faild', errors);
		}
	};

	formatAttachedFileObject = (attachedFile) => {
		return {
			title: attachedFile.title,
			filename: attachedFile.filename,
			url: `${ResourceUrls.attached_file}?filename=${attachedFile.filename}`,
		};
	};
}

module.exports = new AttachedFileController();
