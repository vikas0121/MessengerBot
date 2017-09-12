const FACEBOOK_ACCESS_TOKEN = 'EAAKnjkbSQvQBANGzmiaxvLECHo3jyn0uwv9RTiOjts2GYhdNgkoZBhQFGLvzjSZBWXhQWYH6tbHbh5zO0eHUAPzKmQqbvmDi80ApeJ7SZBIasA342ozD035GZCLVcm38TSojAvk5hLdmZCP6e6we0gHYKziGgR4gTkHvh3KnBsgZDZD';
const CAT_IMAGE_URL = 'https://botcube.co/public/blog/apiai-tutorial-bot/hosico_cat.jpg';
const insertData = require('./insertData');
const getData = require('./getData');
const request = require('request');
const sendText = require('./sendTextMsg');
var configValues = require('../config.js');
var sendMessageToChat = require('./sendMessageToChat.js');

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    console.log('processMessage');
    console.log(message);
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: {
                attachment: {
                    type: 'image',
                    payload: { url: CAT_IMAGE_URL }
                }
            }
        }
    });
    insertData(event,"messenger_chat");
    console.log('calling chat api');
     // Send Messenger to chat
    sendMessageToChat.sendMsgToChat(event);
    // var docs = getData.getMessages(function (docs) {
    //     console.log('sent message');
    //     console.log(docs['sender']['id']);
    //     var id = docs['sender']['id'];
    //     var text = docs['message']['text'];
    //     console.log(text);
    //     sendText.sendTextMessage(senderId, text);
    // });

};