var models = require('../models/ItemModel');
var typeModel = require('../models/TypeModel');

// Item
exports.ItemList = function(req, res) {
    if(req.params.id) {
        id = (req.params.id != 0) ? req.params.id : null;
        models.Item.findOne({ '_id': id }, function (err, doc) {
            if(err) {
                console.log(err);
                res.send({success: false, data: err});
                return;
            }
            res.send({success: true, data: doc});
        });
        return;
    }

    // paging
    models.Item.count({}, function(err, count) {
        counts = count;
    });
    models.Item.find({}).sort({id: 1}).skip(req.query.start).limit(req.query.limit).exec(function(err, docs) {
        if(err) {
            console.log(err);
            res.send({success: false, data: 'failure'});
            return;
        }
        res.send({success: true, data: docs, total: counts});
    });
    return;
};

exports.ItemSave = function(req, res, next) {
     // update
    if(req.body._id != 0) {
        models.Item.findByIdAndUpdate(req.body._id, {
            item_code: req.body.item_code,
            item_name: req.body.item_name,
            item_price: req.body.item_price,
            type_name: req.body.type
        }, {}, function(error, counter)   {
            if(error) {
                res.send({success: false, data: 'failure'});
                return;
            }
            res.send({success: true, data: 'Success add data'});
        });
        return;
    };

    // new data
    // var type = typeModel.Type.findById(req.body.type, function(error, doc) {

    // });
    var item = new models.Item({
        item_code: req.body.item_code,
        item_name: req.body.item_name,
        item_price: req.body.item_price,
        type_name: req.body.type
    });

    item.save(function(err) {
        if (err) {
            res.send({success: false, data: 'failure'});
            return;
        }
        res.send({success: true, data: 'Success add data'});
    });
};

exports.ItemDestroy = function(req, res) {
    var json = JSON.parse(req.body.data);
    models.Item.findByIdAndRemove(json[0]._id, function(err, numRemoved) {
        if(err) {
            res.send({success: false, data: err});
            return;
        }
        res.send({success: true, data: 'Success remove data'});
    });
};
