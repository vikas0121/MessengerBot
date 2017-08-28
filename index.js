const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;
const sendText = require('./helpers/sendTextMsg');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');

app.get('/', verificationController);
app.post('/', messageWebhookController);

// Connect to mongo
mongo.connect('mongodb://10.0.8.62:27017/test', function (err, db) {
    if (err) {
        throw err;
    }
    console.log('MongoDB connected...');

    // Connect to Socket.io
    client.on('connection', function (socket) {
        //let chat = db.collection('messenger_chat').find();

        // console.log(chat);

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
            console.log('data' + data);
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
                        console.log('enter message');
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