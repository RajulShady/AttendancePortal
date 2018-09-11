const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const date = new Date().getDay();
const attendanceSchema = mongoose.Schema({
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'classModel',
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
  lectureNo: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('attendanceSchema', attendanceSchema);
