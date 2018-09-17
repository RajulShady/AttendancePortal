const express = require('express');

const router = express.Router();
const controller = require('./class-controller');
const auth = require('../../services/authenticate');
const permission = require('../../services/permission');
const { admin, teacher } = require('../../utils/roles');

router.use('/', auth.ensureAuthenticated);

router.get('/getClassListAdmin', permission(admin), (req, res) => {
  controller.getClassList(res);
});

router.post('/addClass', permission(admin), (req, res) => {
  const data = { ...req.body};
  controller.addClass(data, res);
});

router.post('/getClassListTeacher', permission(teacher), (req, res) => {
    const data = { ...req.body};
    controller.getClass(data, res);
  });

module.exports = router;