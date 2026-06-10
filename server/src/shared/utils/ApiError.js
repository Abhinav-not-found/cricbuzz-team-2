class ApiError extends Error {
	constructor(statusCode, message) {
		super(statusCode);
		this.statusCode = statusCode;
		this.message = message;
	}
}
module.exports = ApiError;
