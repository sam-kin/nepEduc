const User = require('../../../models/userModel');
const Fac = require('../../../models/facModel');
const Prom = require('../../../models/promotionModel');

exports.provide_delegue_right = async (req, res, next) => {
    try {
        const { userId, right, facId } = req.body;

        const user = await User.findById(userId);

        if (right === 'delegue') {
            const fac = await Fac.findById(facId);
            if (!fac) return res.json({
                status: "failed",
                message: "La faculte est incorrect."
            });

            fac.admin = user.id;
            await fac.save();
        }

        user.account.authorization.push(right);
        user.save();

    } catch (err) {
        next(err);
    }
};

exports.provide_right = async (req, res, next) => {
    try {
        const { userId, right, placeId } = req.body;

        const user = await User.findById(userId);

        if (right === 'cp' || right === 'cpa') {
            const prom = await Prom.findById(placeId);
            if (!prom) return res.json({
                status: "failed",
                message: "La promotion est incorrect."
            });

            prom.admin = userId;
            await prom.save();
        }

        user.account.authorization.push(right);
        await user.save();

    } catch (err) {
        next(err);
    }
};