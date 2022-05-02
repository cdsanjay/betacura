const router = require('express').Router();
const mailSender = require('./mailer');
const generalTemplate = require('./generalTemplate');
const validationResult = require('./parseValidation');
const { check } = require('express-validator');
const Razorpay = require('razorpay');
const path = require('path');
const bodyParser = require('body-parser')
const {generateOTP, validateOTP} = require("./otp");
const {formatAPI, formatError} = require("./util/format");

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
                to: [process.env.REACT_APP_FORM_SEND_EMAIL, req.body.email],
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

const validateEmail = (email) => {
    email = (email || "").toString().toLowerCase().trim();
    return email;
}

// @route:  POST api/email/send
// @desc:  send email
// @access: private (admin)
router.put(
    '/send-otp',
    async (req, res) => {
        // send Email
        try {
            let {email} =req.body;
            console.log('email',email)
            email = validateEmail(email)
            // let email = "idsanjay82@gmail.com";
            if(!email) {
                return res.status(400).json({
                    message: 'Invalid Email ID',
                    success: false,
                })
            }
            // create
            const hashResponse = await generateOTP(email);
            if (hashResponse.success) {
                return res.json(formatAPI(`OTP is sent to ${email} email `, {
                    hash: hashResponse.data,
                    email,
                    length: process.env.OTP_LENGTH || 4,
                }));
            }
            return res.status(400).json(hashResponse);
        } catch (error) {
            console.log('error', error);
            return res.status(400).json({
                message: 'Unable to process.',
            });
        }
    },
);

router.put('/validate-pin',
    async (req, res) => {
        let {email} =req.body;
        email = validateEmail(email)
        if(!email) {
            return res.status(400).json({
                message: 'Invalid Email ID',
                success: false,
            })
        }
        const { otp, hash } = req.body;
        const isMatch = await validateOTP(hash, otp, email);
        if (isMatch) {
            return res.json(formatAPI('Email is verified.', true))
        } else {
            return res.status(400)
                .json(formatError('The OTP entered is incorrect .', false));
        }
    });


module.exports = router;
