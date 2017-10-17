
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://10.0.8.62:27017/test";

module.exports = {
    getMessages: (fn) => {
        console.log('getMessages');
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            //db.collection("messenger_chat").findOne({}).toArray(function (err, docs) {
            db.collection("messenger_chat").findOne({}, function (err, docs) {
                console.log("Returned #" + docs.length + " documents");
                //console.log(docs);
                db.close();
                fn(docs);
            })
        });
    }
};
