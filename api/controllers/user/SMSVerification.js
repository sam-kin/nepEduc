const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

exports.getToken = (req, res, next) => {
    // let tel = req.body.tel;
    // if (req.body.tel.toString().indexOf('0') === 0 && req.body.tel.toString().length === 10) {
    //     tel = "+243".concat(req.body.tel.toString().slice(1));
    // } else if (req.body.tel.toString().slice(0, 2) === "00") {
    //     tel = "+".concat(req.body.tel.toString().slice(2)); 
    // }
    // client
    //     .verify
    //     .services(process.env.VERIFY_SERVICE_SID)
    //     .verifications
    //     .create({
    //         to: tel,
    //         channel: req.body.channel
    //     })
    //     .then(data => {
    //         return res.status(200).json(data.status);
    //     })
    //     .catch(err => res.json({
    //         error: err
    //     }));
    res.json("pending");
};

exports.verifyToken = (req, res, next) => {
    // let tel = req.body.tel;
    // if (req.body.tel.toString().indexOf('0') === 0 && req.body.tel.toString().length === 10) {
    //     tel = req.body.tel = "+243".concat(req.body.tel.toString().slice(1));
    // } else if (req.body.tel.toString().slice(0, 1) === "00") {
    //     tel = "+".concat(req.body.tel.toString().slice(2)); 
    // }
    // client
    //     .verify
    //     .services(process.env.VERIFY_SERVICE_SID)
    //     .verificationChecks
    //     .create({
    //         to: tel,
    //         code: req.body.code
    //     })
    //     .then(data => res.status(200).json(data.status))
    //     .catch(err => next(err));
    if (req.body.code === '123456') {
        return res.json("approved");
    }

    res.json("pending");
};