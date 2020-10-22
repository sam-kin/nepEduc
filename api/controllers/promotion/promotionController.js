const Promotion = require('../../../models/promotionModel');
const User = require('../../../models/userModel');
const Depart = require('../../../models/departModel');
const Option = require('../../../models/optionModel');
const StList = require('../../../models/studentListModel');
const { body, param } = require('express-validator');
const { result } = require('../user/validators');

exports.promotion_create = [
    body('option').isMongoId().withMessage("Option Incorrecte."),
    body('level').trim().escape().matches(/G1|G2|G3|L1|L2/).withMessage("Niveau Incorrecte."),
    result,
    async (req, res, next) => {
        try {
            let admin = {};
            if (req.admin) {
                admin = await User.findById({ _id: req.body.admin });
                if (!admin) {
                    return res.status(405).json({ message: "Admin incorrect." });
                }
            }
            const option = await Option.findById({ _id: req.body.option });
            if (!option) {
                return res.status(405).json({ message: "Option inconnue." });
            }

            const existingProm = (await Promotion.find({ option: option._id })).find(prom => prom.level === req.body.level);

            if (existingProm) {
                return res.json({
                    status: 'failed',
                    message: "La promotion existe de'ja'"
                });
            }

            const promotion = new Promotion({
                description: req.body.description,
                option: option._id,
                level: req.body.level,
                admin: admin._id,
            });

            const savedPromotion = await promotion.save();

            return res.json({
                id: savedPromotion._id,
                option: savedPromotion.option,
                level: savedPromotion.level,
                description: savedPromotion.description,
                admin: {
                    id: admin._id,
                    f_name: admin.f_name,
                    l_name: admin.l_name,
                    name: admin.name,
                    fullName: admin.fullName
                },
                academic_year: savedPromotion.academic_year,
                student_list: savedPromotion.student_list
            });
        } catch (err) {
            next(err);
        }
    }
];

exports.promotion_get_by_option = async (req, res, next) => {
    try {

        const { optionId } = req.params;

        const option = await Option.findById(optionId);

        if (!option) {
            return res.json({
                status: "failed",
                message: "Option Incorrect."
            });
        }

        const proms = await Promotion.find({ option: optionId });

        return res.json(proms);

    } catch (err) { next(err); }
};


exports.promotion_student_list_add_names = [
    body('names*').trim().escape(),
    param('promId', 'Bad promotion id.').isMongoId(),
    result,
    async (req, res, next) => {
        try {
            const { names } = req.body;
            const { promId } = req.params;
            const prom = await Promotion.findById(promId);

            if (!prom) return res.json({
                status: 'failed',
                message: "Mauvais promotion_Id."
            });

            names.forEach(name => {
                if (!prom.student_list.some(n => n === name.toLowerCase())) {
                    prom.student_list.push(name.toLowerCase());
                }
            });

            const newProm = await prom.save();

            return res.json(newProm);
        } catch (err) {
            next(err);
        }
    }
]

exports.promotion_student_list_check_name = [
    body('name').trim().escape(),
    param('promId', 'Bad promotion id.').isMongoId(),
    result,
    async (req, res, next) => {
        try {
            const { promId } = req.params;
            const { name } = req.body;

            const prom = await Promotion.findById(promId);

            if (!prom) {
                return res.json({
                    status: "failed",
                    message: "Mauvais promotion_Id."
                });
            }

            if (!prom.student_list.some(n => n === name.toLowerCase())) {
                return res.json({
                    status: 'unfound',
                    message: 'Ce nom n\'existe pas dans cette promotion.'
                });
            }

            return res.json({
                status: "found",
                message: "Ce nom existe dans cette promotion."
            });

        } catch (err) {
            next(err);
        }
    }
];