'use strict';
var ObjectId = require('mongodb').ObjectId;
function seatInformation(req, res) {
    let db = global.mongo;
    db.collection('seats').find({}).toArray(function (err, result) {
        if (result.length > 0) {
            res.send(result);
        }
    });
};

function seatUpdate(req, res) {
    let db = global.mongo;
    var query = req.body.match;
    return db.collection("seats").findOne(query)
        .then(data => {
            if (data) {
                data.availability.forEach(element => {
                    if (element.seat == req.body.update.seat) {
                        element.status = Number(!req.body.update.status);
                        if (Number(!req.body.update.status)) {
                            element.user = req.body.update.user;
                        } else {
                            delete element.user
                        }
                    }
                });
                return db.collection("seats").updateOne({ _id: ObjectId(data._id) }, { $set: data }).then(doc => {
                    if (doc) {
                        res.status(200).json({ message: 'Updated sucessfully' });
                    }
                });
            }
        })
}
function seatPayment(req, res) {
    let db = global.mongo;
    db.collection('seats').find({}).toArray(function (err, result) {
        if (result.length > 0) {
            result.forEach(element => {
                element.availability.forEach(_item => {
                    if (_item.user === 'shalini' && _item.status === 1) {
                        _item['payment'] = true;
                    }
                });
                db.collection('seats').updateOne({ "_id": ObjectId(element._id) }, { $set: element }).then(_doc => {
                    if (_doc) {
                        console.log("payed");
                    }
                });
            });
            res.status(200).json({ message: 'payment sucessfully' });
        }
    });
}
module.exports = {
    seat: seatInformation,
    seatUpdate: seatUpdate,
    payment: seatPayment

}