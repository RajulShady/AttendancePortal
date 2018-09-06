const { Teacher } = require('../teacher/teacher-model');
const { Student } = require('../student/student-model');
const { SuccessMessages, ErrorMessages } = require('../../constants');
const mongoService = require('../../services/mongoService');
const response = require('../../utils/response');
const { otherStrings } = require('../../constants');

const addStudent = async (data, res) => {
  try {
    if (!data.name || !data.classname) {
      return response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 400);
    }
    else{
      await mongoService.createNew(data, Student);
      return response.handleSuccess(res, SuccessMessages.RECORD_SUCCESS, 200);
    }
  //   const student = await findStudentByRollno(data.studentrollno);
  //   if (student) {
  //       res.send({ success: false, msg: 'Student already exist' });
  //   } else {
  //       await addStudentMethod(data);
  //       res.send({ success: true, msg: 'Student added successfully' });
  //   }
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
    const { classname } = data;
    const students =  await mongoService.findUser({ classname }, Student);
    if(students){
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
    if (!data.name) {
      return response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 400);
    } else {
      await mongoService.createNew(data, Teacher);
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
    const teachers = await mongoService.findAll(Teacher);
    if(teachers) {
      return response.handleSuccess(res, SuccessMessages.RECORDS_FOUND, 200, teachers);
    } else {
      response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
    } 
  } catch (error) {
    console.log(error);
    return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500);
  }
};

module.exports = {
  addStudent,
  deleteStudent,
  getStudentByClass,
  addTeacher,
  deleteTeacher,
  getTeachers
};
