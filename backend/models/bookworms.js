const mongoose = require("../utils/mongoose");

const bookwormSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

const Bookworms = mongoose.model("bookworms", bookwormSchema);

module.exports = { Bookworms, bookwormSchema };
