var https = require('http');

module.exports = {
    postAttachment: (event) => {

        if (event.message.attachments) {
            console.log(event.message.attachments[0].payload.url);
            url = event.message.attachments[0].payload.url;
        }

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
                "source": "FB"
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
                host: 'https://apiqa.policybazaar.com/cs/repo/uploadPolicyCopy?metaDataJson={"\"leadId\":" + custmessage.MobileNo + " , \"customerId\" :" + custmessage.MobileNo + " , \"productId\" :" + "117" + " }',
                //host: '10.0.32.94',
                //port: 3000,
                //path: '/api/v1/livechat/wa-incoming',
                method: 'POST',
                headers: postheaders,
            };
            // do the POST call
            var reqPost = https.request(optionspost, function (res) {
                console.log("Inside reqPost")
                if (!res) {
                    console.log('Error occured');
                }
                console.log("statusCode: ", res.statusCode);
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
        }
    }
};