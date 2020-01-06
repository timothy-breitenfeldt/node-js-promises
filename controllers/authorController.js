var routes = require("express").Router();
var db = require("../dao/db");
var authorDao = require("../dao/authorDao");

routes.get("/author", function(req, res) {
  authorDao
    .getAllAuthors()
    .then(function(result) {
      res.setHeader("Content-Type", "application/json");
      res.send(result);
    })
    .catch(function(err) {
      throw err;
    });
});

module.exports = routes;
