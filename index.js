const express = require('express');
 const cors = require('cors');
const mongoose = require('./db.js');
var router = require('./routers/router')
const app = express();
app.use(cors());
app.options('*', cors());
app.use('/',router)
const server = require('http').createServer(app);
server.listen(3002, () => {
  console.log("Success", 3002)
})

module.exports = app;