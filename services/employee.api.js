const router = require('express').Router();
const mailSender = require('./mailer');
const generalTemplate = require('./generalTemplate');
const validationResult = require('./parseValidation');
const { check } = require('express-validator');
const Razorpay = require('razorpay');
const path = require('path');
const bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
const employees = require('../backend/model/Employee');

const employeeIds = employees?.map(employee => employee['employeeID']?.toString());
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/validate/', jsonParser,
    async (req, res) => {
console.log('systems', req.body?.name)
    try {
        const {employeeID, name} = req.body;
        const isEmployeeExist = employeeID &&  employeeIds && Array.isArray(employeeIds) && employeeIds?.includes(employeeID);
        res.json({
            isValid: isEmployeeExist,
            message: isEmployeeExist ? "" : "Invalid EmployeeID!"

        })
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;
