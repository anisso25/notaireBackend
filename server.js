const express = require('express');
const cors = require('cors');
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const userRouter = require('./routes/user.route');
const toolkitRouter = require('./routes/toolkit.route');
const documentRouter = require('./routes/document.route');
const employeeRouter = require('./routes/employee.route');
const officeRouter = require('./routes/office.route');
const categoryRouter = require('./routes/category.route');
const templateRouter = require('./routes/template.route');
const entityRouter = require('./routes/entity.route');
const instanceRouter = require('./routes/instance.route');
const attachedFileRouter = require('./routes/attachedFile.route');

// Init express
const app = express();
// Init environment
require('dotenv').config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options('*', cors());

app.use((r, res, next) => {
	let route = r.originalUrl,
		timestamp = Date.now(),
		dbg = ` > [ ${timestamp} ], [ ${r.method} ], ${route}, ${r.ip}\n`;

	if (process.env.NODE_ENV != 'production')
		dbg += `   --| [ ${timestamp} ], Headers: ${JSON.stringify(
			r.headers
		)}\n   --| [ ${timestamp} ], Body: ${JSON.stringify(r.body) || 'null'}\n`;

	console.log(dbg);
	next();
});

const port = Number(process.env.NODE_DOCKER_PORT || 3331);

app.use(express.static('public'));

app.use(`/users`, userRouter);
app.use(`/toolkit`, toolkitRouter);
app.use(`/documents`, documentRouter);
app.use(`/employees`, employeeRouter);
app.use(`/offices`, officeRouter);
app.use(`/categories`, categoryRouter);
app.use(`/templates`, templateRouter);
app.use(`/entities`, entityRouter);
app.use(`/instances`, instanceRouter);
app.use(`/attached_files`, attachedFileRouter);

app.get('/', (req, res, next) => {
	res.send({
		success: true,
		message: 'Hello world!',
	});
});

// 404 error
app.all('*', (req, res, next) => {
	const err = new HttpException(404, 'Endpoint Not Found');
	next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
	console.log(`🚀 Server running on port ${process.env.HOST}:${port}`)
);

process.removeAllListeners('uncaughtException');
process.on('uncaughtException', (err) => {
	console.log('Uncaught error:', err.message, 'stack:', err.stack);
});
process.removeAllListeners('unhandledRejection');
process.on('unhandledRejection', (reason) => {
	console.log(
		'Unhandled promise rejection:',
		reason.message,
		'stack:',
		reason.stack
	);
});

module.exports = app;
