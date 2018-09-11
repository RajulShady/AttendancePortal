const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');
const { SuccessMessages, ErrorMessages } = require('../../constants');
const response = require('../../utils/response');
const { otherStrings } = require('../../constants');
const Teacher = require('../teacher/teacher-model');
const mongoService = require('../../services/mongoService');
const Admin = require('../admin/admin-model');

const loginAdmin = async (data, res) => {
  try {
    const { adminId, password } = data;
    const admin = await mongoService.findOne({ adminId }, Admin);
    if (admin) {
      await bcrypt.compare(password, admin.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const payload = {
            date: new Date(),
            adminId: admin.adminId,
            role: admin.role,
          };
          const token = jwt.sign(payload, otherStrings.secret, {
            expiresIn: '12h',
          });
          return response.handleSuccess(res, SuccessMessages.ADMIN_LOGIN_SUCCESSFUL, 200, token);
        } 
        return response.handleError(res, ErrorMessages.INVALID_PASSCODE, 400);
      });
    } else {
      return response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
    }
    } catch (error) {
    return response.handleServerError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};

const loginTeacher = async (data, res) => {
  try {
    const { teacherId, password } = data;
    if (!teacherId || !password) {
      return response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 400);
    }
    const teacher = await mongoService.findOne({ teacherId }, Teacher);
    if (teacher) {
      await bcrypt.compare(password, teacher.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const payload = {
            date: new Date(),
            teacherId: teacherId,
            role: teacher.role,
          };
          const token = jwt.sign(payload, otherStrings.secret, {
            expiresIn: '12h',
          });
          return response.handleSuccess(res, SuccessMessages.TEACHER_LOGIN_SUCCESSFUL, 200, token);
        } else {
          return response.handleError(res, ErrorMessages.INVALID_PASSCODE, 400);
        }
      });
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
