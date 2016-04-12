var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var supplierSchema = new Schema({
	supplier_code: { type: String, required: true, trim: true },
	supplier_company: { type: String, required: true, trim: true },
	supplier_contact: { type: String, required: true, trim: true },
	supplier_address: { type: String }
});

var supplier = mongoose.model('supplier', supplierSchema);

module.exports = {
	Supplier: supplier
};
