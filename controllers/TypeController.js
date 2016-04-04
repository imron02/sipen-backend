var models = require('../models/TypeModel');

// Type
exports.TypeList = function(req, res) {
    if(req.params.id) {
        id = (req.params.id != 0) ? req.params.id : null;
        models.Type.findOne({ '_id': id }, function (err, doc) {
            if(err) {
                res.send({success: false, data: err});
                return;
            }
            res.send({success: true, data: doc});
        });
        return;
    }

    // paging
    models.Type.count({}, function(err, count) {
        if(err) {
            res.send({success: false, message: err.message});
            return;
        }
        counts = count;
    });
    models.Type.find({}).sort({id: 1}).skip(parseInt(req.query.start)).limit(parseInt(req.query.limit)).exec(function(err, docs) {
        if(err) {
            res.send({success: false, message: err.message});
            return;
        }
        res.send({success: true, data: docs, total: counts});
    });
    return;
};

exports.TypeSave = function(req, res, next) {
     // update
    if(req.body._id != 0) {
        models.Type.findByIdAndUpdate(req.body._id, {
            type_name: req.body.type_name
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
    var type = new models.Type({
        type_name: req.body.type_name
    });

    type.save(function(err) {
        if (err) {
            res.send({success: false, data: 'failure'});
            return;
        }
        res.send({success: true, data: 'Success add data'});
    });
};

exports.TypeDestroy = function(req, res) {
    var json = JSON.parse(req.body.data);
    models.Type.findByIdAndRemove(json[0]._id, function(err, numRemoved) {
        if(err) {
            res.send({success: false, data: err});
            return;
        }
        res.send({success: true, data: 'Success remove data'});
    });
};