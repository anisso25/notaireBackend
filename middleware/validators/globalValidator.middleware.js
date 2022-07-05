const { param } = require('express-validator');

exports.idSchema = [param('id').isInt().withMessage('Invalid ID')];
