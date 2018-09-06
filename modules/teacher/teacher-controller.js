const { Student } = require('../student/student-model');
const { Teacher } = require('../teacher/teacher-model');
const { Attendancne, addAttendanceMethod } = require('../attendance/attendance-model');
const mongoService = require('../../services/mongoService');
const response = require('../../utils/response');
const { SuccessMessages, ErrorMessages } = require('../../constants');
const { Newteacher, updatePassword } = require('../login/login-teacher-model');


const getStudentsByClass = async (data, res) => {
  try{
    const { classname } = data;
    const students =  await mongoService.findUser({ classname }, Student);
    if(students){
      response.handleSuccess(res, SuccessMessages.RECORDS_FOUND, 200, students);
    } else {
      response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
    }
  } catch (error) {
    console.log(error)
    response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500);
  } 
};

const takeAttendance = async (data, res) => {
  try {
    const { attendanceArray } = data;
    for (element of attendanceArray) {
      element['date'] = new Date();
      await mongoService.createNew(element, Attendancne);
    }
    //     attendanceArray.forEach((element) => {
    //       element['date'] = new Date();
    //     addAttendanceMethod(element);
    //    });
    response.handleSuccess(res, SuccessMessages.RECORD_SUCCESS, 200);
  } catch (error) {
    console.log(error);
    response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500);
  }
};

const changePassword = async (data, res) => {
  try {
    const { teacherId, password } = data;
    const teacher = await mongoService.findOne({ teacherId }, Newteacher);
    if (teacher) {
      await updatePassword(data);
      response.handleSuccess(res, SuccessMessages.PASSWORD_CHANGED, 200);
    } else {
      response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
    }

  } catch (error) {
    response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};

module.exports = {
    getStudentsByClass,
    takeAttendance,
    changePassword,
};
