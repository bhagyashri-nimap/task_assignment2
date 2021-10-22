const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.ObjectId;
var bookinglotSchema = Schema({
  bookingLotName:{        
    type: Schema.Types.ObjectId,
    ref: "ParkingLots"
   },
  user: {       
    type: Schema.Types.ObjectId,
    ref: "User"
   },
  userName:{
    type: String
  }
  
},{
    timestamps: true
});
var bookinglot = mongoose.model('BookingLot', bookinglotSchema);
module.exports = {
    bookinglot
}