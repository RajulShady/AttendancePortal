const mongoose = require('mongoose');

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
    type: Date,
    required: true,
  }
});

const Attendancne = mongoose.model('attendanceSchema', attendanceSchema);

module.exports = {
  Attendancne,
};