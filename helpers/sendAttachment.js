/*
    sender - senderId
*/
const request = require('request');
var configValues = require('../config.js');
const FACEBOOK_ACCESS_TOKEN = 'EAAKnjkbSQvQBANGzmiaxvLECHo3jyn0uwv9RTiOjts2GYhdNgkoZBhQFGLvzjSZBWXhQWYH6tbHbh5zO0eHUAPzKmQqbvmDi80ApeJ7SZBIasA342ozD035GZCLVcm38TSojAvk5hLdmZCP6e6we0gHYKziGgR4gTkHvh3KnBsgZDZD';
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


