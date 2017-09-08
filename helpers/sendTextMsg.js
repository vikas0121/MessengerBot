/*
    sender - senderId
*/
const request = require('request');
var configValues = require('../config');
//const token = 'EAAKnjkbSQvQBAIMVWDjrTicZCbh8ZAHW8ZCz1DIszsNoZBPZBSbuDWsEYEg5CqCBTSlAPJuAxCotd3ZACe8kBdswpwHtt7OdlUcEIbNBhGTfWjMGDNV7BQYk3LB7KHTzPvJp6zG6pYSFfkdcHZCCF8zyB9ZCXTeDcfENYg3Shs3g2AZDZD';
var token = configValues.PAGE_ACCESS_TOKEN;
module.exports = {
    sendTextMessage: (sender, text) => {
        let messageData = { text: text }

        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: token },
            method: 'POST',
            json: {
                recipient: { id: sender },
                message: messageData,
            }
        }, function (error, response, body) {
            if (error) {
                console.log('Error sending messages: ', error)
            } else if (response.body.error) {
                console.log('Error: ', response.body.error)
            }
            else{
                console.log('Message sent');
            }
        })
    }
};


