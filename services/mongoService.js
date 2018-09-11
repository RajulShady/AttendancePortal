const bcrypt = require('bcrypt');
const { otherStrings } = require('../constants')
const Student = require('../modules/student/student-model');
const Teacher = require('../modules/teacher/teacher-model');
const Attendance = require('../modules/attendance/attendance-model');
const Admin = require('../modules/admin/admin-model');

const createNew = (data, Model) => {
  const user = new Model(data);
  return user.save();
};

const findAndRemove = (query, Model) => Model.findOneAndRemove(query);

const findOne = (query, Model) => Model.findOne(query);

const UpdateAttendance = (query, present, Model) => Model.findOneAndUpdate(query, { isPresent: !present });

const updatePassword = (query, password, Model) => Model.findOneAndUpdate(query, { password: password});

const findUser = (query, Model) => Model.find(query);

const findAll = (Model) => Model.find();

module.exports = {
  createNew,
  findAndRemove,
  UpdateAttendance,
  updatePassword,
  findOne,
  findUser,
  findAll,
};
