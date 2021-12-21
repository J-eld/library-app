const mongoose = require("../utils/mongoose");

const bookSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: String,
  author_id: Number,
  author_bio: String,
  authors: String,
  title_slug: String,
  author_slug: String,
  isbn13: Number,
  isbn10: Number,
  price: String,
  format: String,
  publisher: String,
  pubdate: String,
  edition: String,
  subjects: String,
  lexile: String,
  pages: Number,
  dimensions: String,
  overview: String,
  excerpt: String,
  synopsis: String,
  toc: String,
  editorial_reviews: String,
});

const Books = mongoose.model("books", bookSchema);

module.exports = { Books, bookSchema };
