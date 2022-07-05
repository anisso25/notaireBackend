const path = require('path');
module.exports = {
	directories: {
		category_icon: 'public/images/category_icons',
		attached_file: 'resources/attached_files',
		email_template: 'resources/email_templates',
	},
	urls: {
		category_icon: `${process.env.HOST}/images/category_icons`,
		attached_file: `${process.env.HOST}/attached_files`,
		front_forgot_password: `${process.env.HOST_FRONT}/reset-password`,
	},
};
