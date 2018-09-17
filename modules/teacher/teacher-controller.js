const bcrypt = require('bcrypt');
const Student = require('../student/student-model');
const Teacher = require('../teacher/teacher-model');
const Attendance = require('../attendance/attendance-model');
const mongoService = require('../../services/mongoService');
const response = require('../../utils/response');
const { SuccessMessages, ErrorMessages, otherStrings } = require('../../constants');


const addTeacher = async (data, res) => {
  try {
    if (!data.name || data.classAssigned.length <= 0) {
      return response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 400);
    } else {
      const hash = await bcrypt.hash('123456', otherStrings.saltrounds);
      data['password'] = hash;
      const teacherAdded = await mongoService.createNew(data, Teacher);
      return response.handleSuccess(res, SuccessMessages.RECORD_SUCCESS, 200);
    }
  } catch( error ) {
    return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500);
  }
};

const deleteTeacher = async (data, res) => {
  try {
    const { teacherId } = data;
    const teacher = await mongoService.findOne({ teacherId }, Teacher);
    if(teacher) {
      await mongoService.findAndRemove({ teacherId }, Teacher);
      return response.handleSuccess(res, SuccessMessages.RECORD_DELETED, 200);
    } else {
      return response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
    }
  } catch (error) {
    console.log(error);
    return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500);
    }
};

const getTeachers = async (res) => {
  try {
    const teachers = await mongoService.findAll(Teacher).populate('classAssigned', 'classname');
    if(teachers) {
      return response.handleSuccess(res, SuccessMessages.RECORDS_FOUND, 200, teachers);
    } else {
      return response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
    } 
  } catch (error) {
    console.log(error);
    return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500);
  }
};

const changePassword = async (data, res) => {
  try {
    let { teacherId, password } = data;
    if(!teacherId || !password){
      return response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 400);
    }
    const teacher = await mongoService.findOne({ teacherId }, Teacher);
    if (teacher) {
      if (teacher.password == password) {
        return response.handleError(res, ErrorMessages.SAME_PASSWORD, 400);
      }
      password = await bcrypt.hash(password, otherStrings.saltrounds);
      await mongoService.updatePassword({ teacherId }, password, Teacher);
      return response.handleSuccess(res, SuccessMessages.PASSWORD_CHANGED, 200);
    } else {
      return response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
    }
  } catch (error) {
    return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};

module.exports = {
  addTeacher,
  deleteTeacher,
  getTeachers,
  changePassword,
};
