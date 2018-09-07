const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  teacherId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    default: '123456',
    minlength: 6,
  },
  role: {
    type: Number,
    required: true,
    default: 2,
  }
});

const Newteacher =  mongoose.model('teacherLogin', teacherSchema);

const updatePassword = (teacher) => {
  try {
    const { teacherId, password } = teacher;
    const query = { teacherId };
    return Newteacher.updateOne(query, { $set : { teacherId, password, role: 2 }});
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  Newteacher,
  updatePassword,
};