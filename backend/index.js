const express = require("express");
const cors = require("cors");

// initialise express instance
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(4000);
