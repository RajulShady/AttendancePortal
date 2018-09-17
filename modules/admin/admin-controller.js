const bcrypt = require('bcrypt');
const Teacher = require('../teacher/teacher-model');
const Student = require('../student/student-model');
const { SuccessMessages, ErrorMessages } = require('../../constants');
const mongoService = require('../../services/mongoService');
const response = require('../../utils/response');
const { otherStrings } = require('../../constants');
const Class = require('../class/class-model');
const Admin = require('../admin/admin-model');

const changePasswordAdmin = async (data, res) => {
  try {
    let { adminId, password } = data;
     if (!adminId || !password) {
       return response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 400);
     } else {
       const admin = await mongoService.findOne({ adminId }, Admin);
       if (admin) {
        password = await bcrypt.hash(password, otherStrings.saltrounds);
         await mongoService.updatePassword({ adminId }, password, Admin);
         return response.handleSuccess(res, SuccessMessages.PASSWORD_CHANGED, 200);
       } else {
         return response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
       }
     }
  } catch (error) {
    return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};

module.exports = {
  changePasswordAdmin,
};
