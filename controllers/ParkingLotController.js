var express = require('express');
var router = express.Router()
var ParkingLotModel = require('../models/ParkingLotModel')
var {authenticateUser} = require("../config/middleware");
var middleware= require("../config/validatingApi");
router.use(express.json());
//saveParkingLots
router.post("/parking/save", async (req, res) => {
    try {
        var data = await ParkingLotModel.save(req.body)
        if (data.value) {
            res.status(200).json(data.data)
        } else {
            res.status(500).json(data)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}),
// Get all the details from ParkingSlot Table
router.post('/parking/getTotalparkingslot',authenticateUser,[middleware.validateAPI], (req, res) => {
    ParkingLotModel.getAllInformation(req, res);
  })

// Update totalParkingSlot in ParkingSlot Table 
router.put('/parking/updateTotalparkingslot',[middleware.updateTotalParkingSlotValidateApI], (req, res) => {
    ParkingLotModel.updateTotalParkingSlot(req, res);
  })

  // Calculated and Automated Reserved and NonReserved based on first come first serve basis
router.post('/parking/calculateTotalparkingslot', [middleware.validateCalculation], (req, res) => {
    ParkingLotModel.calculateTotalparkingslot(req, res);
  })

router.post('/parking/calculateTotalparkingslot', [middleware.validateCalculation], (req, res) => {
    ParkingLotModel.calculateTotalparkingslot(req, res);
})
module.exports = router