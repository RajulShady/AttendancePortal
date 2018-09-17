const express = require('express');

const app = express();
const port = 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const adminRoute = require('./modules/admin/admin-route');
const loginRoute = require('./modules/login/login-route');
const signupRoute = require('./modules/signup/signup-route');
const teacherRoute = require('./modules/teacher/teacher-route');
const studentRoute = require('./modules/student/student-route');
const classRoute = require('./modules/class/class-route');
const attendanceRoute = require('./modules/attendance/attendance-route');
const config = require('./config/config');

// DATABASE CONNECTIONS
mongoose.connect(config.mongo.url);
mongoose.connection.on('connected', () => {
  console.log(`Database connected at ${port}`);
});
mongoose.connection.on('error', (err) => {
  console.log(`Database error ${err}`);
});

autoIncrement.initialize(mongoose.connection);

// MIDDLEWARES
app.use(bodyParser.urlencoded({
  extended: 'true',
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
  type: 'application/vnd.api+json',
}));

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/teacher', teacherRoute);
app.use('/admin', adminRoute);
app.use('/student', studentRoute);
app.use('/class', classRoute);
app.use('/attendance', attendanceRoute);
app.use('/login', loginRoute);
app.use('/signup', signupRoute);

app.listen(port, () => console.log('database connected'));