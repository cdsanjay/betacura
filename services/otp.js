const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const {
  formatError,
  formatAPI,
} = require('./util/format');
const mailSender = require("./mailer");
const generalTemplate = require("./generalTemplate");

const sendEmailOTP = async (email, otp) => {
  try {
      const savedData = await mailSender({
          to: [email],
          subject: generalTemplate.otp.subject(),
          html: generalTemplate.otp.html(otp),
      });
      console.log('savedData email', savedData)
      return formatAPI('', savedData);
  } catch (error) {
      return formatError('Error Sending an email', error);
  }
};

const getTodayMidnightTimestamp = () => {
  const dateTime = new Date();
  dateTime.setHours(24, 0, 0, 0);
  return dateTime.getTime();
};

const concatEmailOTP = (otp, email) => otp?.toString()
    + email?.toString()
    + getTodayMidnightTimestamp()?.toString();

const generateOTP = async (email) => {
  // generate OTP first
  // encrypt the otp and send hash to the user response
  // get payload: otp and hash and compare
  if (!email) return formatError('No Userdata to send otp!');

    // if in production, and not test phone number, generate otp
   const otp = otpGenerator.generate(process?.env?.OTP_LENGTH || 4, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    sendEmailOTP(email, otp).then();
    // const responseEmail = await sendEmailOTP(email, otp).then();
    // if(!responseEmail.success) return responseEmail;
    console.error('OTP', otp);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(
    concatEmailOTP(otp, email),
    salt,
  );
  return formatAPI('', hash);
};

const validateOTP = async (hash, otp, email) => bcrypt.compareSync(
  concatEmailOTP(otp, email),
  hash,
);

module.exports = {
  generateOTP,
  validateOTP,
};
