const mongoose = require("../utils/mongoose");

const authorSchema = new mongoose.Schema({
  id: Number,
  title: String,
  slug: String,
  biography: String,
});

const Authors = mongoose.model("authors", authorSchema);

module.exports = { Authors, authorSchema };
