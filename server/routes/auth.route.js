const express = require('express');
const userCtrl = require('../controllers/user.controller');
const asyncHandler = require('express-async-handler');
const authController = require('../controllers/auth.controller'); 

const router = express.Router();

// localhost:3000/api/auth/register
router.post('/register', asyncHandler(insert), login);
router.post('/login', passport.authenticate("local", { session: false }), login);
router.get('/findme', passport.authenticate("jwt", { session: false }), login);

async function insert(req, res, next) {
    const user = req.body;
    console.log('registering user', user);
    req.savedUser = await userCtrl.insert(user);
    
	next();
}

async function getUserByEmailAndPassword(req, res, next) {
    const user = req.body;
    console.log('searching user for', user);
    req.savedUser = await userCtrl.getUserByEmailAndPassword(
        user.email,
        user.password
        );
    
	next();
}

function login(req, res) {
    const user = req.savedUser;
    const token = authController.generateToken(user);
    res.json({
        user,
        token
    }); 
}


module.exports = router;