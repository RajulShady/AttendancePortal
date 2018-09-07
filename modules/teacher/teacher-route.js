const express = require('express');

const router = express.Router();
const controller = require('./teacher-controller');
const auth = require('../../services/authenticate');
const permission = require('../../services/permission');
const { teacher } = require('../../utils/roles');

// Authentication Middleware
router.use('/', auth.ensureAuthenticated);

router.post('/getStudents', permission(teacher), (req, res) => {
  const data = { ...req.body };
  controller.getStudentsByClass(data, res);
});

router.post('/takeAttendance', permission(teacher), (req, res) => {
  const data = req.body;
  controller.takeAttendance(data, res);
});

router.post('/updateAttendance', permission(teacher), (req, res) => {
  const data = { ...req.body };
  controller.updateAttendance(data, res);
});

router.post('/changePassword', permission(teacher), (req, res) => {
  const data = { ...req.body };
  controller.changePassword(data, res);
});

module.exports = router;