const express = require("express");
const { Books } = require("../models/books");
const { BorrowedBooks } = require("../models/borrowedBooks");
const router = express.Router();

router.get("/getBooks", (req, res) => {
  Books.find({}, (err, result) => {
    if (err)
      return res.send({
        status: 500,
        message: "An error occurred when attempting to get the list of books",
      });

    if (!result.length)
      return res.send({
        status: 404,
        message: "There are currently no books",
      });

    res.send({
      status: 200,
      message: "Sucessfully fetched list of books",
      data: result,
    });
  });
});

router.get("/getBooks/:query", (req, res) => {
  const query = req.params.query;

  Books.find({ title: new RegExp(query, "i") }, (err, result) => {
    if (err)
      return res.send({
        status: 500,
        message: "An error occurred when attempting to get the list of books",
      });

    if (!result.length)
      return res.send({
        status: 404,
        message: "No books match the query provided",
      });

    res.send({
      status: 200,
      message: "Sucessfully fetched list of books",
      data: result,
    });
  });
});

router.get("/getBookDetails/:book_id", (req, res) => {
  const book_id = req.params.book_id;

  Books.findOne({ id: book_id }, (err, result) => {
    if (err)
      return res.send({
        status: 500,
        message: "An error occurred when attempting to fetch the book details",
      });

    if (!result) {
      return res.send({
        status: 404,
        message: "The book does not exist",
      });
    }

    res.send({
      status: 200,
      message: "Successfully fetched book details",
      data: result,
    });
  });
});

router.get("/borrowedBooks", (req, res) => {
  BorrowedBooks.find({}, (err, result) => {
    if (err)
      return res.send({
        status: 500,
        message:
          "An error occurred when attempting to get the list of borrowed books",
      });

    if (!result.length) {
      return res.send({
        status: 404,
        message: "No books are currently being borrowed",
      });
    }

    res.send({
      status: 200,
      message: "Successfully retrieved list of borrowed books",
      data: result,
    });
  });
});

module.exports = router;
