const express = require("express");
const { Authors } = require("../models/authors");
const router = express.Router();

router.get("/getAuthors", (req, res) => {
  Authors.find({}, (err, result) => {
    if (err)
      return res.send({
        status: 500,
        message:
          "An error occurred when attempting to retrieve the list of authors",
      });

    res.send({
      status: 200,
      message: "successfully retreived the list of authors",
      data: result,
    });
  });
});

router.get("/getAuthors/:query", (req, res) => {
  const query = req.params.query;

  Authors.find({ title: new RegExp(query, "i") }, (err, result) => {
    if (err)
      return res.send({
        status: 500,
        message: "An error occurred when attempting to get the list of authors",
      });

    if (!result.length)
      return res.send({
        status: 404,
        message: "No authors match the query",
      });

    res.send({
      status: 200,
      message: "Sucessfully fetched list of authors",
      data: result,
    });
  });
});

router.get("/getAuthorDetails/:author_id", (req, res) => {
  const author_id = req.params.author_id;

  Authors.findOne({ id: author_id }, (err, result) => {
    if (err)
      return res.send({
        status: 500,
        message:
          "An error occurred when attempting to retrieve the authors details",
      });

    if (!result)
      return res.send({ status: 404, message: "The author does not exist" });

    res.send({
      status: 200,
      message: "successfully retrieved the author details",
      data: result,
    });
  });
});

module.exports = router;
