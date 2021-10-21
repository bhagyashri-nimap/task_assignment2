const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.ObjectId;
var parkinglotSchema = Schema({
  uniqueId:{type:String},
  totalParkingSlot: { type: Number},
  reservedParkingCapacity: { type: Number},
  notReservedParkingCapacity: { type: Number},
  noOfCars_reservedParking: { type: Number},
  noOfCars_NotreservedParking: { type: Number},
},{
    timestamps: true
});
var parkinglot = mongoose.model('ParkingLots', parkinglotSchema);
module.exports = {
    parkinglot
}