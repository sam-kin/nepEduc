const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../../../models/userModel');
const UserRequest = require('../../../models/userRequestModel');
const Prom = require('../../../models/promotionModel');

exports.user_register = async (req, res, next) => {
    try {

        const {
            name,
            f_name,
            l_name,
            username,
            tel,
            birth_date,
            password
        } = req.body;

        // Verifier si le nom d'utilisateur est de'ja' utilise'
        const existUsername = await User.findOne({ username });
        if (existUsername) return res.json({
            message: "Nom d'utilisateur de'ja' utilise'."
        });

        // Crypt the password
        const hash = await bcrypt.hash(password, 10);

        // create the user
        const user = new User({
            name,
            f_name,
            l_name,
            username,
            tel,
            birth_date,
            password: hash
        });

        // Save the user
        const addedUser = await user.save();

        // Send a response
        return res.status(201).json({
            user: {
                id: addedUser._id,
                username: addedUser.username,
                tel: addedUser.tel,
                name: addedUser.name,
                f_name: addedUser.f_name,
                l_name: addedUser.l_name,
                birth_date: addedUser.birth_date
            }
        });

    } catch (err) {
        next(err);
    }
};

exports.account_config = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ mesage: "Unauthorized." });
        }

        let type;

        if (req.body.type) {
            type = req.body.type;
            user.account.type = type;
        }
        if (type === 'student' && !user.account.authorization.some(a => a === 'student'))
            user.account.authorization.push('student');
        if (req.body.email) user.email = req.body.email;
        if (req.body.description) user.description = req.body.description;

        if (req.body.university) user.university = req.body.university;
        if (req.body.faculty) user.faculty = req.body.faculty;
        if (req.body.department) user.department = req.body.department;
        if (req.body.option) user.option = req.body.option;
        if (req.body.promotion) user.promotion = req.body.promotion;

        const returnedUser = await user.save();

        return res.status(201).json({
            id: user._id,
            username: returnedUser.username,
            tel: returnedUser.tel,
            email: returnedUser.email,
            l_name: returnedUser.l_name,
            f_name: returnedUser.f_name,
            name: returnedUser.name,
            full_name: returnedUser.fullName,
            avatar: returnedUser.avatar,
            cover: returnedUser.cover,
            description: returnedUser.description,
            account: returnedUser.account,
            university: returnedUser.university,
            fac: returnedUser.fac,
            depart: returnedUser.depart,
            option: returnedUser.option,
            date_birth: returnedUser.date_birth
        });

    } catch (err) {
        next(err);
    }
};


exports.user_login = (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            if (err) return next(err);

            if (!user) return res.json({
                status: "unauthenticated",
                info
            });

            req.logIn(user, (err) => {
                if (err) return next(err);

                return res.json({
                    status: "authenticated",
                    user: {
                        id: user._id,
                        username: user.username,
                        tel: user.tel,
                        email: user.email,
                        l_name: user.l_name,
                        f_name: user.f_name,
                        name: user.name,
                        full_name: user.fullName,
                        avatar: user.avatar,
                        cover: user.cover,
                        description: user.description,
                        account: user.account,
                        authorization: user.authorization,
                        university: user.university,
                        fac: user.fac,
                        depart: user.depart,
                        option: user.option,
                        date_birth: user.date_birth
                    }
                });
            });
        })(req, res, next);
};

exports.get_user = (req, res, next) => {
    return res.json({
        id: req.user._id,
        username: req.user.username,
        tel: req.user.tel,
        email: req.user.email,
        l_name: req.user.l_name,
        f_name: req.user.f_name,
        name: req.user.name,
        full_name: req.user.fullName,
        avatar: req.user.avatar,
        cover: req.user.cover,
        description: req.user.description,
        account: req.user.account,
        authorization: req.user.authorization,
        university: req.user.university,
        fac: req.user.fac,
        depart: req.user.depart,
        option: req.user.option,
        date_birth: req.user.date_birth
    });
};

