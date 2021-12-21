const express = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/books");
const authorRoutes = require("./routes/authors");
const librarianRoutes = require("./routes/librarians");
const bookwormRoutes = require("./routes/bookworms");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const session = require("express-session");
const { Librarians } = require("./models/librarians");
const { Bookworms } = require("./models/bookworms");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

// initialise express instance
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "secretCode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretCode"));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/librarians", librarianRoutes);
app.use("/bookworms", bookwormRoutes);

app.get("/isLoggedIn", (req, res) => {
  req.isAuthenticated()
    ? res.send({ status: 200, message: "User is logged in", data: req.user })
    : res.redirect(process.env.FRONTEND_URL + "/login");
});

app.listen(4000);
