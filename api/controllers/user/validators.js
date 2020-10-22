const {body, param, validationResult} = require("express-validator");
const User = require('../../../models/userModel');

exports.result = (req, res, next) => {
    const errors = validationResult(req).formatWith(
        (error) => {
            return {
                message: error.msg,
                value: error.value,
                field: error.param
            };
        }
    );

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.json({
            type: "validation",
            errors: errors.array()
        });
    }

    return next();
};

exports.validate_identities = [
    body("username", "Le nom d'utilisateur est invalide.")
    .matches(/^(?=[a-zA-Z0-9._]{4,10}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
    .trim()
    .escape()
    .custom((value) => {
        value = value.toString().toLowerCase();
        return User.findOne({username: value}).then(user => {
            if (user) {
                return Promise.reject("Nom d'utilisateur de'ja' utilise'.");
            }
        });
    }),
    body("tel").isMobilePhone()
    .withMessage("Nume'ro de te'le'phone invalide.")
    .custom((value) => {
        return (User.findOne({tel: value}).then(user => {
            if (user) return Promise.reject("Nume'ro de te'le'phne de'ja' utilise.'");
        }));
    }),
    this.result,
    (req, res, next) => {
        let tel = req.body.tel;
        if (req.body.tel.toString().indexOf('0') === 0 && req.body.tel.toString().length === 10) {
            tel = "+243".concat(req.body.tel.toString().slice(1));
        } else if (req.body.tel.toString().slice(0, 2) === "00") {
            tel = "+".concat(req.body.tel.toString().slice(2)); 
        }
        req.body.tel = tel;
        next();
    }
];

exports.validate_verifyCode = [
    body("code").isNumeric().withMessage("Le code de verification est incorrect."),
    this.result
];

exports.validate_register = [
    body('password')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_]?)[A-Za-z\d@$!%*#_?&]{8,}$/)
    .withMessage("mauvais mot de passe."),
    this.result
];

exports.validate_config = [
    param("userId").isMongoId().withMessage("Bad user id."),
    body().escape().trim(),
    this.result
];

exports.validate_login = [
    body("username").trim().escape(),
    body("password").trim().escape(),
    this.result
];