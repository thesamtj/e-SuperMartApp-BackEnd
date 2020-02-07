const User = require('../models/user');
const bcrypt = require('bcrypt');

async function insert(user) {
    user.hashedPassword = bcrypt.hashSync(user.password, 10);
    delete user.password;

    // make a moongoose call to save user in db
    console.log('saving user to db');
    return await new User(user).save();
    
}

async function getUserById(id) {
    let user = await User.findById(id);

    if(user) {
        user = user.toObject();
        delete user.hashedPassword;
        return user;
    } else {
        return null;
    }
}

async function getUserByEmailAndPassword(email, password) {
    let user = await User.findOne({ email });

    if (isUserValid(user, password, user.hashedPassword)) {
        user = user.toObject();
        delete user.hashedPassword;
        return user;
    } else {
        return null;
    }
}

function isUserValid(user, password, hashedPassword) {
    return user && bcrypt.compareSync(password, hashedPassword);
}


module.exports = {
    insert,
	getUserByEmailAndPassword,
	getUserById
};