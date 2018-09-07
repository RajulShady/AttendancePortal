const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classname: {
    type: String,
    required: true,
    index: true,
  },
});

studentSchema.plugin(AutoIncrement.plugin, {
  model: 'StudentSchema',
  field: 'studentrollno',
  startAt: 1,
});

const Student = mongoose.model('StudentSchema', studentSchema);

module.exports = {
    Student,
};
