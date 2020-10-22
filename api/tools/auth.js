exports.isAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    }    
    return res.status(401).json({
        message: "Unauthenticated."
    });
};

exports.checkUserCookie = (req, res) => {
    if (!req.user) {
        return res.json({
            status: "unauthenticated",
        });
    }

    return res.json({
        status: "authenticated",
        user: {
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
        }
    });
};