/*
    sender - senderId
*/
const request = require('request');
var configValues = require('../config.js');
const FACEBOOK_ACCESS_TOKEN = configValues.PAGE_ACCESS_TOKEN;
module.exports = {
    sendImage: (senderId, url) => {

        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: FACEBOOK_ACCESS_TOKEN },
            method: 'POST',
            json: {
                recipient: { id: senderId },
                message: {
                    attachment: {
                        type: 'image',
                        payload: { url: url }
                    }
                }
            }
        });
    }
};


