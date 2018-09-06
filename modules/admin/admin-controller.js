const { Teacher } = require('../teacher/teacher-model');
const { Student } = require('../student/student-model');
const { SuccessMessages, ErrorMessages } = require('../../constants');
const mongoService = require('../../services/mongoService');

const addStudent = async (data, res) => {
  try {
    if (!data.name || !data.classname) {
      res.send({ success: false, msg: ErrorMessages.INVALID_CEDENTIALS});
    }
    else{
      await mongoService.createNew(data, Student);
      res.send({ success: true, msg: SuccessMessages.RECORD_SUCCESS });
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
    res.send({ success: false, msg: ErrorMessages.INTERNAL_SERVER_ERROR });
  }
};

const deleteStudent = async (data, res) => {
  try{
    const { studentrollno } = data;
    const student = await mongoService.findOne({ studentrollno }, Student);
    if (!student) {
      res.send({ success: true, msg: ErrorMessages.RECORD_NOT_EXIST });
    } else {
        await mongoService.findAndRemove({ studentrollno }, Student);
        res.send({ success: true, msg: SuccessMessages.RECORD_DELETED });
    }
  } catch (error) {
      console.log(error);
      res.send({ success: false, msg: ErrorMessages.INTERNAL_SERVER_ERROR });
  }
};

const getStudentByClass = async (data, res) => {
  try{
    const { classname } = data;
    const students =  await mongoService.findUser({ classname }, Student);
    if(students){
      return res.send({ success: true, msg: 'Students list', students });
    } else {
        return res.send({ success: false, msg: ErrorMessages.RECORD_NOT_EXIST });
    }
    } catch (error) {
      res.send({success: false, msg: ErrorMessages.INTERNAL_SERVER_ERROR });
  }
};

const addTeacher = async (data, res) => {
  try {
    if (!data.name) {
      res.send({ success: false, msg: ErrorMessages.INVALID_CEDENTIALS });
    } else {
      await mongoService.createNew(data, Teacher);
      res.send({ success: true, msg: SuccessMessages.RECORD_SUCCESS });
    }
  } catch( error ) {
    res.send({ success: false, msg: ErrorMessages.INVALID_CEDENTIALS });
  }
};

const deleteTeacher = async (data, res) => {
  try {
    const { teacherId } = data;
    const teacher = await mongoService.findOne({ teacherId }, Teacher);
    if(teacher) {
      await mongoService.findAndRemove({ teacherId }, Teacher);
      return res.send({ success: true, msg: SuccessMessages.RECORD_DELETED });
    } else {
      return res.send({ success: false, msg: ErrorMessages.RECORD_NOT_EXIST });
    }
  } catch (error) {
    console.log(error);
    return res.send({ success: false, msg: ErrorMessages.INTERNAL_SERVER_ERROR });
    }
};

const getTeachers = async (res) => {
  try {
    const teachers = await mongoService.findAll(Teacher);
    if(teachers) {
      res.send({ success: true, msg: 'Teachers list', teachers });
    } else {
      res.send({ success: false, msg: ErrorMessages.RECORD_NOT_EXIST });
    } 
  } catch (error) {
    console.log(error);
    res.send({ success: false, msg: ErrorMessages.INTERNAL_SERVER_ERROR });
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
