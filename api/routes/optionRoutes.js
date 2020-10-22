const router = require('express').Router();
const optionController = require('../controllers/option/optionController');

const { checkAdminRight } = require('../tools/rights');

// POST request to create an option
router.post("/create", checkAdminRight, optionController.option_create);

// Get request to get options by department
router.get('/bydepart/:departId', optionController.option_get_by_depart);

module.exports = router;