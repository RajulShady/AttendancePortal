const Student = require('../modules/student/student-model');
const Teacher = require('../modules/teacher/teacher-model');
const Attendance = require('../modules/attendance/attendance-model');
const TeacherLogin = require('../modules/login/login-teacher-model');

const createNew = (data, Model) => {
    const user = new Model(data);
    return user.save();
  };

const findAndRemove = (query, Model) => Model.findOneAndRemove(query);
const findOne = (query, Model) => Model.findOne(query);
const findUser = (query, Model) => Model.find(query);
const findAll = (Model) => Model.find();

module.exports = {
  createNew,
  findAndRemove,
  findOne,
  findUser,
  findAll,
};
