var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://10.0.8.62:27017/rocketchat_test";

module.exports = {
    updateChatMsg: (docId) => {
        console.log('updateChatMsg');
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            db.collection("MessengerChatMsgs").update({'_id':docId},{$set:{'read':'true'}},function (err, docs) {
                console.log("updated #" + docs.length + " documents");
                //console.log(docs);
                db.close();
                //fn(docs);
            })
        });
    }
};