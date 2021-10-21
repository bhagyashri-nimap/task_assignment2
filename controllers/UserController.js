var express = require('express');
var router = express.Router()
var UserModel = require('../models/UserModel')
var { userData } = require('../mongooseModel/User.js');
// var {authenticateUser} = require("../config/middleware");
router.use(express.json());
//sign up
router.post("/userRegistration", async (req, res) => {
    try {
        var data = await UserModel.userRegistration(req.body)
        if (data.value) {
            res.status(200).json(data.data)
        } else {
            res.status(500).json(data)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}), 
//Login
router.post("/login", async (req, res) => {
    try {
        let outputData = await UserModel.login(req.body)
        if (outputData && outputData.value) {
            res.status(200).json(outputData.data)
        } else {
            res.status(500).json(outputData)
        }
    } catch (error) {
        console.log("inside err", error)
        res.status(500).send(error)
    }
})
//getAllRegisterUser
router.post("/getAllUser", function (req, res) {
    userData.find({})
        .sort({
            _id: -1
        })
        .then((data) => {
            data = {
                users: data,
                count: data.length
            }
            res.json(data)
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Error occurred"
            })
        })
})
module.exports = router