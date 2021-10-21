
var { parkinglot } = require('../mongooseModel/ParkingLot.js');
exports.save = async function (data) {
    let saveUserAccount
       let newObj = {
        accountName: data.accountName,  
       }

       let userAccountObj = new parkinglot(newObj)
       saveUserAccount = await userAccountObj.save()
       if (saveUserAccount && !saveUserAccount._id) {
           return {
               data: "Something Went Wrong While Saving UserAccount",
               value: false
           }
       }
       return {
           data: "saved",
           value: true
       }
}