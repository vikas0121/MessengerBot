//const request = require('request');
const insertData = require('./insertData');
const getData = require('./getData');
const sendAttachment = require('./sendAttachment');
const getAttachment = require('./getAttachment');
const sendMsgToChat = require('./sendMessageToChat');
var request = require('request').defaults({
    encoding: null
});
var fs = require('fs');

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    console.log('processMessage');
    insertData(event, "messenger_chat");

    var uri = event['message']['attachments'][0]['payload']['url'];
    console.log('uri');
    console.log(uri);


    // request.get(uri, function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
    //         //console.log(data);
            
    //         var url = 'https://apiqa.policybazaar.com/cs/repo/uploadPolicyCopy?metaDataJson={"leadId":"766","customerId":"55555","productId":"117"}';
    //         var req = request.post(url, function (err, resp, body) {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 console.log('URL: ' + body);
    //             }
    //         });
    //         var form = req.form();
    //         form.append('file', new Buffer(data), {
    //             filename: 'fb_image',
    //             contentType: 'image/jpeg'
    //         });

    //     }
    // });








    sendMsgToChat.sendMsgToChat(event);

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
    //};
};