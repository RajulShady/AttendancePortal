const express = require('express');

const router = express.Router();
const controller = require('./teacher-controller');

router.post('/getStudents', (req, res) => {
  const data = { ...req.body };
  controller.getStudentsByClass(data, res);
});

router.post('/takeAttendance', (req, res) => {
    
    const data = req.body;
    controller.takeAttendance(data, res);
});

module.exports = router;