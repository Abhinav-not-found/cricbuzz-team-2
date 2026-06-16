const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
	return await bcrypt.hash(password, 10);
};

const comparePassword = async (password1, password2) => {
	return await bcrypt.compare(password1, password2);
};

module.exports = { hashPassword, comparePassword };
