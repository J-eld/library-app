const mongoose = require("../utils/mongoose");

const librarianSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

const Librarians = mongoose.model("librarians", librarianSchema);

module.exports = { Librarians, librarianSchema };
