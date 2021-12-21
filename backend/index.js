const express = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/books");
const authorRoutes = require("./routes/authors");

// initialise express instance
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);

app.listen(4000);
