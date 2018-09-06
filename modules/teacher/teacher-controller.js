const { Student } = require('../student/student-model');
const { Teacher } = require('../teacher/teacher-model');
const { Attendancne, addAttendanceMethod } = require('../attendance/attendance-model');
const mongoService = require('../../services/mongoService');

const getStudentsByClass = async (data, res) => {
  try{
    const { classname } = data;
    const students =  await mongoService.findUser({ classname }, Student);
    if(students){
      return res.send({ success: true, msg: 'Students list', students });
    } else {
        return res.send({ success: false, msg: 'Students not found' });
    }
  } catch (error) {
    console.log(error)
    return res.send({ success: false, msg: 'INTERNAL SERVER ERROR' });
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
    return  res.send({ success: true, msg: 'Attendance successful' });
  } catch (error) {
    console.log(error);
    return res.send({ success: true, msg: 'INTERNAL SERVER ERROR' });
  }
};

module.exports = {
    getStudentsByClass,
    takeAttendance,
};
