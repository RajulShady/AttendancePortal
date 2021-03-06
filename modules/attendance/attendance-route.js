const express = require('express');

const router = express.Router();
const controller = require('./attendance-controller');
const auth = require('../../services/authenticate');
const permission = require('../../services/permission');
const { admin, teacher } = require('../../utils/roles');
const response = require('../../utils/response');
const { SuccessMessages, ErrorMessages } = require('../../constants');


// Authentication Middleware
router.use('/', auth.ensureAuthenticated);

router.post('/takeAttendance', permission(teacher), (req, res) => {
  const data = req.body;
  const { teacherId, classId } = data;
  if(teacherId && classId) {
    if (req.decoded.teacherId === teacherId) {
      controller.takeAttendance(data, res);
    } else {
      response.handleError(res, ErrorMessages.UNAUTHORIZED_ACCESS, 400);
    }
  } else {
    response.handleError(res, ErrorMessages.INVALID_CEDENTIALS, 400);
  }
});
  
router.post('/updateAttendance', permission(teacher), (req, res) => {
  if (req. decoded.teacherId === req.body.teacherId) {
    const data = { ...req.body };
    controller.updateAttendance(data, res);
  } else {
    response.handleError(res, ErrorMessages.UNAUTHORIZED_ACCESS, 400);
  }
});

module.exports = router;