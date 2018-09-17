const express = require('express');

const router = express.Router();
const controller = require('./admin-controller');
const auth = require('../../services/authenticate');
const permission = require('../../services/permission');
const { admin } = require('../../utils/roles');


router.post('/changePassword', permission(admin), (req, res)=> {
  const data = { ...req.body };
  controller.changePasswordAdmin(data, res);
});

module.exports = router;
