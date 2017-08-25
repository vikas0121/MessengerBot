
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://10.0.8.62:27017/test";

module.exports = {
    getImage: (fn) => {
        console.log('getImage');
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            db.collection("messenger_chat").findOne({"message.attachments": { $exists: true }}, function (err, docs) {
                console.log("Returned Images#" + docs.length + " documents");
                //console.log(docs);
                db.close();
                fn(docs);
            })
        });
    }
};