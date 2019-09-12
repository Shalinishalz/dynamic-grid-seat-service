'use strict';
const mongo =  require('mongodb');
function MongoClientConnection() {
    var options = { useUnifiedTopology: true , useNewUrlParser: true };
    mongo.connect("mongodb://127.0.0.1:27017/", options, function(err,db) {
        if (err) {
            console.log("failed to connnect db");
        } else {
            console.log("db connnected succesfully");
            global.mongo = db.db("neutrinos") ;
            // return db;
        }
    });
};
module.exports = {
    mongoconnection : MongoClientConnection
}