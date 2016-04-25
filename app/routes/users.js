var User     = require('../models/user');
var Item     = require('../models/item');

exports.findAll = function(req, res) {
  User.find((err, users) => {
    return err ? res.send(err) : res.json(users);
  });
};

exports.findById = function(req, res) {
  User.findById(req.params.id, (err, user) => {
    return err ? res.send(err) : res.json(user);
  });
};

exports.findByUsername = function(req, res) {
  User.find({username: req.params.username}, (err, user) => {
    return err ? res.send(err) : res.json(user);
  });
};

exports.getUsersItems = function(req, res) {
  User.findById(req.params.id)
  .populate('items')
  .exec(function (err, user) {
    return err ? res.send(err) : res.json(user.items);
  });
};

exports.search = function(req, res) {
  if (req.query.name) {
    var partialNameRegex = new RegExp('[a-zA-Z0-9\\s]*' + req.query.name + '[a-zA-Z0-9\\s]*', 'i');
    User.find({name: partialNameRegex}, function (err, User) {
      return err ? res.send(err) : res.json(User);
    });
  } else {
    return res.status(400).send('Bad request, please check query.');
  }
};

exports.addUser = function(req, res) {
    var user = new User({
      name: req.body.name,
      username: req.body.username,
      items: req.body.items,
    });

    user.save((err, user) => {
      return err ? res.send(err) : res.json(user);
    });
  });
}

exports.updateById = function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    return err ? res.send(err) : res.json(user);
  });
}

exports.deleteById = function(req, res) {
  User.findOneAndRemove({_id: req.params.id}, (err, user) => {
    return err ? res.send(err) : res.json(user);
  });
}

exports.deleteById = function(req, res) {
  User.findByIdAndRemove(req.params.id, req.body, (err, user) => {
    var items = user.items;
    items.forEach((itemId) => {
      Item.findByIdAndRemove(itemId);
    });
    return res.json(user);
  });
}
