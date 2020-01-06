var db = require("./db");
//var Promises = require("es6-promises");

exports.getAllAuthors = function() {
  return new Promises(function(resolve, reject) {
    db.query("select * from author", function(err, result) {
      return err ? reject(err) : resolve(result);
    });
  });
};
