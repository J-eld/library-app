const express = require("express");
const cors = require("cors");

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(4000);
