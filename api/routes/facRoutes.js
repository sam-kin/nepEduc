const router = require('express').Router();
const facController = require('../controllers/fac/facController');

const { checkAdminRight } = require('../tools/rights');

// POST request to create a faculty
router.post("/create", checkAdminRight, facController.fac_create);

// Get reques to get all the faculties
router.get('/', facController.fac_get_all);

// Get request to get faculties by university
router.get('/byuniv/:univId', facController.fac_get_by_univ);

module.exports = router;