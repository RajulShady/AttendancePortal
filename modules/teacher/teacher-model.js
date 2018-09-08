const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classAssigned: {
    type: Array,
    required: true,
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
  },
});

autoIncrement.initialize(mongoose.connection)

teacherSchema.plugin(autoIncrement.plugin, {
  model: 'TeacherSchema',
  field: 'teacherId',
  startAt: 1,
});

const Teacher = mongoose.model('TeacherSchema', teacherSchema);

const updatePassword = (teacher) => {
  try {
    const { teacherId, password } = teacher;
    const query = { teacherId };
    return Teacher.findOneAndUpdate(query, { password: password });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  Teacher,
  updatePassword,
}