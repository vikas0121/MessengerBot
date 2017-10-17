const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const app = express();
var FB = require('fb');
var request = require('request');
const insertData = require('./helpers/insertData');
const chatMsgs = require('./helpers/getChatMsgs.js');
const sendMsg = require('./helpers/sendTextMsg.js');
const sendAttachment = require('./helpers/sendAttachment');
const token = 'EAAKnjkbSQvQBADIbJq0w1rzTeZCZC7UC6fs8uwmcXUmmmPZANFZA8g1Dvo19PxRIt5qfTwcXRvUmkcStV2ElHcXgwrIrcYErwZC3RDeh75d1uFGfQ1w9a9dFRqxIfNKWlcHpbzqVQGHbeWVbdbe5LTtjUvFQ2odJBwFN3eiX0ogZDZD';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var path    = require("path");
var config = require('./config');


const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');
const sendText = require('./helpers/sendTextMsg');
const chatStatus = require('./helpers/updateChatStatus.js');

app.get('/', verificationController);
app.post('/', messageWebhookController);

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

app.post('/sendmessage', function (req, res){
     
    console.log("intosendmessaage");
    var headers = {
      'Content-Type': 'application/json'
    }
    
    var options = {
      url: "https://graph.facebook.com/v2.6/me/messages?access_token=" + config.PAGE_ACCESS_TOKEN,
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


app.listen(5000, () => console.log('Webhook server is listening, port 5000'));