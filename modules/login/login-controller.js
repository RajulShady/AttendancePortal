const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');
const { SuccessMessages, ErrorMessages } = require('../../constants');
const response = require('../../utils/response');
const { otherStrings } = require('../../constants');
const { Teacher } = require('../teacher/teacher-model');
const mongoService = require('../../services/mongoService');

const loginAdmin = (data, res) => {
  try {
    const { adminId, password, role } = data;
    if (adminId === otherStrings.adminId) {
      if (password === otherStrings.adminPasscode) {
        const payload = {
          date: new Date(),
          adminId: adminId,
          role: role, 
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
    const { teacherId, password, role } = data;
    if (!teacherId || !password || !role) {
      return response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 400);
    }
    const teacher = await mongoService.findOne({ teacherId }, Teacher);
    if (teacher) {
      // mongoService.comparePassword(password, teacher.password, (error, isMatch) => {
      //   if (error) throw error;
      //   if (isMatch) {
      //     const payload = {
      //       date: new Date(),
      //       id: teacherId, 
      //       role: role,
      //     };
      //     const token = jwt.sign(payload, otherStrings.secret, {
      //       expiresIn: '12h',
      //     });
      //     return response.handleSuccess(res, SuccessMessages.TEACHER_LOGIN_SUCCESSFUL, 200);
      //   } else{
      //     console.log('hey');
      //     return response.handleError(res, ErrorMessages.INVALID_PASSCODE, 400);
      //   }
      // });
      if (password == teacher.password) {
        const payload = {
          date: new Date(),
          teacherId: teacherId,
          role: role,
        };
        const token = jwt.sign(payload, otherStrings.secret, {
          expiresIn: '12h',
        });
        return response.handleSuccess(res, SuccessMessages.TEACHER_LOGIN_SUCCESSFUL, 200, token);
      }
    } else {
      return response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
    }
  } catch (error) {
    return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }

};

module.exports = {
  loginAdmin,
  loginTeacher,
};
