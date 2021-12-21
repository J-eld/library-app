const { Bookworms } = require("../models/bookworms");
const { Librarians } = require("../models/librarians");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;
const passport = require("passport");

passport.use(
  new localStrategy(async (email, password, done) => {
    try {
      const librarian = await Librarians.findOne({ email: email });
      const bookworm = await Bookworms.findOne({ email: email });

      if (!librarian && !bookworm) return done(null, false);

      librarian ? librarian.role === "librarian" : bookworm.role === "bookworm";

      const isPasswordCorrect = librarian
        ? bcrypt.compareSync(password, librarian.password)
        : bcrypt.compareSync(password, bookworm.password);

      if (!isPasswordCorrect) return done(null, false);

      return librarian ? done(null, librarian) : done(null, bookworm);
    } catch (err) {
      if (err) throw err;
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, { id: user.id, role: user.role });
});

passport.deserializeUser(async (user, done) => {
  const librarian = await Librarians.findOne({ _id: user.id });
  const bookworm = await Bookworms.findOne({ _id: user.id });

  if (!librarian && !bookworm) return done(null, false);
  const userInfo = {
    id: librarian.id || bookworm.id,
    email: librarian.email || bookworm.email,
    firstname: librarian.firstname || bookworm.firstname,
    lastname: librarian.lastname || bookworm.lastname,
  };

  if (librarian) {
    userInfo.role = "librarian";
    done(null, userInfo);
  } else {
    userInfo.role = "bookworm";
    done(null, userInfo);
  }
});

module.exports = passport;
