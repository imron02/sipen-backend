var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user_email: {type: String, required: true},
    user_name: {type: String, required: true},
    user_password: {type: String, required: true},
    user_telp: {type: String},
    user_address: {type: String},
    user_role: {type: String, required: true}
});
var users = mongoose.model('users', userSchema);

module.exports = {
    User: users
};
