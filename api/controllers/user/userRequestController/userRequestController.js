const UserRequest = require('../../../../models/userRequestModel');
const User = require('../../../../models/userModel');
const Prom = require('../../../../models/promotionModel');

exports.user_send_demand = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ mesage: "Unauthorized." });
        }

        let type = user.account.type;

        if (type === "student") {
            const demandData = {
                university: req.body.university,
                fac: req.body.faculty,
                depart: req.body.department,
                option: req.body.option,
                promotion: req.body.promotion,
            };

            const prom = Prom.findById(req.body.promotion);
            if (!prom || !prom.admin) return res.json({
                status: "failed",
                message: "Promotion non encore en fonction. Contactez votre cp pour plus d'info."
            });
            // send a demand to the admin
            const userRequest = new UserRequest({
                obj: 'promotion',
                from: user.id,
                to: prom.admin,
                extra_data: demandData,
            });

            // Save the demand
            await userRequest.save();
            return res.json({
                status: 'success',
                message: 'Demande envoye au cp de la promotion'
            });
        }

        return res.json({
            status: 'failed',
            message: "L'utilisateur n'est pas un etudiant"
        });
    } catch (err) {
        next(err);
    }
};