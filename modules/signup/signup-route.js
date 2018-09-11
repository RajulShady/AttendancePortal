const express = require('express');

const router = express.Router();
const controller = require('./signup-controller');

router.post('/admin', (req, res) => {
  const data = { ...req.body };
  controller.signupAdmin(data, res); 
});

module.exports = router;