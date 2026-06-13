const passport = require("passport");

class GoogleAuthMiddleware {
	redirectToGoogle() {
		return passport.authenticate("google", { scope: ["profile", "email"] });
	}
	handleGoogleCallback() {
		return passport.authenticate("google", {
			session: false,
		});
	}
}

module.exports = new GoogleAuthMiddleware();
