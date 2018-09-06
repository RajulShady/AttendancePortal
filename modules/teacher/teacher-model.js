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
});

autoIncrement.initialize(mongoose.connection)

teacherSchema.plugin(autoIncrement.plugin, {
  model: 'TeacherSchema',
  field: 'teacherId',
  startAt: 1,
});

const Teacher = mongoose.model('TeacherSchema', teacherSchema);

module.exports = {
  Teacher,
}