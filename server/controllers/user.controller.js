const User = require('../models/user');
const bcrypt = require('bcrypt');

async function insert(user) {
    user.hashedPassword = bcrypt.hashSync(user.password, 10);
    delete user.password;

    // make a moongoose call to save user in db
    console.log('saving user to db');
    return await new User(user).save();
    
}

module.exports = {
    insert
};