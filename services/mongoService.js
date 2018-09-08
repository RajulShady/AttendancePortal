const bcrypt = require('bcrypt');

const Student = require('../modules/student/student-model');
const Teacher = require('../modules/teacher/teacher-model');
const { Attendance } = require('../modules/attendance/attendance-model');

const createNew = (data, Model) => {
    const user = new Model(data);
    return user.save();
};

const createNewTeacher = (data, Model) => {
  data['password'] = '123456';
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(data.password, salt, (error, hash) => {
      if (error) throw error;
      data.password = hash;
      const newteacher = new Model(data);
      return newteacher.save();
    });
  });

  console.log(data);
}

const comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

const findAndRemove = (query, Model) => Model.findOneAndRemove(query);

const findOne = (query, Model) => Model.findOne(query);

const UpdateAttendance = (query, present, Model) => Model.findOneAndUpdate(query, { isPresent: !present });


const findUser = (query, Model) => Model.find(query);

const findAll = (Model) => Model.find();

module.exports = {
  createNew,
  createNewTeacher,
  comparePassword,
  findAndRemove,
  UpdateAttendance,
  findOne,
  findUser,
  findAll,
};
