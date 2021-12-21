const express = require("express");
const { BorrowedBooks } = require("../models/borrowedBooks");
const { Librarians } = require("../models/librarians");
const router = express.Router();
const passport = require("../config/passport.config.js");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err)
      res.send({
        status: 500,
        message: "An error occurred when attempting to log in",
      });
    if (!user) res.send({ status: 404, message: "User does not exist" });
    else {
      req.login(user, (err) => {
        if (err) throw err;
        res.redirect("/isLoggedIn");
      });
    }
  })(req, res, next);
});

router.delete("/removeBookFromList/:book_id", (req, res) => {
  const book_id = req.params.book_id;

  BorrowedBooks.deleteOne({ id: book_id }, (err, result) => {
    if (err)
      return res.send({
        status: 500,
        message:
          "An error occurred when attempting to remove the book from the borrowed book list",
      });

    if (!result.deletedCount)
      return res.send({ status: 404, message: "The book was not found" });

    res.send({
      status: 200,
      message: "The book was successfully removed from the borrowed list",
    });
  });
});

module.exports = router;
