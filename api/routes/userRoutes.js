const router = require('express').Router();
const userValidators = require('../controllers/user/validators');
const userController = require('../controllers/user/userControllers');
const auth = require('../tools/auth');
const verifyTools = require('../controllers/user/SMSVerification');


// POST request to send the verification code
router.post("/sendcode", userValidators.validate_identities, verifyTools.getToken);

// POST request to check user phone number
router.post('/verifycode', userValidators.validate_verifyCode, verifyTools.verifyToken);

// POST request for user registration
router.post('/register', userValidators.validate_register, userController.user_register);

// POST request for user login
router.post('/login', userValidators.validate_login, userController.user_login);

// POST request to configure the usser account
router.post("/config/:userId", userController.account_config);

// Get request to get a login user
router.get('/', auth.checkUserCookie);




module.exports = router;