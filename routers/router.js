
var express = require('express');
var router = express.Router()
var UserService = require('../controllers/UserController')
var ParkingService = require('../controllers/ParkingLotController')

router.all("/:apiName",(req, res,next) => {
    console.log("Called: ", req.path)
      next()
   
})

router.use(UserService)
router.use(ParkingService)

module.exports = router