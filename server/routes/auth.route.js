const express = require('express');
const userCtrl = require('../controllers/user.controller');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.post('/register', asyncHandler(insert));

async function insert(req, res, next) {
    const user = req.body;
    console.log('registering user', user);
    req.user = userCtrl.insert(user);
    res.json(user);
}


module.exports = router;