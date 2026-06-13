const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const env = require("./env");
const UserModel = require("../models/user.model");
const ROLES = require("../constants/model.constant");

class PassportConfig {
  static initialize() {
    passport.use(
      new GoogleStrategy(
        {
          clientID: env.GOOGLE_CLIENT_ID,
          clientSecret: env.GOOGLE_CLIENT_SECRET,
          callbackURL: env.GOOGLE_CALLBACK_URL,
          passReqToCallback: true,
        },
        async function (req, accessToken, refreshToken, profile, done) {
          try {
            const email = profile.emails[0].value;

            let user = await UserModel.findOne({ email });

            if (!user) {
              user = await UserModel.create({
                name: profile.displayName,
                email: email,
                role: ROLES.USER,
                isDeleted: false,
              });
            }

            return done(null, user);
          } catch (error) {
            return done(error, null);
          }
        }
      )
    );

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
  }
}

module.exports = PassportConfig;