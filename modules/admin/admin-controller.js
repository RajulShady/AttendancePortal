const bcrypt = require('bcrypt');
const Teacher = require('../teacher/teacher-model');
const Student = require('../student/student-model');
const { SuccessMessages, ErrorMessages } = require('../../constants');
const mongoService = require('../../services/mongoService');
const response = require('../../utils/response');
const { otherStrings } = require('../../constants');
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

const addStudent = async (data, res) => {
  try {
    if (!data.name || !data.classId) {
      return response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 400);
    }
    else{
      const student = await mongoService.createNew(data, Student);
      // await updateClassList(student);
      return response.handleSuccess(res, SuccessMessages.RECORD_SUCCESS, 200);
    }
  } catch (error) {
    console.log(error);
    return response.handleServerError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};

const deleteStudent = async (data, res) => {
  try{
    const { studentrollno } = data;
    const student = await mongoService.findOne({ studentrollno }, Student);
    if (!student) {
      return response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
    } else {
        await mongoService.findAndRemove({ studentrollno }, Student);
        return response.handleSuccess(res, SuccessMessages.RECORD_DELETED, 200);
    }
  } catch (error) {
      console.log(error);
      return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500);
  }
};

const getStudentByClass = async (data, res) => {
  try{
    const { classId } = data;
    if (!classId) {
      return response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 400);
    } 
    const students =  await mongoService.findUser({ classId }, Student).populate('classId', 'classname');
    if (students.length > 0) {
      return response.handleSuccess(res, SuccessMessages.RECORDS_FOUND, 200, students);
    } else {
      return response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
    }
    } catch (error) {
      return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500);
  }
};

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
  addClass,
  getClassList,
  addStudent,
  deleteStudent,
  getStudentByClass,
  addTeacher,
  deleteTeacher,
  getTeachers,
  changePasswordAdmin,
};
