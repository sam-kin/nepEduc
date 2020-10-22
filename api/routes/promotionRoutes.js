const router = require('express').Router();
const promotionController = require('../controllers/promotion/promotionController');

const { checkAdminRight } = require('../tools/rights');

// POST request to create a promotion.
router.post('/create', checkAdminRight, promotionController.promotion_create);

// Get request to get the promotions by option
router.get('/byoption/:optionId', promotionController.promotion_get_by_option);

// Post request to add names to a list of students
router.post('/appendnames/:promId', promotionController.promotion_student_list_add_names);

// Post request to check the existance of a student in a list
router.post('/checkname/:promId', promotionController.promotion_student_list_check_name);

module.exports = router;