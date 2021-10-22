var { bookinglot } = require('../mongooseModel/BookingLot.js');
const mongoose = require('mongoose'),ObjectId=mongoose.ObjectId;
var { userData } = require('../mongooseModel/User.js');
var { parkinglot } = require('../mongooseModel/ParkingLot.js');
exports.userBookingLot = async function (data) {
       var userResData = await userData.findOne({ _id: mongoose.Types.ObjectId(data.user)})
       var bookingLotData = await parkinglot.findOne({ _id: mongoose.Types.ObjectId(data.bookingLotName)})
       console.log("bookingLotData",bookingLotData.reservedParkingCapacity)
      if(bookingLotData.reservedParkingCapacity==0){
        return {
            data: "This booking lot is not available",
            value: false
        }
      }else{
       var saveBookingLot
       let newObj = {
        bookingLotName: data.bookingLotName,
        user:data.user,
        userName:userResData.name
       }
       let bookingObj= new bookinglot(newObj)
       saveBookingLot = await bookingObj.save()

       var reservedParkingCapacitydata = bookingLotData.reservedParkingCapacity-1
       var noOfCars_reservedParkingdata =bookingLotData.noOfCars_reservedParking+1
    
       var newObject = {reservedParkingCapacity:reservedParkingCapacitydata,noOfCars_reservedParking:noOfCars_reservedParkingdata}
       var Output2 =await parkinglot.updateOne({
        _id:mongoose.Types.ObjectId(data.bookingLotName)
        },
        newObject
        )
        if (Output2 && Output2.nModified) {
            return {
                data: "Update Successfully",
                value: true
            }
        }  
       if (saveBookingLot && !saveBookingLot._id) {
           return {
               data: "Something Went Wrong While Saving BookingLot",
               value: false
           }
       }
       return {
           data: "saved",
           value: true
       }
    }
}