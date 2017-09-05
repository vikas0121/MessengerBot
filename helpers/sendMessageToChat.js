var https = require('http');

module.exports = {
    sendMsgToChat: (event) => {

          if (event.message != undefined) {
        jsonObject = JSON.stringify({
            "mobileno": "7042249079",
            "name": "Test message posted with node.js",
            "custid": 2664508,
            "departmentid": "8tGiqNce6X7uLYKEF",
            "department": "TermLife",
            "Body": event.message.text,
            "token": null,
            "read": null,
            "roomid": null,
            "userid": null
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
            host: 'chatbot.policybazaar.com',
            //port: 3000,
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
        console.log('Hello vikas');
        // write the json data
        reqPost.write(jsonObject);
        reqPost.end();
        console.log('Hello vikas 2');
        // reqPost.on('error', function (e) {
        //     console.log('Error while connecting chat api');
        //     console.error(e);
        // });
        console.log('Hello vikas 3');
    }
    }
};