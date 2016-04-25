var Item     = require('../models/item');
var User     = require('../models/user');

exports.findAll = function(req, res) {
  Item.find((err, items) => {
    return err ? res.send(err) : res.json(items);
  });
};

exports.findById = function(req, res) {
  Item.findById(req.params.id, (err, item) => {
    return err ? res.send(err) : res.json(item);
  });
};

exports.search = function(req, res) {
  if (req.query.name) {
    var partialNameRegex = new RegExp('[a-zA-Z0-9\\s]*' + req.query.name + '[a-zA-Z0-9\\s]*', 'i');
    Item.find({name: partialNameRegex}, (err, items) => {
      return err ? res.send(err) : res.json(items);
    });
  } else if (req.query.description) {
    var partialDescriptionRegex = new RegExp('[a-zA-Z0-9\\s]*' + req.query.description + '[a-zA-Z0-9\\s]*', 'i');
    Item.find({description: partialDescriptionRegex}, (err, items) => {
      return err ? res.send(err) : res.json(items);
    });
  } else {
    return res.status(400).send('Bad request, please check query.');
  }
};
