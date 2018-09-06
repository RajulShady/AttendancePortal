const handleSuccess = (res, msg = 'Successful Request', status = 200, data = null) => {
  const response = {
    status,
    msg,
    data
  };
  return res.status(status).json(response);
};

const handleError = (res, msg = 'Unsuccessful Request', status = 400, data = null) => {
  const response = {
    status,
    msg,
    data
  };
  return res.status(status).json(response);
};

const handleServerError = (res, msg = 'Internal Server Error', status = 500, data = null) => {
  const response = {
    status,
    msg,
    data
  };
  return res.status(status).json(response);
};

module.exports = {
  handleSuccess,
  handleError,
  handleServerError,
};
