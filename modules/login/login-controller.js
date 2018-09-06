const jwt = require('jsonwebtoken');
const { SuccessMessages, ErrorMessages } = require('../../constants');
const response = require('../../utils/response');
const { otherStrings } = require('../../constants');

const loginAdmin =async (data, res) => {
    try {
      const { adminId, password } = data;
      if (adminId === otherStrings.adminId) {
        if (password === otherStrings.adminPasscode) {
          const payload = {
            date: new Date(),
            id: adminId, 
          };
          const token = jwt.sign(payload, otherStrings.secret, {
            expiresIn: '12h',
          });
          return response.handleSuccess(res, SuccessMessages.ADMIN_LOGIN_SUCCESSFUL, 200, token);
        } else {
          return response.handleError(res, ErrorMessages.INVALID_PASSCODE, 400);
        }
      } else {
        return response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 400);
      }
      } catch (error) {
      return response.handleServerError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500, error);
    }
  };

  module.exports = {
    loginAdmin,
  };
