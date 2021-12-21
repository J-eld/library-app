const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.i9owt.mongodb.net/renti?retryWrites=true&w=majority"
);

module.exports = mongoose;
