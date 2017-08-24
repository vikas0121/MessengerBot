var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://10.0.8.62:27017/test";

module.exports = (event) => {
    console.log('message received');
    console.log(event);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        //var myobj = { name: "Company Inc", address: "Highway 37" };
        db.collection("messenger_chat").insertOne(event, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
};