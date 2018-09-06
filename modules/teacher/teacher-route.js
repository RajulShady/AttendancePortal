const express = require('express');

const router = express.Router();
const controller = require('./teacher-controller');
const auth = require('../../services/authenticate');

// Authentication Middleware
router.use('/', auth.ensureAuthenticated);

router.post('/getStudents', (req, res) => {
  const data = { ...req.body };
  controller.getStudentsByClass(data, res);
});

router.post('/takeAttendance', (req, res) => {
  const data = req.body;
  controller.takeAttendance(data, res);
});

router.post('/changePassword', (req, res) => {
  const data = { ...req.body };
  controller.changePassword(data, res);
});

module.exports = router;