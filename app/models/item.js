var mongoose   = require('mongoose');
var User     	 = require('./user');
var Schema     = mongoose.Schema;

var ItemSchema = new Schema(
	{
		name: {
		  type: String,
		  required: true
		},
		description: {
		  type: String,
		  required: true
		},
	  ownerId: {
	  	type: Schema.Types.ObjectId,
	  	ref: 'User',
	  	required: true
	  },
	}
);

module.exports = mongoose.model('Item', ItemSchema);
