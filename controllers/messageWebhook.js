const processMessage = require('../helpers/processMessage');
const processAttachment = require('../helpers/processAttachments');
const sendWelcomeMsg = require('../helpers/sendWelcomeMsg');

module.exports = (req, res) => {
    console.log('hello');
    if (req.body.object === 'page') {
        req.body.entry.forEach(entry => {
            entry.messaging.forEach(event => {
                console.log('messageWebhook');
                if (event.message && event.message.text) {
                    console.log(event.message);
                    processMessage(event);
                }
                if(req.body.entry && req.body.entry[0].messaging){
                    // event ={ "sender.id": "Value ...", "message.text": "Value ..."};
                    // processMessage(event);
                    sendWelcomeMsg.sendWelcomeMsg(req, res);
                }
                if(event.message && event.message.attachments){
                    console.log('attachments');
                    console.log(event.message.attachments);
                    processAttachment(event);
                }
            });
        });

        res.status(200).end();
    }
};