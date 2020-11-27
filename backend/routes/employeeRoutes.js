const express = require('express');
const router = express.Router();
const { getEmployeeDetails } = require('../controllers/employeeController');

router.get('/employee', getEmployeeDetails);

module.exports = router;
