var https = require('http');
var userInfo = require('./getUserInfo.js');

module.exports = {
    sendMsgToChat: (event) => {

        console.log(event.sender.id);
        var data = userInfo.getUser(event.sender.id, function (data) {
            //console.log(data);
        });
        //console.log(event);
        var url = null;
        if (event.message.attachments) {
            console.log(event.message.attachments[0].payload.url);
            console.log('Image Url');
            url = event.message.attachments[0].payload.url;
            console.log(url);
        }
        console.log(event.sender.id);
        //console.log(data);
        if (event.message != undefined) {
            jsonObject = JSON.stringify({
                "mobileno": "7042249079",
                "name": "Vikas",
                "custid": event.sender.id,
                "departmentid": "8tGiqNce6X7uLYKEF",
                "department": "TermLife",
                "Body": event.message.text,
                "token": null,
                "read": null,
                "roomid": null,
                "userid": null,
                "source": "FB",
                "attachments": [{
                    "title": url,
                    "title_link": url,
                    "title_link_download": false,
                    "image_url": url,
                    "image_type": null,
                    "image_size": 0
                }]
            });
            console.log(jsonObject);
            console.log('API called');
            // prepare the header
            var postheaders = {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
            };

            // the post options
            var optionspost = {
                //host: 'chatbot.policybazaar.com',
                host: '10.0.32.94',
                port: 3000,
                path: '/api/v1/livechat/wa-incoming',
                method: 'POST',
                headers: postheaders,
                timeout: 12000000
            };

            console.info('Options prepared:');
            console.info(optionspost);
            console.info('Do the POST call');

            // do the POST call
            var reqPost = https.request(optionspost, function (res) {
                console.log("Inside reqPost")
                //console.log(req)
                //console.log(res)
                if (!res) {
                    console.log('Error occured');
                }
                console.log("statusCode: ", res.statusCode);
                // uncomment it for header details
                //  console.log("headers: ", res.headers);
                res.setEncoding('utf8');
                res.on('data', function (d) {
                    console.log('POST result:\n');
                    process.stdout.write(d);
                    console.log('\n\nPOST completed');
                });
            });
            // write the json data
            console.log('done2');
            reqPost.write(jsonObject);
            reqPost.end();
            console.log('done');
            // reqPost.on('error', function (e) {
            //     console.log('Error while connecting chat api');
            //     console.error(e);
            // });
        }
    }
};