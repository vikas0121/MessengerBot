const processMessage = require('../helpers/processMessage');
const processAttachment = require('../helpers/processAttachments');

module.exports = (req, res) => {
    if (req.body.object === 'page') {
        req.body.entry.forEach(entry => {
            entry.messaging.forEach(event => {
                console.log('messageWebhook');
                if (event.message && event.message.text) {
                    console.log(event.message);
                    processMessage(event);
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