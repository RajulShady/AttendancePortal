const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  adminId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 1,
  }
});

module.exports =  mongoose.model('adminModel', adminSchema);

