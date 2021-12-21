const express = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/books");
const authorRoutes = require("./routes/authors");
const librarianRoutes = require("./routes/librarians");
const bookwormRoutes = require("./routes/bookworms");

// initialise express instance
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/librarians", librarianRoutes);
app.use("/bookworms", bookwormRoutes);

app.listen(4000);
