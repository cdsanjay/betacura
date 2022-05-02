const formatError = (message = 'Something went wrong', data = null) => ({
  success: false,
  data,
  message,
});

const formatAPI = (message = '', data = null, success = true, payload = {}) => ({
  success,
  data,
  message,
  payload,
});
module.exports = {
  formatError,
  formatAPI,
};
