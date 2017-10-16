var configValues = require('../config.js');
var token = configValues.PAGE_ACCESS_TOKEN;
var request = require('request');

module.exports = {
    sendWelcomeMsg: (req, res) => {
        if(req.body.entry[0].messaging[0].optin &&
          req.body.entry[0].messaging[0].optin.user_ref 
        ){
            console.log('sendWelcomeMsg');
        console.log(req.body.entry[0].messaging[0].optin.user_ref);
        var userRef =req.body.entry[0].messaging[0].optin.user_ref;
        var headers = {
            'Content-Type': 'application/json'
        }

        var options = {
            url: "https://graph.facebook.com/v2.6/me/messages?access_token=EAAKnjkbSQvQBADIbJq0w1rzTeZCZC7UC6fs8uwmcXUmmmPZANFZA8g1Dvo19PxRIt5qfTwcXRvUmkcStV2ElHcXgwrIrcYErwZC3RDeh75d1uFGfQ1w9a9dFRqxIfNKWlcHpbzqVQGHbeWVbdbe5LTtjUvFQ2odJBwFN3eiX0ogZDZD",
            method: 'POST',
            headers: headers,
            form: {
                "recipient": {
                    "user_ref": userRef
                },

                "message": {
                    "text": "Welcome to PolicyBazaar"
                }
            }
        }

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                //res.sendStatus(200);
            }
            else {
                //res.sendStatus(response.statusCode);
            }
        });
        }
    }
};