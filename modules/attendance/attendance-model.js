const mongoose = require('mongoose');

const date = new Date().getDay();
const attendanceSchema = mongoose.Schema({
  classname: {
    type: String,
    required: true,
  },
  studentrollno: {
    type: Number,
    required: true,
  },
  isPresent: {
    type: Boolean,
    required: true,
    default: false,
  },
  teacherId: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }
});

const Attendance = mongoose.model('attendanceSchema', attendanceSchema);

module.exports = {
  Attendance,
};