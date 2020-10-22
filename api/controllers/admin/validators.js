const {body} = require('express-validator');
const {result} = require('../user/validators');

exports.validate_right_providers = [
    body('userId').isMongoId().withMessage("Utilisateur incorrect.")
    .custom(async value => {
        const user = await User.findById(value);

        if (!user) {
            throw new Error('Utilisateur incorrect.');
        }

        if (user.account.name !== "student") {
            throw new Error('L\'utilisateur n\'est pas etudiant.');
        }
    }),
    body('right')
        .escape()
        .matches(/cp|simple|admin|delegue|cpa|student/)
        .withMessage('Le droit est incorrect.'),
    result
];