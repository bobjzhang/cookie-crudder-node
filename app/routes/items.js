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

exports.addItem = function(req, res) {
  var item = new Item({
    name: req.body.name,
    description: req.body.description,
    ownerId: req.params.userId,
  });

  item.save((err) => {
    User.findById(this.ownerId, (err, user) => {
      if (err) {
        return res.send(err);
      } else {
        user.items.push(this._id);
        user.save();
      }
    });
    return err ? res.send(err) : res.json(item);
  });
}

exports.updateById = function(req, res) {
  Item.findByIdAndUpdate(req.params.id, req.body, (err, item) => {
    return err ? res.send(err) : res.json(item);
  });
}

exports.deleteById = function(req, res) {
  Item.findByIdAndRemove(req.params.id, req.body, (err, item) => {
    User.findById(item.ownerId, (err, user) => {
      if (err || !user) {
        return res.send(err);
      } else {
        var items = user.items;
        var index = items.indexOf(item._id);
        if (index > -1) {
          items.splice(index, 1);
          user.save();
        }
        return res.json(item);
      }
    });
  });
}
