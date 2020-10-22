const router = require('express').Router();
const adminController = require('../controllers/admin/adminController');
const validators = require('../controllers/admin/validators');

// Post request to create a fac admin
router.post('/admin/createdel', validators.validate_right_providers, adminController.provide_delegue_right);

// Post request to create a prom admin
router.post('/admin/createcp', validators.validate_right_providers, adminController.provide_right);

module.exports = router;