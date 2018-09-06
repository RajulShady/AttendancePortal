const jwt = require('jsonwebtoken');
const { SuccessMessages, ErrorMessages } = require('../../constants');
const response = require('../../utils/response');
const { otherStrings } = require('../../constants');
const { Newteacher } = require('./login-teacher-model');
const mongoService = require('../../services/mongoService');

const loginAdmin = (data, res) => {
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

const loginTeacher = async (data, res) => {
  try {
    const { teacherId, password } = data;
    const teacher = await mongoService.findOne({ teacherId }, Newteacher);
    if (teacher) {
      if (password === teacher.password) {
        const payload = {
          date: new Date(),
          id: teacherId, 
        };
        const token = jwt.sign(payload, otherStrings.secret, {
          expiresIn: '12h',
        });
        response.handleSuccess(res, SuccessMessages.TEACHER_LOGIN_SUCCESSFUL, 200, token);
      } else {
        response.handleError(res, ErrorMessages.INVALID_PASSCODE, 400);
      }
    } else {
      response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
    }
  } catch (error) {
    response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }

};

module.exports = {
  loginAdmin,
  loginTeacher,
};
