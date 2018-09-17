const bcrypt = require('bcrypt');
const Teacher = require('../teacher/teacher-model');
const Student = require('../student/student-model');
const { SuccessMessages, ErrorMessages, otherStrings } = require('../../constants');
const mongoService = require('../../services/mongoService');
const response = require('../../utils/response');
const Class = require('../class/class-model');
const Admin = require('../admin/admin-model');

const addClass = async (data, res) => {
  try {
    const { classname } = data;
    if (!classname) {
      return response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 400);
    } else {
      await mongoService.createNew(data, Class);
      return response.handleSuccess(res, SuccessMessages.RECORD_SUCCESS, 200);
    }
  } catch (error) {
    return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};
  
const getClassList = async (res) => {
  try {
    const classes = await mongoService.findAll(Class);
    if (classes.length > 0) {
      return response.handleSuccess(res, SuccessMessages.RECORDS_FOUND, 200, classes);
    } else {
      return response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
    }
  } catch (error) {
    return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
}

const getClass = async (data, res) => {
  try {
    const { teacherId } = data;
    const teacher = await mongoService.findOne({ teacherId }, Teacher).populate('classAssigned', 'classname');
    if (teacher) {
      return response.handleSuccess(res, SuccessMessages.RECORDS_FOUND, 200, teacher.classAssigned);
    } else{
      return response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
    }
  } catch (error) {
    return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};

module.exports = {
  addClass,
  getClassList,
  getClass,
};