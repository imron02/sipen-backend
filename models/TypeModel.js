var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var typeSchema = new Schema({
    type_name: {type: String, required: true}
});
var type = mongoose.model('types', typeSchema);

module.exports = {
    Type: type
};
