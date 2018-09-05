const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    teacherId: {
        type: Number,
        required: true,
        unique: true,
    },
    classAssigned: {
        type: Array,
        required: true,
    },
});

const Teacher = mongoose.model('TeacherSchema', teacherSchema);

const addTeacherMethod = (teacher) => {
    const addteacher = new Teacher(teacher);
    return addteacher.save();
}

const deleteTeacherMethod = (teacherId) => {
    const query = { teacherId };
    return Teacher.findOneAndRemove(query);
}

const findTeacher = (teacherId) => {
  const query = { teacherId };
  return Teacher.findOneAndRemove(query);
}

const getTeachersMethod = () => Teacher.find();

module.exports = {
    Teacher,
    addTeacherMethod,
    deleteTeacherMethod,
    findTeacher,
    getTeachersMethod,
}