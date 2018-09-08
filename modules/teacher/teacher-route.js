const express = require('express');

const router = express.Router();
const controller = require('./teacher-controller');
const auth = require('../../services/authenticate');
const permission = require('../../services/permission');
const { teacher } = require('../../utils/roles');
const response = require('../../utils/response');
const { SuccessMessages, ErrorMessages } = require('../../constants');
// Authentication Middleware
router.use('/', auth.ensureAuthenticated);

router.post('/getStudents', permission(teacher), (req, res) => {
  const data = { ...req.body };
  controller.getStudentsByClass(data, res);
});

router.post('/getClassList', permission(teacher), (req, res) => {
  if(req.decoded.teacherId === req.body.teacherId) {
    const data = { ...req.body};
    controller.getClass(data, res);
  } else {
    return response.handleError(res, ErrorMessages.UNAUTHORIZED_ACCESS, 400);
  }
});

router.post('/takeAttendance', permission(teacher), (req, res) => {
  const data = req.body;
  const { attendanceArray } = data;
  if (req.decoded.teacherId === attendanceArray[0].teacherId) {
    controller.takeAttendance(data, res);
  } else {
    return response.handleError(res, ErrorMessages.UNAUTHORIZED_ACCESS, 400);
  }
});

router.post('/updateAttendance', permission(teacher), (req, res) => {
  if (req. decoded.teacherId === req.body.teacherId) {
    const data = { ...req.body };
    controller.updateAttendance(data, res);
  } else {
    return response.handleError(res, ErrorMessages.UNAUTHORIZED_ACCESS, 400);
  }
});

router.post('/changePassword', permission(teacher), (req, res) => {
  if (req.decoded.teacherId === req.body.teacherId) {
    const data = { ...req.body };
    controller.changePassword(data, res);
  } else {
    return response.handleError(res, ErrorMessages.UNAUTHORIZED_ACCESS, 400);
  }
});

module.exports = router;