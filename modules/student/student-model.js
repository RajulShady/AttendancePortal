const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-auto-increment');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'classModel',
  },
});

studentSchema.plugin(AutoIncrement.plugin, {
  model: 'StudentSchema',
  field: 'studentrollno',
  startAt: 1,
});

module.exports = mongoose.model('StudentSchema', studentSchema);

