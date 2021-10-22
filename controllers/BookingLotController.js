var express = require('express');
var router = express.Router()
var BookingModel = require('../models/BookingModel')
var {authenticateUser} = require("../config/middleware");
router.use(express.json());
//userBookingLot
router.post("/userBookingLot",authenticateUser, async (req, res) => {
    try {
        var data = await BookingModel.userBookingLot(req.body)
        if (data.value) {
            res.status(200).json(data.data)
        } else {
            res.status(500).json(data)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router