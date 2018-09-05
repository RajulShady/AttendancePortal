const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    studentrollno: {
        type: Number,
        required: true,
        unique: true,
    },
    classname: {
        type: String,
        required: true,
    },
});

const Student = mongoose.model('StudentSchema', studentSchema);

const addStudentMethod = (student) => {
  const addstudent = new Student(student);
  return addstudent.save();
}

const deleteStudentMethod = (studentrollno) => {
  const query = { studentrollno };
  return Student.findOneAndRemove(query);
} 

const findStudentByRollno = studentrollno => Student.findOne({ studentrollno });

const findStudentByClass = (classname) => {
    return Student.find({ classname: classname });
};

module.exports = {
    Student,
    addStudentMethod,
    deleteStudentMethod,
    findStudentByRollno,
    findStudentByClass,
};
