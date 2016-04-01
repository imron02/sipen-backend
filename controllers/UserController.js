var models = require('../models/UserModel');

// User
exports.UserList = function(req, res) {
    if(req.params.id) {
        id = (req.params.id != 0) ? req.params.id : null;
        models.User.findOne({ '_id': id }, function (err, doc) {
            if(err) {
                res.send({success: false, message: err.message});
                return;
            }
            res.send({success: true, data: doc});
        });
        return;
    }

    // paging
    models.User.count({}, function(err, count) {
        counts = count;
    });
    models.User.find({}).sort({id: 1}).skip(parseInt(req.query.start)).limit(parseInt(req.query.limit)).exec(function(err, docs) {
        if(err) {
            res.send({success: false, message: err.message});
            return;
        }
        res.send({success: true, data: docs, total: counts});
    });
    return;
};

exports.UserSave = function(req, res, next) {
     // update
    if(req.body._id != 0) {
        models.User.findByIdAndUpdate(req.body._id, {
            user_name: req.body.user_name,
            user_password: req.body.user_password,
            user_telp: req.body.user_telp,
            user_address: req.body.user_address,
            user_role: req.body.user_role
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
    var user = new models.User({
        user_email: req.body.user_email.toLowerCase(),
        user_name: req.body.user_name,
        user_password: req.body.user_password,
        user_telp: req.body.user_telp,
        user_address: req.body.user_address,
        user_role: req.body.user_role,
    });

    user.save(function(err) {
        if (err) {
            res.send({success: false, data: 'failure'});
            return;
        }
        res.send({success: true, data: 'Success add data'});
    });
};

exports.UserDestroy = function(req, res) {
    var json = JSON.parse(req.body.data);
    models.User.findByIdAndRemove(json[0]._id, function(err, numRemoved) {
        if(err) {
            res.send({success: false, data: err});
            return;
        }
        res.send({success: true, data: 'Success remove data'});
    });
};