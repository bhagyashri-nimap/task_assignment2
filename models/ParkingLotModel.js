
var { parkinglot } = require('../mongooseModel/ParkingLot.js');
exports.save = async function (data) {
    let saveParkingLot
       let newObj = {
        uniqueId: data.uniqueId,
        totalParkingSlot:data.totalParkingSlot,
        reservedParkingCapacity:data.reservedParkingCapacity,
        notReservedParkingCapacity:data.notReservedParkingCapacity,
        noOfCars_reservedParking:data.noOfCars_reservedParking,
        noOfCars_NotreservedParking:data.noOfCars_NotreservedParking
       }

       let parkingObj= new parkinglot(newObj)
       saveParkingLot = await parkingObj.save()
       if (saveParkingLot && !saveParkingLot._id) {
           return {
               data: "Something Went Wrong While Saving UserAccount",
               value: false
           }
       }
       return {
           data: "saved",
           value: true
       }
},
exports.getAllInformation = (req, res) => {
    console.log();
    parkinglot.findOne({uniqueId: req.body.uniqueId}, async( err, parkinglot) => {
      if (parkinglot!==null) {
        res.send({
          status: 200,
          message: 'Success !!',
          data: parkinglot
        });
      } else {
        res.send({
          status: 200,
          message: 'No Parkinglot information Found with the repective id !!'
        });
      }
    }) 
  },
exports.updateTotalParkingSlot = (req, res) => {
    console.log(req.body);
    parkinglot.findOne({uniqueId: req.body.uniqueId}, async( err, parkingLots) => {
        if (parkingLots!==null) {
          parkingLots.reservedParkingCapacity = (req.body.totalParkingSlot/100)*20; // 20% for reserved parking
          parkingLots.notReservedParkingCapacity = (req.body.totalParkingSlot/100)*80; // 80% for not-reserved parking
          parkingLots.noOfCars_reservedParking =  0;
          parkingLots.noOfCars_NotreservedParking = 0;
  
          parkingLots.totalParkingSlot = req.body.totalParkingSlot;
          console.log(parkingLots);
          var parkingLotsInformation = new parkinglot (parkingLots);
          parkingLotsInformation.save().then(parkingLots => {
            res.send({
              message: 'Parking lot Information Updated',
              status: 200,
              data: parkingLots
            })
          }).catch(err => {
            res.status(400).send({
              message: 'Parking lot Information, Update Failed',
              status: 400,
              err: err
            });
          });
        } else {
          res.status(404).send({
            status: 404,
            message: 'Update failed! Unique Id does not match with the database, please use the proper unique id'
          })
        }
    })
  },
  exports.calculateTotalparkingslot = (req, res) => {
    console.log(req.body);
    parkinglot.findOne({uniqueId: req.body.uniqueId}, async( err, parkingLots) => {
        if (parkingLots!==null) {
          var errMsg = ''; //Queue Full
          // Calulation For Car Enter's in Reserve Parking here
          if(req.body.noOfCars_EnterIn_ReservedParking > parkingLots.reservedParkingCapacity && req.body.noOfCars_EnterIn_NonReservedParking > parkingLots.notReservedParkingCapacity) {
             errMsg += 'Invalid! No of Car Enters in Reserve parking & NonReserveParking > ReservedParking & NonReservedParking Capacity, ';
          } else if(req.body.noOfCars_EnterIn_ReservedParking > parkingLots.reservedParkingCapacity) {
            errMsg += 'Invalid! No of Car Enters in Reserve parking > ReservedParking Capacity, '
          } else if(req.body.noOfCars_EnterIn_NonReservedParking > parkingLots.notReservedParkingCapacity){
            errMsg += 'Invalid! No of Car Enters in NonReserveParking > NonReservedParking Capacity, '
          }
  
          // Calulation For Car Exit's from NonReserve Parking here
          if(req.body.noOfCars_removedFrom_ReservedParking > parkingLots.noOfCars_reservedParking && req.body.noOfCars_removedFrom_NonReservedParking > parkingLots.noOfCars_NotreservedParking) {
            errMsg += 'Invalid! No of Car Removes in Reserve parking & NonReserveParking > ReservedParking & NonReservedParking Capacity, ';
          } else if(req.body.noOfCars_removedFrom_ReservedParking > parkingLots.noOfCars_reservedParking) {
            errMsg += 'Invalid! No of Car Removes in Reserve parking > ReservedParking Capacity, '
          } else if(req.body.noOfCars_removedFrom_NonReservedParking > parkingLots.noOfCars_NotreservedParking){
            errMsg += 'Invalid! No of Car Removes in NonReserveParking > NonReservedParking Capacity, '
          }
         
          if(errMsg!=='') {
            res.status(400).send({
              status: 400,
              message: errMsg + ' Sorry, queue full'
            })
          } else {
  
            // Calulation here Car Enters in Reserve parking
            parkingLots.reservedParkingCapacity = parkingLots.reservedParkingCapacity - req.body.noOfCars_EnterIn_ReservedParking;
            parkingLots.noOfCars_reservedParking = parkingLots.noOfCars_reservedParking + req.body.noOfCars_EnterIn_ReservedParking;
  
            // Calulation here Car Exits in Reserve parking
            parkingLots.reservedParkingCapacity = parkingLots.reservedParkingCapacity + req.body.noOfCars_removedFrom_ReservedParking;
            parkingLots.noOfCars_reservedParking = parkingLots.noOfCars_reservedParking - req.body.noOfCars_removedFrom_ReservedParking;
            
            
            // Calulation here Car Enters in Non Reserve parking
            parkingLots.notReservedParkingCapacity = parkingLots.notReservedParkingCapacity - req.body.noOfCars_EnterIn_NonReservedParking;
            parkingLots.noOfCars_NotreservedParking = parkingLots.noOfCars_NotreservedParking + req.body.noOfCars_EnterIn_NonReservedParking;
  
            
            // Calulation here Car Exits in Non Reserve parking
            parkingLots.notReservedParkingCapacity = parkingLots.notReservedParkingCapacity + req.body.noOfCars_removedFrom_NonReservedParking;
            parkingLots.noOfCars_NotreservedParking = parkingLots.noOfCars_NotreservedParking - req.body.noOfCars_removedFrom_NonReservedParking;
            
            parkingLots.updatedDate = new Date();
            
            console.log(parkingLots);
            
            var parkingLotsInformation = new parkinglot(parkingLots);
  
            parkingLotsInformation.save().then(parkingLots => {
              res.send({
                message: 'Parking lot Information Updated',
                status: 200,
                data: parkingLots
              })
            }).catch(err => {
              res.status(400).send({
                message: 'Update Failed',
                status: 400,
                err: err
              });
            });
          }
        } else if(!err && parkingLots===null) { //Its a new record
          res.status(400).send({
              message: 'Unique Id does not match with the database, please use the proper uniqueId',
              status: 400
          });
        } else {
          res.status(404).send({
            status: 404,
            message: 'Error, Not able to update Parking lot Information data'
          })
        }
    });
  }

 
  