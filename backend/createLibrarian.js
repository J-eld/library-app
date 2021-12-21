const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.i9owt.mongodb.net/renti?retryWrites=true&w=majority"
);

const librarianSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

const Librarian = mongoose.model("librarian", librarianSchema);

const password = bcrypt.hashSync("pass", 10);

const myLibrarian = new Librarian({
  firstname: "The",
  lastname: "Librarian",
  email: "librarian@gmail.com",
  password: password,
});

async function insertLibrarian() {
  await Librarian.insertMany(myLibrarian);
  mongoose.connection.close();
}

insertLibrarian();
