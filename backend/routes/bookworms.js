const express = require("express");
const { Bookworms } = require("../models/bookworms");
const { BorrowedBooks } = require("../models/borrowedBooks");
const { Books } = require("../models/books");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/getBookworms", (req, res) => {
  Bookworms.find({}, (err, result) => {
    if (err)
      return res.send({
        status: 500,
        message: "An error occurred when attempting to get a list of bookworms",
      });

    if (!result.length)
      return res.send({
        status: 404,
        message: "There are currently no bookworms",
      });

    res.send({
      status: 200,
      message: "Successfully retrieved list of bookworms",
      data: result,
    });
  });
});

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

router.post("/borrowBook", async (req, res) => {
  const book_id = req.body.book_id;
  const bookworm_id = req.body.bookworm_id;

  if (!book_id || !bookworm_id)
    return res.send({
      status: 400,
      message:
        "Please provide both book_id and bookworm_id in the request body",
    });

  try {
    const book = await Books.findOne({ id: book_id });
    const bookworm = await Bookworms.findOne({ id: bookworm_id });

    const borrowedBook = new BorrowedBooks({
      book_details: book,
      borrowed_by: bookworm,
    });

    await borrowedBook.save();

    res.send({
      status: 201,
      message: `${bookworm.firstname} ${bookworm.lastname} is now borrowing ${book.title}`,
    });
  } catch (err) {
    return res.send({
      status: 500,
      message: "An error occurred when attempting to borrow a book",
    });
  }
});

router.post("/register", async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  if (!firstname || !lastname || !email || !hashedPassword)
    return res.send({
      status: 400,
      message:
        "Please provide all the necessary information in the request body",
    });

  Bookworms.findOne({ email: email }, (err, result) => {
    if (err)
      return res.send({
        status: 500,
        message: "An error occurred when attempting to create a bookworm",
      });

    if (result)
      return res.send({
        status: 400,
        message: "A user with this email already exists",
      });
  });

  const newUser = new Bookworms({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hashedPassword,
  });

  try {
    await newUser.save();

    res.send({ status: 201, message: "A new bookworm was created" });
  } catch (err) {
    res.send({
      status: 500,
      message: "An error occurred when attempting to create a new bookworm",
    });
  }
});

module.exports = router;
