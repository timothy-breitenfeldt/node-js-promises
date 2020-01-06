var db = require("./db");
var Promises = require("es6-promises");

exports.getAllBooks = function() {
  return new Promises(function(resolve, reject) {
    db.query("select * from book", function(err, result) {
      return err ? reject(err) : resolve(result);
    });
  });
};

exports.addBook = function(book) {
  return new Promises(function(resolve, reject) {
    db.beginTransaction(function(err) {
      if (err) return reject(err);

      db.query(
        "insert into book(title, authorId) values(?,?)",
        [book.title, book.authorId],
        function(err, result) {
          if (err) {
            db.rollback(function(err, res) {
              return reject(err);
            });
            return reject(err);
          }

          db.commit(function(err, result) {
            return err ? reject(err) : resolve(result);
          });
        }
      );
    });
  });
};

exports.removeBook = function(bookId) {
  return new Promises(function(resolve, reject) {
    db.beginTransaction(function(err) {
      if (err) return reject(err);

      db.query("delete from book where bookId = ?", [bookId], function(
        err,
        result
      ) {
        if (err) {
          db.rollback(function(err, res) {
            return reject(err);
          });
          return reject(err);
        }

        db.commit(function(err, result) {
          return err ? reject(err) : resolve(result);
        });
      });
    });
  });
};
