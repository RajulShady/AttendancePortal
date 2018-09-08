const { Student } = require('../student/student-model');
const { Teacher } = require('../teacher/teacher-model');
const { Attendance, addAttendanceMethod } = require('../attendance/attendance-model');
const mongoService = require('../../services/mongoService');
const response = require('../../utils/response');
const { SuccessMessages, ErrorMessages } = require('../../constants');
const { Newteacher, updatePassword } = require('../login/login-teacher-model');


const getStudentsByClass = async (data, res) => {
  try{
    const { classname } = data;
    if (!classname) {
      return response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 200);
    }
    const students =  await mongoService.findUser({ classname }, Student);
    if(students.length > 0){
      return response.handleSuccess(res, SuccessMessages.RECORDS_FOUND, 200, students);
    } else {
      return response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
    }
  } catch (error) {
      console.log(error)
      return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500);
  } 
};

const getClass = async (data, res) => {
  try {
    const { teacherId } = data;
    const teacher = await mongoService.findOne({ teacherId }, Teacher);
    if (teacher) {
      return response.handleSuccess(res, SuccessMessages.RECORDS_FOUND, 200, teacher.classAssigned);
    } else{
      return response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
    }
  } catch (error) {
    return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};

const takeAttendance = async (data, res) => {
  try {
    const { attendanceArray } = data;
    const teacherId = attendanceArray[0].teacherId;
    const teacher = await mongoService.findOne({ teacherId }, Teacher);
    if (teacher.classAssigned.includes(attendanceArray[0].classname)) {
    for (element of attendanceArray) {
      let date = new Date().toDateString();
      date = date.split(' ');
      date = `${date[1]} ${date[2]} ${date[3]}`;
      element['date'] = date;
      await mongoService.createNew(element, Attendance);
    }
    return response.handleSuccess(res, SuccessMessages.RECORD_SUCCESS, 200);
  } else {
    return response.handleError(res, ErrorMessages.UNAUTHORIZED_ACCESS, 400);
  }
  } catch (error) {
      return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};

const updateAttendance = async (data, res) => {
  try {
    const { date, teacherId, studentrollno, classname } = data;
    if (!date || !teacherId || !studentrollno || !classname) {
      return response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 400);
    } else{
      const query = { date, teacherId, studentrollno, classname };
      const studentAttendance = await mongoService.findOne(query, Attendance);
      if (studentAttendance) {
        await mongoService.UpdateAttendance(query, studentAttendance.isPresent, Attendance);
        return response.handleSuccess(res, SuccessMessages.UPDATE_SUCCESS, 200);
      } else{
        return response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
      }
    }
  } catch (error) {
    return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 200);
  }
};

const changePassword = async (data, res) => {
  try {
    const { teacherId, password } = data;
    if(!teacherId || !password){
      return response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 400);
    }
    const teacher = await mongoService.findOne({ teacherId }, Newteacher);
    if (teacher) {
      if (teacher.password == password) {
        return response.handleError(res, ErrorMessages.SAME_PASSWORD, 400);
      }
      await updatePassword(data);
      return response.handleSuccess(res, SuccessMessages.PASSWORD_CHANGED, 200);
    } else {
      return response.handleError(res, ErrorMessages.RECORD_NOT_EXIST, 400);
    }

  } catch (error) {
    return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};

module.exports = {
    getStudentsByClass,
    takeAttendance,
    updateAttendance,
    changePassword,
    getClass,
};
