const Student = require('./student-model');
const Teacher = require('../teacher/teacher-model');
const { SuccessMessages, ErrorMessages } = require('../../constants');
const mongoService = require('../../services/mongoService');
const response = require('../../utils/response');
const { otherStrings } = require('../../constants');
const Class = require('../class/class-model');
const Admin = require('../admin/admin-model');

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

const getStudentByClass_Admin = async (data, res) => {
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

const getStudentByClass_Teacher = async (data, res) => {
  try{
    const { classId, teacherId } = data;
    if (!classId || !teacherId) {
      return response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 200);
    }
    const teacher = await mongoService.findOne({ teacherId }, Teacher);
    if (teacher) {
        const students =  await mongoService.findUser({ classId }, Student).populate('classId', 'classname');
        if(students.length > 0){
          return response.handleSuccess(res, SuccessMessages.RECORDS_FOUND, 200, students);
        } else {
          return response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
        }
    } else {
      return response.handleError(res, SuccessMessages.RECORD_NOT_EXIST, 400);
    }
  } catch (error) {
      console.log(error)
      return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500);
  } 
};


  

module.exports = {
  addStudent,
  deleteStudent,
  getStudentByClass_Teacher,
  getStudentByClass_Admin,
};