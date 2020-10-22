exports.checkAdminRight = (req, res, next) => {
    console.log(req.headers);
    const { admin } = req.headers;
    if (admin) {
        if (admin === "sam") {
            return next();
        }
    }

    return res.status(401).json({
        message: "Not Authorized."
    });
};