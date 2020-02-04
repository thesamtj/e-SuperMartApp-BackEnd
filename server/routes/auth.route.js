const express = require('express');
const userCtrl = require('../controllers/user.controller');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const router = express.Router();

// localhost:3000/api/auth/register
router.post('/register', asyncHandler(insert));
router.post('/login', asyncHandler(getUserByEmailAndPassword));

async function insert(req, res, next) {
    const user = req.body;
    console.log('registering user', user);
    const savedUser = await userCtrl.insert(user);
    res.json(savedUser);
}

async function getUserByEmailAndPassword(req, res, next) {
    const user = req.body;
    console.log('searching user for', user);
    const savedUser = await userCtrl.getUserByEmailAndPassword(
        user.email,
        user.password
        );
    res.json(savedUser);
}


module.exports = router;