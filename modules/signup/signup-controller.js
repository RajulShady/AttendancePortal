const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');
const { SuccessMessages, ErrorMessages } = require('../../constants');
const response = require('../../utils/response');
const { otherStrings } = require('../../constants');
const mongoService = require('../../services/mongoService');
const Admin = require('../admin/admin-model');

const signupAdmin = async (data, res) => {
  try {
    const { adminId, password } = data;  
    if (!adminId || !password) {
      return response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 400);
    } else {  
      const admin = await mongoService.findOne({ adminId }, Admin);
      if (admin) {
        return response.handleError(res, ErrorMessages.ALREADY_EXISTS, 400);
      } else {
        const hash = await bcrypt.hash(password, otherStrings.saltrounds);
        data.password = hash;
        await mongoService.createNew(data, Admin);
        return response.handleSuccess(res, SuccessMessages.SIGNUP_SUCCESS, 200);
      }
    }
  } catch (error) {
    return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};

module.exports = {
  signupAdmin,
}