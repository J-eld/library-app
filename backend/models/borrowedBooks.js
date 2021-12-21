const mongoose = require("../utils/mongoose");
const { bookSchema } = require("./books");
const { bookwormSchema } = require("./bookworms");

const borrwedBooksSchema = new mongoose.Schema({
  book_details: bookSchema,
  borrowed_by: bookwormSchema,
});

const BorrowedBooks = mongoose.model("borrowedBooks", borrwedBooksSchema);

module.exports = { BorrowedBooks, borrwedBooksSchema };
