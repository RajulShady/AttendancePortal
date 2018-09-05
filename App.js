const express = require('express');

const app = express();
const port = 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const adminRoute = require('./modules/admin/admin-route');
const teacherRoute = require('./modules/teacher/teacher-route');
const config = require('./congif/config');
// DATABASE CONNECTIONS
mongoose.connect(config.mongo.url);
mongoose.connection.on('connected', () => {
  console.log(`Database connected at ${port}`);
});
mongoose.connection.on('error', (err) => {
  console.log(`Database error ${err}`);
});

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

const { connection } = mongoose;

autoIncrement.initialize(connection);

app.use('/admin', adminRoute);
app.use('/teacher', teacherRoute);

app.listen(port, () => console.log('database connected'));