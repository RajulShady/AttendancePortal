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

const addAttendanceMethod = (attendanceObj) => {
   const attendance = new Attendancne(attendanceObj);
   attendance.save();
};

module.exports = {
    Attendancne,
    addAttendanceMethod,
};