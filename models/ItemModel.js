// var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
	item_code: { type: String, required: true, trim: true },
    item_name: { type: String, required: true, trim: true },
    item_price: { type: Number, required: true, trim: true },
    type_id: { type: Schema.Types.ObjectId, required: true },
	item_status: { type: String, required: true },
	item_description: { type: String, trim: true }
});
var item = mongoose.model('items', itemSchema);

module.exports = {
    Item: item
};
