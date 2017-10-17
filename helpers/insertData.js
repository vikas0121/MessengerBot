var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://10.0.8.62:27017/test";
var https = require('http');
var sendMessageToChat = require('./sendMessageToChat.js');

var configValues = require('../config.js');

module.exports = (event, collection) => {
    console.log('message received');

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection(collection).insertOne(event, function (err, res) {
            if (err) {
                console.log('Error occured in inserting document.')
                throw err;
            }
            console.log("1 document inserted");
            db.close();
        });
    });
};