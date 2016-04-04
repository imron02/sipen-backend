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
    var paging = function(counts) {
        models.Item.aggregate({
            $lookup:
                {
                  from: "types",
                  localField: "type_id",
                  foreignField: "_id",
                  as: "type"
                }
        }).sort({id: 1}).skip(parseInt(req.query.start)).limit(parseInt(req.query.limit)).exec(function(err, docs) {
            if(err) {
                console.log(err.message);
                res.send({success: false, message: 'failure'});
                return;
            }
            res.send({success: true, data: docs, total: counts});
        });
    };

    models.Item.count({}, function(err, count) {
        counts = count;
        paging(counts);
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
            type_id: req.body.type,
            item_status: req.body.item_status,
            item_description: req.body.item_description
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
    var item = new models.Item({
        item_code: req.body.item_code,
        item_name: req.body.item_name,
        item_price: req.body.item_price,
        type_id: req.body.type,
        item_status: req.body.item_status,
        item_description: req.body.item_description
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
