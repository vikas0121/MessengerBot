const request = require('request');
const insertData = require('./insertData');
const getData = require('./getData');
const sendAttachment = require('./sendAttachment');
const getAttachment = require('./getAttachment');

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    console.log('processMessage');
    insertData(event);

    var docs = getAttachment.getImage(function (docs) {
        console.log('getImage');
        console.log(docs['message']['attachments'][0]['payload']['url']);
        var url = docs['message']['attachments'][0]['payload']['url'];
        // console.log(docs['sender']['id']);
        // var id = docs['sender']['id'];
        // var text = docs['message']['text'];
        // console.log(text);
        sendAttachment.sendImage(senderId, url);
    });
};