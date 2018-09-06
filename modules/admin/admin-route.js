const express = require('express');

const router = express.Router();
const controller = require('./admin-controller');

router.post('/getStudentByClass', (req, res) => {
  const data = { ...req.body };
  controller.getStudentByClass(data, res);
});

router.post('/addStudent', (req, res) =>  {
  const data = { ...req.body };
  controller.addStudent(data, res);
});

router.delete('/deleteStudent', (req, res) => {
  const data = { ...req.body };
  controller.deleteStudent(data, res);
});

router.get('/getTeachers', (req, res) => {
  controller.getTeachers(res);
});

router.post('/addTeacher', (req, res) => {
  const data = { ...req.body };
  controller.addTeacher(data, res);
});

router.delete('/deleteTeacher', (req, res) => {
  const data = { ...req.body };
  controller.deleteTeacher(data, res);
});

module.exports = router;
