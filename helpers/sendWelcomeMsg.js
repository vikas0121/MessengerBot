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
            url: "https://graph.facebook.com/v2.6/me/messages?access_token=EAAKnjkbSQvQBAEEyWgpUKR2HZBSPRDwMsEzgP3fHRPNzTFHOOxUaeZBzAZCj5aAMM2DbZBzx9FMO6sgFYXwAo02hPQ8ZB1oowPHx2U307d74AeipGe5Xagv7lZCfLK1UloAs9lZAubA7cCZAI5KvdZAJzdw8J8KFRlsUBn0b9fWlbaQZDZD",
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