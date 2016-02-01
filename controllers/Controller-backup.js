// var models = require('../models/Model');

// Connect to Nedb
var Datastore = require('nedb');
var db = {};
db.user = new Datastore({ filename: './db/users.db', autoload: true });
db.counter = new Datastore({ filename: './db/counters.db', autoload: true });
db.tipe_item = new Datastore({ filename: './db/tipe_item.db', autoload: true });
db.items = new Datastore({ filename: './db/items.db', autoload: true });

// User
exports.UserList = function(req, res, next) {
    if(req.params.id) {
        db.user.findOne({ _id: req.params.id }, function (err, doc) {
            if(err) {
                return res.send({success: false, data: err});
            }
            res.send({success: true, data: doc});
        });
        return;
    }

    // paging
    db.user.count({}, function(err, count) {
        counts = count
    });

    db.user.find({}).sort({id: 1}).skip(req.query.start).limit(req.query.limit).exec(function(err, docs) {
        if(err) {
            res.send({success: false, data: 'failure'});
        }
        res.send({success: true, data: docs, total: counts});
    });
};

exports.UserSave = function(req, res) {
    // update
    if(req.body._id.substring(0, 4) != 'User') {
        db.user.update({ _id: req.body._id }, {
                user_email: req.body.user_email,
                user_name: req.body.user_name,
                user_password: req.body.user_password,
                user_telp: req.body.user_telp,
                user_address: req.body.user_address,
                user_role: req.body.user_role
            }, {}, function(err) {
            if(err) {
                return res.send({success: false, data: err});
            }
            res.send({success: true, data: 'Success update data'});
        });
        return;
    };

    // add new
    db.counter.update({ 'name': 'user_id' }, { $inc: { seq: 1 } }, {});
    db.counter.findOne({ '_id': 'bjL1ikEIQfUyd8td' }, function (err, doc) {
        if(err) {
            return res.send({success: false, data: err});
        }

        db.user.insert([{
            user_email: req.body.user_email.toLowerCase(),
            user_name: req.body.user_name,
            user_password: req.body.user_password,
            user_telp: req.body.user_telp,
            user_address: req.body.user_address,
            user_role: req.body.user_role,
            id: doc.seq
        }], function (err, newDocs) {
            if (err) {
                res.send({success: false, data: err});
            }
            res.send({success: true, data: 'Success add data'});
        });
    });
};

exports.UserDestroy = function(req, res) {
    var json = JSON.parse(req.body.data);
    db.user.remove({_id: json[0]._id}, {}, function(err, numRemoved) {
        if(err) {
            res.send({success: false, data: err});
        }
        res.send({success: true, data: 'Success remove data'});
    });
};

// Tipe Items
exports.TipeItemList = function(req, res) {
    if(req.params.id) {
        db.tipe_item.findOne({ _id: req.params.id }, function (err, doc) {
            if(err) {
                return res.send({success: false, data: err});
            }
            res.send({success: true, data: doc});
        });
        return;
    }

    //pagging
    db.tipe_item.count({}, function(err, count) {
        counts = count;
    });

    db.tipe_item.find({}).sort({id: 1}).skip(req.query.start).limit(req.query.limit).exec(function(err, docs) {
        if(err) {
            res.send({success: false, data: 'failure'});
        }
        res.send({success: true, data: docs, total: counts});
    })
};

exports.TipeItemSave = function(req, res) {
    // update
    if(req.body._id.substring(0, 9) != 'TipeItems') {
        db.tipe_item.update({ _id: req.body._id }, { tipe_tipe: req.body.tipe_tipe }, {}, function(err) {
            if(err) {
                return res.send({success: false, data: err});
            }
            res.send({success: true, data: 'Success update data'});
        });
        return;
    };

    // add new
    db.counter.update({ 'name': 'tipe_item_id' }, { $inc: { seq: 1 } }, {});
    db.counter.findOne({ _id: 'tRJ9KSzLvgUT4jpC' }, function (err, doc) {
        if(err) {
            return res.send({success: false, data: err});
        }
        db.tipe_item.insert({ tipe_tipe: req.body.tipe_tipe, id: doc.seq }, function (err, newDocs) {
            if (err) {
                res.send({success: false, data: err});
            }
            res.send({success: true, data: 'Success add data'});
        });
    });
};

exports.TipeItemDestroy = function(req, res) {
    var json = JSON.parse(req.body.data);
    db.tipe_item.remove({ _id: json[0]._id }, {}, function (err, numRemoved) {
        if(err) {
            res.send({success: false, data: err});
        }
        res.send({success: true, data: 'Success remove data'});
    });
};

// Items
function type(id, tipe_item) {
    data = null;
    tipe_item.forEach(function(element, index, array) {
        if(element.id == id) {
            // console.log(element);
            data = element;
        }
    });
    return data;
}
var joinTipeItems = function(docs, tipe_item) {
    var newDocs = [];
    
    docs.forEach(function(element, index, array) {
        newDocs.push({
            '_id': element._id,
            'id': element.id,
            'item_name': element.item_name,
            'item_price': element.item_price,
            'tipeItems': type(element.tipe_items_id, tipe_item)
        });
    });
    return newDocs;
}

exports.ItemsList = function(req, res) {
    db.tipe_item.find({}, function(err, docs) { dataTipe = docs });

    if(req.params.id) {
        db.items.findOne({ _id: req.params.id }, function (err, doc) {
            if(err) {
                return res.send({success: false, data: err});
            }
            res.send({success: true, data: doc});
        });
        return;
    }

    //pagging
    db.items.count({}, function(err, count) {
        counts = count;
    });

    db.items.find({}).sort({id: 1}).skip(req.query.start).limit(req.query.limit).exec(function(err, docs) {
        if(err) {
            res.send({success: false, data: 'failure'});
        }

        // join function
        data = joinTipeItems(docs, dataTipe);
        res.send({success: true, data: data, total: counts});
    })
};

exports.ItemsSave = function(req, res) {
    // update
    if(req.body._id) {
        db.items.update({ _id: req.body._id }, {
            item_code: req.body.item_code, 
            item_name: req.body.item_name,
            item_price: req.body.item_price,
            tipe_items_id: req.body.tipe_items_id,
        }, {}, function(err) {
            if(err) {
                return res.send({success: false, data: err});
            }
            res.send({success: true, data: 'Success update data'});
        });
        return;
    };

    // add new
    db.counter.update({ 'name': 'items_id' }, { $inc: { seq: 1 } }, { upsert: true });
    db.counter.findOne({ 'name': 'items_id' }, function (err, doc) {
        if(err) {
            return res.send({success: false, data: err});
        }
        db.items.insert({ 
            item_code: req.body.item_code, 
            item_name: req.body.item_name,
            item_price: req.body.item_price,
            tipe_items_id: req.body.tipe_items_id,
            id: doc.seq 
        }, function (err, newDocs) {
            if (err) {
                res.send({success: false, data: err});
            }
            res.send({success: true, data: 'Success add data'});
        });
    });
};

exports.ItemsDestroy = function(req, res) {
    var json = JSON.parse(req.body.data);
    db.items.remove({ _id: json[0]._id }, {}, function (err, numRemoved) {
        if(err) {
            res.send({success: false, data: err});
        }
        res.send({success: true, data: 'Success remove data'});
    });
};