const router = require('express').Router();
const departController = require('../controllers/department/departController');

const { checkAdminRight } = require('../tools/rights');

// POST request to create a department
router.post("/create", checkAdminRight, departController.create_department);

// Get request to get all the department
router.get('/', departController.depart_get_all);

// Get request to get departments by faculty
router.get('/byfac/:facId', departController.depart_get_by_fac);

module.exports = router;