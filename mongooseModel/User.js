const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var userSchema = Schema({
    name: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    accessToken:{
        type: String
    }
},
{
    timestamps: true
});
var userData = mongoose.model('User', userSchema);
module.exports = {
    userData
}