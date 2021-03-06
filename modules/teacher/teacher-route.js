const express = require('express');

const router = express.Router();
const controller = require('./teacher-controller');
const auth = require('../../services/authenticate');
const permission = require('../../services/permission');
const { admin, teacher } = require('../../utils/roles');
const response = require('../../utils/response');
const { SuccessMessages, ErrorMessages } = require('../../constants');

// Authentication Middleware
router.use('/', auth.ensureAuthenticated);

router.post('/addTeacher', permission(admin), (req, res) => {
  const data = { ...req.body };
  controller.addTeacher(data, res);
});

router.delete('/deleteTeacher', permission(admin),(req, res) => {
  const data = { ...req.body };
  controller.deleteTeacher(data, res);
});

router.get('/getTeachers', permission(admin), (req, res) => {
  controller.getTeachers(res);
});

router.post('/changePassword', permission(teacher), (req, res) => {
  if (req.decoded.teacherId === req.body.teacherId) {
    const data = { ...req.body };
    controller.changePassword(data, res);
  } else {
    response.handleError(res, ErrorMessages.UNAUTHORIZED_ACCESS, 400);
  }
});

module.exports = router;