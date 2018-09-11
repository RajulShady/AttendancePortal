const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  classname: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('classModel', classSchema);

