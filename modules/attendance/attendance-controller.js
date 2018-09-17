const bcrypt = require('bcrypt');
const Student = require('../student/student-model');
const Teacher = require('../teacher/teacher-model');
const Attendance = require('../attendance/attendance-model');
const mongoService = require('../../services/mongoService');
const response = require('../../utils/response');
const { SuccessMessages, ErrorMessages, otherStrings } = require('../../constants');

const takeAttendance = async (data, res) => {
  try {
    const { attendanceArray, classId, teacherId, lectureNo } = data;
    const teacher = await mongoService.findOne({ teacherId }, Teacher);
    for (element of attendanceArray) {
      let date = new Date().toDateString();
      date = date.split(' ');
      date = `${date[1]} ${date[2]} ${date[3]}`;
      element['date'] = date;
      element['classId'] = classId;
      element['teacherId'] = teacherId;
      element['lectureNo'] = lectureNo;
      await mongoService.createNew(element, Attendance);
    }
    return response.handleSuccess(res, SuccessMessages.RECORD_SUCCESS, 200);
  } catch (error) {
      return response.handleError(res, ErrorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};
  
const updateAttendance = async (data, res) => {
  try {
    const { date, teacherId, studentrollno, classId, lectureNo } = data;
    if (!date || !teacherId || !studentrollno || !classId || !lectureNo) {
      return response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 400);
    } else{
      const query = { date, teacherId, studentrollno, classId, lectureNo };
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

module.exports = {
  takeAttendance,
  updateAttendance,
};
  