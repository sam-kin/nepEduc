const router = require('express').Router();
const StudentListController = require('../controllers/studentLists/studentListController');

// Post request to add names to a list of students
router.post('/add/:lisId', StudentListController.student_list_add_names);

// Post request to check the existance of a student in a list
router.post('/check/:listId', StudentListController.student_list_check_name);

module.exports = router;