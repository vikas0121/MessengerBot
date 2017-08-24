module.exports = (req, res) => {
    const hubChallenge = req.query['hub.challenge'];

    const hubMode = req.query['hub.mode'];
    const verifyTokenMatches = (req.query['hub.verify_token'] === 'botcube is cool');

    console.log('hubMode');
    console.log(hubMode);
    console.log('verifyTokenMatches');
    console.log(verifyTokenMatches);

    if (hubMode && verifyTokenMatches) {
        console.log('Verification token match...');
        res.status(200).send(hubChallenge);
    } else {
        console.log('HubMode or verification token fails');
        res.status(403).end();
    }
};