// var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
	item_code: { type: String, required: true, trim: true },
    item_name: { type: String, required: true, trim: true },
    item_price: { type: Number, required: true, trim: true },
    type_name: { type: String, required: true }
});
var item = mongoose.model('items', itemSchema);

module.exports = {
    Item: item
};
