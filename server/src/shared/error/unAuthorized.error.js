const ApiError = require("../utils/ApiError");

const handleUnAuthorized = (message = "Unauthorized") => {
    return new ApiError(401, message);
};

module.exports = handleUnAuthorized;