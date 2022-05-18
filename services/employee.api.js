const router = require('express').Router();
const bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
const employees = require('../backend/model/Employee');

const employeeIds = employees?.map(employee => employee['employeeID']?.toString());
// create application/x-www-form-urlencoded parser
bodyParser.urlencoded({ extended: false });

router.post('/validate/', jsonParser,
    async (req, res) => {
    console.log('systems', req.body?.name)
    try {
        const {employeeID} = req.body;
        const isEmployeeExist = employeeID &&  employeeIds && Array.isArray(employeeIds) && employeeIds?.includes(employeeID);
        const response = {
            isValid: isEmployeeExist,
            message: isEmployeeExist ? "" : "Invalid EmployeeID!"
        }
        if(isEmployeeExist) {
            const employeeRow = employees.find(employee => employee['employeeID'] === employeeID);
            if(employeeRow) {
                response.employee = {
                    name: employeeRow.Name,
                    age: employeeRow.age,
                    id: employeeRow.employeeID,
                    gender: employeeRow.Gender,
                }
            }
        }
        return res.json(response)
    } catch (error) {
        console.log(error)
        return res.json({
            isValid: false,
             message: 'Error processing!',
        });
    }
})
module.exports = router;
