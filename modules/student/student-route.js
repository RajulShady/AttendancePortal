const express = require('express');

const router = express.Router();
const controller = require('./student-controller');
const auth = require('../../services/authenticate');
const permission = require('../../services/permission');
const { admin, teacher } = require('../../utils/roles');
const response = require('../../utils/response');
const { SuccessMessages, ErrorMessages } = require('../../constants');


// Authentication Middleware
router.use('/', auth.ensureAuthenticated);

router.post('/addStudent', permission(admin), (req, res) =>  {
  const data = { ...req.body };
  controller.addStudent(data, res);
});
  
router.delete('/deleteStudent', permission(admin), (req, res) => {
  const data = { ...req.body };
  controller.deleteStudent(data, res);
});
  
router.post('/getStudentByClass', permission(admin), (req, res) => {
  const data = { ...req.body };
  controller.getStudentByClass_Admin(data, res);
});

router.post('/getStudents', permission(teacher), (req, res) => {
  if(req.decoded.teacherId === req.body.teacherId){
  const data = { ...req.body };
  controller.getStudentByClass_Teacher(data, res);
  } else {
    response.handleError(res, ErrorMessages.UNAUTHORIZED_ACCESS, 400);
  }
});

module.exports = router;