const ApiError = require("../utils/ApiError");

class UnAuthorizedHandler {
    static handle(req, res, next) {
        next(new ApiError(401, "Unauthorized"));
    }
}


module.exports = UnAuthorizedHandler;