const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;
const app = express();
var FB = require('fb');
const insertData = require('./helpers/insertData');
const token = 'EAAKnjkbSQvQBAAPUdPzYMFQDGalIPgLZCKeoXMUrB14stcHSmTbFtCefCvykaKeoUSlpTXZCcGtvfG4CLT47zg4vhHX2Swe0PBdSHQlt8jjv0dmvKiweIA8vAPm4v4yjlXP2Kd8ApxMOkP6N61puxQgUyNSUOUq8tZBSZCJdbAZDZD';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');
const sendText = require('./helpers/sendTextMsg');

app.get('/', verificationController);
app.post('/', messageWebhookController);

// API to access user info
FB.setAccessToken(token);
// FB.api('1176405892458966', function (res) {
//     if (!res || res.error) {
//         console.log('FB api error connection');
//         console.log(!res ? 'error occurred' : res.error);
//         return;
//     }
//     console.log(res);
//     insertData(res, "messenger_User");
//     console.log('user info inserted.');
// });


// Connect to mongo
mongo.connect('mongodb://10.0.8.62:27017/test', function (err, db) {
    if (err) {
        throw err;
    }
    console.log('MongoDB connected...');

    // Connect to Socket.io
    client.on('connection', function (socket) {
        //let chat = db.collection('messenger_chat').find();

        // Create function to send status
        sendStatus = function (s) {
            socket.emit('status', s);
        }
        // Get chats from mongo collection
        db.collection('messenger_chat').find().limit(10).sort({ _id: -1 }).toArray(function (err, res) {
            if (err) {
                throw err;
            }
            // Emit the messages
            socket.emit('output', res);
        });

        // Handle input events
        socket.on('input', function (data) {
            let name = data.name;
            let message = data.message;
            name = '1176405892458966';
            console.log(data.message);
            // Check for name and message
            if (name == '' || message == '') {
                // Send error status
                sendStatus('Please enter a name and message');
            } else {
                db.collection('messenger_chat').insert(
                    { sender: name, message: { text: message } }, function () {
                        // Insert message
                        //chat.insert({name: name, message: message}, function(){
                        client.emit('output', [data]);
                        console.log([data]);
                        // Send status object
                        sendStatus({
                            message: 'Message sent',
                            clear: true
                        });
                    });
                sendText.sendTextMessage(name, message);
            }
        });

        // Handle clear
        socket.on('clear', function (data) {
            // Remove all chats from collection
            chat.remove({}, function () {
                // Emit cleared
                socket.emit('cleared');
            });
        });
    });
});

app.listen(5000, () => console.log('Webhook server is listening, port 5000'));