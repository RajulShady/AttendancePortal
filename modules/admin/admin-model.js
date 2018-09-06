const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
});

const Admin = new mongoose.model('adminModel', adminSchema);

module.exports = {
    Admin,
}