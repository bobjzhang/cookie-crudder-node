var mongoose      = require('mongoose');
var Item          = require('./item');
var Schema        = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  }
);

module.exports = mongoose.model('User', UserSchema);
