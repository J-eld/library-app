const mongoose = require("../utils/mongoose");

const bookwormSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

const Bookworm = mongoose.model("bookworms", bookwormSchema);

module.exports = { Bookworm, bookwormSchema };
