var models = require('../models/SupplierModel');

exports.SuppliersList = function (req, res) {
	if(req.params.id) {
		id = (req.params.id != 0) ? req.params.id : null;
		models.Supplier.findOne({ '_id': id }, function (err, doc) {
			if(err) {
				res.send({ success: false, message: err.message });
				return;
			}

			res.send({ success: true, data: doc });
		});
		return;
	}

	// paging
	var paging = function (counts) {
		models.Supplier.find({}).sort({'_id': 1}).skip(parseInt(req.query.start)).limit(parseInt(req.query.limit)).exec(function(err, docs) {
			if (err) {
				res.send({ success: false, message: err.message });
				return;
			}
			res.send({ success: true, data: docs });
		});
	};

	models.Supplier.count({}, function (err, counts) {
		if (err) {
			res.send({ success: false, data: err.message });
			return;
		}
		paging(counts);
	});
};

exports.SupplierSave = function (req, res) {
	if(req.body._id != 0) {
		models.Supplier.findByIdAndUpdate(req.body._id, {
			supplier_code: req.body.supplier_code.toUpperCase(),
			supplier_company: req.body.supplier_company,
			supplier_contact: req.body.supplier_contact,
			supplier_address: req.body.supplier_address
		}, {}, function (err, counter) {
			if (err) {
				console.log(err.message);
				res.send({ success: false, message: err.message });
				return;
			}

			res.send({ success: true, data: 'Success update data' });
		});
		return;
	}

	// new data
	var supplier = new models.Supplier({
		supplier_code: req.body.supplier_code.toUpperCase(),
		supplier_company: req.body.supplier_company,
		supplier_contact: req.body.supplier_contact,
		supplier_address: req.body.supplier_address
	});

	supplier.save(function (err) {
		if (err) {
			res.send({ success: false, message: err.message });
			return;
		}
		res.send({ success: true, data: 'Data already save' });
	});
};

exports.SupplierDestroy = function (req, res) {
	var json = JSON.parse(req.body.data);
	models.Supplier.findByIdAndRemove(json[0]._id, function (err, numRemoved) {
		if (err) {
			res.send({ success: false, data: err.message });
			return;
		}
		res.send({ success: true, data: 'Success remove data' });
	});
}
