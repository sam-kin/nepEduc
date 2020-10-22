const router = require('express').Router();
const userRequestController = require('../controllers/user/userRequestController/userRequestController');

// Post request to create a demand
router.post('/create/:userId', userRequestController.user_send_demand);

module.exports = router;