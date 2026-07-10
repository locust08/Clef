module.exports = {
  validateStatus(status) {
    return status >= 200 && status < 500;
  },
};
