const { Bookworms } = require("../models/bookworms");
const { Librarians } = require("../models/librarians");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

passport.use(
  new localStrategy(async (email, password, role, done) => {
    if (role === "librarian") {
      Librarians.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        return isPasswordCorrect ? done(null, user) : done(null, false);
      });
    } else if (role === "bookworm") {
      Bookworms.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        return isPasswordCorrect ? done(null, user) : done(null, false);
      });
    } else {
      return done(null, false);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, { id: user.id, role: user.role });
});

passport.deserializeUser((id, done) => {
  if (role === "librarian") {
    Librarians.findOne({ _id: id }, (err, user) => {
      const userInfo = {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      };
      done(err, userInfo);
    });
  } else if (role === "bookworm") {
    Bookworms.findOne({ _id: id }, (err, user) => {
      const userInfo = {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      };
      done(err, userInfo);
    });
  } else {
    done(null, false);
  }
});

module.exports = passport;
