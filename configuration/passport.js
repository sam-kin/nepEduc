const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

module.exports = (passport) => {
    const verifCb = async (username, password, cb) => {
        try{
            const message = "Nom d'utilisateur ou mot de passe incorrect.";

            const user = await User.findOne({username});
            if (!user) return cb(null, false, {message});

            const same = await bcrypt.compare(password, user.password);
            if (!same) return cb(null, false, {message});

            return cb(null, user);
        } catch(err) {
            cb(err);
        }
    };

    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password"
    }, verifCb));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            return done(err, user);
        });
    });
};