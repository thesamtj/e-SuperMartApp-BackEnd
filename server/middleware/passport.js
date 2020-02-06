const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('../config/config');
const userCtrl = require('../controllers/user.controller');

const localLogin = new LocalStrategy(
    {
        usernameField: 'email'
    }, 
    async (email, password, done)=> {
        const user = await userCtrl.getUserByEmailAndPassword(email, password);
        return user
        ? done(null, user)
        : done(null, false, {
            error: 'Your login details are not valid. Please try again'
        });
    }
);

const jwtLogin = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecret
    }, 
    async (payload, done)=> {
        const user = await userCtrl.getUserById(payload._id);
        return user
        ? done(null, user)
        : done(null, false, {
            error: 'Your login details are not valid. Please try again'
        });
    }
);

module.exports = passport.use(localLogin).use(jwtLogin);