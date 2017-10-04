const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;
const app = express();
var FB = require('fb');
var request = require('request');
const insertData = require('./helpers/insertData');
const chatMsgs = require('./helpers/getChatMsgs.js');
const sendMsg = require('./helpers/sendTextMsg.js');
const sendAttachment = require('./helpers/sendAttachment');
const token = 'EAAKnjkbSQvQBAAPUdPzYMFQDGalIPgLZCKeoXMUrB14stcHSmTbFtCefCvykaKeoUSlpTXZCcGtvfG4CLT47zg4vhHX2Swe0PBdSHQlt8jjv0dmvKiweIA8vAPm4v4yjlXP2Kd8ApxMOkP6N61puxQgUyNSUOUq8tZBSZCJdbAZDZD';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var path    = require("path");


const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');
const sendText = require('./helpers/sendTextMsg');
const chatStatus = require('./helpers/updateChatStatus.js');

app.get('/', verificationController);
app.post('/', messageWebhookController);

// app.get('/about',function(req,res){
//   res.sendFile(path.join(__dirname+'/index.html'));
// });


app.use(express.static(__dirname));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json())
app.set('view engine', 'jade');

function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +s4() + '-' + s4() + s4() + s4();
}


app.get('/login', function(req, res){
  res.render("index",{guid:guid()});
});

app.get('/webhook', function (req, res) {
    console.log("into web hook");
    if (req.query['hub.verify_token'] === 'botcube is cool') {
      res.send(req.query['hub.challenge']);
   } else {
      res.send('Error, wrong validation token');    
   }
});

// app.post('/', function (req, res) {
//     console.log("into post web hook");
//     console.log(req.body);
//     console.log(req.body.entry[0].messaging);
//     res.sendStatus(200)
// });

app.post('/sendmessage', function (req, res){
     
    console.log("intosendmessaage");
    var headers = {
      'Content-Type': 'application/json'
    }
    
    var options = {
      url: "https://graph.facebook.com/v2.6/me/messages?access_token=EAAKnjkbSQvQBAEEyWgpUKR2HZBSPRDwMsEzgP3fHRPNzTFHOOxUaeZBzAZCj5aAMM2DbZBzx9FMO6sgFYXwAo02hPQ8ZB1oowPHx2U307d74AeipGe5Xagv7lZCfLK1UloAs9lZAubA7cCZAI5KvdZAJzdw8J8KFRlsUBn0b9fWlbaQZDZD",
      method: 'POST',
      headers: headers,      
      form: {
        "recipient": {
          "user_ref":  req.body.user_ref
        }, 
        
        "message": {
          "text":req.body.message
        }
      }
    }
    
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        res.sendStatus(200);
      }
      else{
        res.sendStatus(response.statusCode);
    }
  });
});










var cron = require('node-cron');
var cronJob = cron.schedule("*/5 * * * * *", function () {
    chatMsgs.getChatMessages(function (data) {
        console.log('inside getChatMessages');
            data.forEach(function (element) {
                console.log('inside foreach loop');
                console.log(element.CustID);
                console.log(element.Message);
                console.log('callback 0');
                if(element.Message != ""){
                sendMsg.sendTextMessage(element.CustID, element.Message,element._id);
            }
            else if(element.attachments != null){
                console.log('attachments');
                console.log(element.attachments[0].image_url);
                var url = 'chatbot.policybazaar.com'+element.attachments[0].image_url;
                sendAttachment.sendImage(element.CustID,url);
            }
                console.log('callback 1');
                chatStatus.updateChatMsg(element._id,url);
            });
            
    });
    // perform operation e.g. GET request http.get() etc.
    // Running the schedular in every 5 secs
    console.log('cron job completed');
});
cronJob.start();

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
        db.collection('messenger_chat').find().limit(10).sort({
            _id: -1
        }).toArray(function (err, res) {
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
                db.collection('messenger_chat').insert({
                    sender: name,
                    message: {
                        text: message
                    }
                }, function () {
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