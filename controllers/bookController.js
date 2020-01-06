var routes = require("express").Router();
var db = require("../dao/db");
var bookDao = require("../dao/bookDao");

routes.get("/book", function(req, res) {
  bookDao
    .getAllBooks()
    .then(function(result) {
      res.setHeader("Content-Type", "application/json");
      res.send(result);
    })
    .catch(function(err) {
      throw err;
    });
});

routes.post("/book", function(req, res) {
  var book = req.body;
  bookDao
    .addBook(book)
    .then(function(result) {
      res.status(201);
      res.send("Add Book Successful!");
    })
    .catch(function(err) {
      res.status(400);
      res.send("Add Book Failed!");
    });
});

routes.delete("/book/:id", function(req, res) {
  bookDao
    .removeBook(req.params.id)
    .then(function(result) {
      res.send("Delete Book Successful!");
    })
    .catch(function(err) {
      res.status(400);
      res.send("Delete Book Failed!");
    });
});

module.exports = routes;
