const FACEBOOK_ACCESS_TOKEN = 'EAAKnjkbSQvQBANGzmiaxvLECHo3jyn0uwv9RTiOjts2GYhdNgkoZBhQFGLvzjSZBWXhQWYH6tbHbh5zO0eHUAPzKmQqbvmDi80ApeJ7SZBIasA342ozD035GZCLVcm38TSojAvk5hLdmZCP6e6we0gHYKziGgR4gTkHvh3KnBsgZDZD';
const CAT_IMAGE_URL = 'https://botcube.co/public/blog/apiai-tutorial-bot/hosico_cat.jpg';
const insertData = require('./insertData');
const request = require('request');

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
                    payload: { url: CAT_IMAGE_URL}
                }
            }
        }
    });
    insertData(event);
};