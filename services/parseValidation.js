const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = {};
  const validation = validationResult(req) || [];
  if (!validation.isEmpty()) {
    validation.array().forEach((each) => {
      errors[each.param] = each.msg;
    });
    // http 406 is not acceptable error
    return res.status(406).json({ errors, success: false, message: 'Some fields are required..' });
  }
  return next();
};
