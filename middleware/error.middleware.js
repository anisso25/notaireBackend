function errorMiddleware(error, req, res, next) {
	let { status = 500, message, data, stack } = error;

	// If status code is 500 - change the message to Intrnal server error
	message = status === 500 ? 'Internal server error' : message;

	error = {
		success: false,
		message,
		...(data && data),
	};

	if (status === 500) {
		console.log(`[Error] ${stack}`);
		if (process.env.NODE_ENV != 'production') error.stack = stack;
	}

	return res.status(status).send(error);
}

module.exports = errorMiddleware;
/*
{
  success: false,
  message: 'Not Found'
  data: {...} // optional
}
*/
