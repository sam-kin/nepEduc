const Option = require('../../../models/optionModel');
const Depart = require('../../../models/departModel');
const { result } = require('../user/validators');
const { body } = require('express-validator');

exports.option_create = [
    body('name', "Le nom de l'option est requis.").trim().escape().isLength({ min: 1 }),
    body('description').trim().escape(),
    body('department', "Departement Incorrect.").isMongoId(),
    result,
    async (req, res, next) => {
        try {
            const depart = await Depart.findOne({ _id: req.body.department });
            if (!depart) return res.status(404).json({ message: "Departement incorrect." });

            const existingOption = (await Option.find({ department: depart._id })).find(opt => opt.name === req.body.name);

            if (existingOption) return res.json({
                status: 'failed',
                message: 'Cet option existe deja'
            });

            const option = new Option({
                name: req.body.name,
                department: depart._id,
                description: req.body.description
            });

            const returnedOption = await option.save();
            return res.json(returnedOption);
        } catch (err) {
            next(err);
        }
    }
];

exports.option_get_all = async (req, res, next) => {
    try {
        const options = await Option.find();

        return res.json(options);
    } catch (err) {
        return next(err);
    }
};

exports.option_get_by_depart = async (req, res, next) => {
    try {
        const { departId } = req.params;

        const depart = await Depart.findById(departId);

        if (!depart) {
            return res.status(404).json({
                status: 'fail',
                message: 'Department Not Found'
            });
        }

        const options = await Option.find({ department: depart._id });

        return res.json(options);
    } catch (err) {
        return next(err);
    }
};
