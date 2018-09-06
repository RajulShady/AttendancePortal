const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  teacherId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    default: '1234',
  },
});

const Newteacher =  mongoose.model('teacherLogin', teacherSchema);

const updatePassword = (teacher) => {
  try {
    const { teacherId, password } = teacher;
    const query = { teacherId };
    return Newteacher.updateOne(query, { $set : { teacherId, password }});
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Newteacher,
  updatePassword,
};