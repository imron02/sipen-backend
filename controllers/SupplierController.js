var models = require('../models/SupplierModel');

exports.SupplierList = function(req, res) {
	// paging
	var paging = function(counts) {
		models.Supplier.count({}, function(err, counts) {
			if(err) {
				console.log(err);
				res.send({ success: false, message: err.message });
				return;
			}

			console.log(counts);
		});
	};
};