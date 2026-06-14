const { StatusCodes } = require("http-status-codes");
const ApiResponse = (res, statusCode, message, data) => {
	res.status(statusCode || StatusCodes.OK).json({
		message: message,
		data: data,
		success: true,
	});
};

module.exports = ApiResponse;
