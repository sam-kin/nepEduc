const router = require('express').Router();
const univController = require('../controllers/university/univController');

const { checkAdminRight } = require('../tools/rights');

// POST request to create a university.
router.post('/create', checkAdminRight, univController.univ_create);

// Get request to get all universities
router.get('/', univController.univ_get_all);

// Get request to get one university
router.get('/:univId', univController.univ_get_one);

module.exports = router;