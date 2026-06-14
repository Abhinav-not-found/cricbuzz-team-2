class ErrorHandlerMiddleware {
	static handle(err, _, res, __) {
		console.log(err);
		return res.status(err.statusCode || 500).json({
			message: err.message || "internal server error",
			success: false,
		});
	}
}

module.exports = ErrorHandlerMiddleware;
