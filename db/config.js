require('dotenv').config();

let config = {
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_DOCKER_PORT,
	database: process.env.MYSQL_DATABASE,
	username: process.env.DB_USER,
	password: process.env.MYSQL_ROOT_PASSWORD,
	dialect: 'mysql',
	dialectOptions: {
		bigNumberStrings: true,
	},
};

if (true || process.env.NODE_ENV == 'production') config.logging = false;

module.exports = config;
