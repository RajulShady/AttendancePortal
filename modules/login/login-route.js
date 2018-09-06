const express = require('express');

const router = express.Router();
const controller = require('./login-controller');

router.post('/admin', (req, res) => {
    const data = { ...req.body };
    controller.loginAdmin(data, res);
});

module.exports = router;