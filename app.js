'use strict';
const express = require('express');
const seatInfo = require('../dynamic-grid-service/controllers/seat-controller');
const connection = require('../dynamic-grid-service/dbConnection/mongo-connection');
const app = express();
const cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser')
connection.mongoconnection();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/seatdetails', (req, res, next) => {
    seatInfo.seat(req, res);
});
app.put('/updateSeat', (req, res, next) => {
    seatInfo.seatUpdate(req, res);
});
app.put('/payment', (req, res, next) => {
    seatInfo.payment(req, res);
});
var server = app.listen(3000);