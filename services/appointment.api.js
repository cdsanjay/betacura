const router = require('express').Router();
const mailSender = require('./mailer');
const generalTemplate = require('./generalTemplate');
const validationResult = require('./parseValidation');
const { check } = require('express-validator');
const Razorpay = require('razorpay');
const path = require('path');
const bodyParser = require('body-parser')

const razorpay = new Razorpay({
    key_id: process.env.REACT_APP_RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET
});

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/razorpay', jsonParser, async (req, res) => {
    const payment_capture = 1
    const amount = req.body.amount;
    console.log('amount', req.body)
    if(amount <= 0) return res.status(400).json({
        success: false,
        message: 'amount must be greater than 0 (ZERO)!'
    })
    const currency = 'INR'

    const options = {
        amount: amount * 100,
        currency,
        receipt: req.body.employeeId,
        payment_capture
    }

    try {
        const response = await razorpay.orders.create(options)
        // console.log(response)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/logo', (req, res) => {
    res.sendFile(path.join(__dirname, 'logo.png'))
})

router.get('/test', (req, res) => {
    res.send('<h1>Appointment API is live</h1>');
    return false;
});

// @route:  POST api/email/send
// @desc:  send email
// @access: private (admin)
router.post(
    '/save',
    async (req, res) => {
    console.log('save', req.body.payment)
        // send Email
        try {
            // create
            let savedData = await mailSender({
                to: [process.env.FORM_SEND_EMAIL, req.body.email],
                subject: generalTemplate.generic.subject(`Appointment for Employee - ${req.body.employeeName} - ${req.body.employeeId}`),
                html: generalTemplate.generic.html(req.body),
            });
            console.log('savedData', savedData);
            if (savedData) {
                return res.json({
                    message: 'Mail has been sent successfully',
                    _id: savedData,
                });
            }
            return res.status(400).json({
                message: 'Data cannot be recorded at the moment. Try again later!',
            });
        } catch (error) {
        console.log('error', error);
            return res.status(400).json({
                message: 'Unable to process.',
            });
        }
    },
);

module.exports = router;
