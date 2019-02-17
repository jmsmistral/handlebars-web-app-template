
const passport = require('passport');

module.exports = function passportConfig(app) {
  // Set-up passport middleware on our app
  app.use(passport.initialize());
  app.use(passport.session());

  // Stores user in session
  passport.serializeUser();

  // Retrieves user from session
  passport.deserializeUser();
};
