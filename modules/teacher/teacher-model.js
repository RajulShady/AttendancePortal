const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classAssigned: [{
    type: Schema.Types.ObjectId,
    ref: 'classModel',
  }],
  password: {
    type: String,
    required: true,
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

module.exports =  mongoose.model('TeacherSchema', teacherSchema);

