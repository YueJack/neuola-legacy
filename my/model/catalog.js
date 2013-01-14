
/*
 * The catalog model
 */

var mongodb = require('../db');

function Catalog(catalog) {
  if (catalog == null) return; 
  this.id = catalog.id;
  this.name = catalog.name;
  this.parrent = catalog.parent;
  this.description = catalog.description;
}

module.exports = Catalog;

Catalog.list = function list(options, callback) {
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }

    db.collection('catalogs', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }

      collection.find(options).toArray(function(err, docs) {
        mongodb.close();
        if (err) {
          callback(err, null);
        } else {
          var catalogs = [];
          docs.forEach(function(doc, index) {
            catalogs.push(new Catalog(doc));
          });
          callback(err, catalogs);
        }
      });
    });
  });
};

Catalog.get = function get(id, callback) {
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }

    db.collection('catalogs', function(err, collection) {
      if (err) {
        mongodb.close()
        return callback(err);
      }

      collection.findOne({id: id}, function(err, doc) {
        mongodb.close();
        if (err) {
          callback(err, null);
        } else {
          callback(err, new Catalog(doc));
        }
      });
    });
  });
};
