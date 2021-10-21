const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.ObjectId;
var parkinglotSchema = Schema({
    
},{
    timestamps: true
});
var parkinglot = mongoose.model('ParkingLots', parkinglotSchema);
module.exports = {
    parkinglot
}