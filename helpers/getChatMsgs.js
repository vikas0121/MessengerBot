
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://10.0.8.62:27017/rocketchat_test";

module.exports = {
    getChatMessages: (fn) => {
        console.log('getChatMsgs');
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            //db.collection("messenger_chat").findOne({}).toArray(function (err, docs) {
            db.collection("MessengerChatMsgs").find({'read':'false'}).toArray(function (err, docs) {
                console.log("Returned #" + docs.length + " documents");
                //console.log(docs);
                db.close();
                fn(docs);
            })
        });
    }
};