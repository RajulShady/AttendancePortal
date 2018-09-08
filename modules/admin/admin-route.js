const express = require('express');

const router = express.Router();
const controller = require('./admin-controller');
const auth = require('../../services/authenticate');
const permission = require('../../services/permission');
const { admin } = require('../../utils/roles');


// Authentication Middleware
router.use('/', auth.ensureAuthenticated);

router.post('/getStudentByClass', permission(admin), (req, res) => {
  const data = { ...req.body };
  controller.getStudentByClass(data, res);
});

router.post('/addStudent', permission(admin), (req, res) =>  {
  const data = { ...req.body };
  controller.addStudent(data, res);
});

router.delete('/deleteStudent', permission(admin), (req, res) => {
  const data = { ...req.body };
  controller.deleteStudent(data, res);
});

router.get('/getTeachers', permission(admin), (req, res) => {
  controller.getTeachers(res);
});

router.post('/addTeacher', permission(admin), (req, res) => {
  console.log('jhj');
  const data = { ...req.body };
  controller.addTeacher(data, res);
});

router.delete('/deleteTeacher', permission(admin),(req, res) => {
  const data = { ...req.body };
  controller.deleteTeacher(data, res);
});

module.exports = router;
