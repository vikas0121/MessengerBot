/*
    sender - senderId
*/
const request = require('request');
const token = 'EAAKnjkbSQvQBANGzmiaxvLECHo3jyn0uwv9RTiOjts2GYhdNgkoZBhQFGLvzjSZBWXhQWYH6tbHbh5zO0eHUAPzKmQqbvmDi80ApeJ7SZBIasA342ozD035GZCLVcm38TSojAvk5hLdmZCP6e6we0gHYKziGgR4gTkHvh3KnBsgZDZD';

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
        })
    }
};


