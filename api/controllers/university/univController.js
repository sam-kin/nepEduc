const Univ = require('../../../models/universityModel');
const { body } = require('express-validator');
const { result } = require('../user/validators');

exports.univ_create = [
    body('full_name', 'Le nom de l\'universite\' est requis.').trim().escape().isLength({ min: 1 }).custom(
        async (value) => {
            const resp = await Univ.findOne({ full_name: value });
            if (resp) {
                throw new Error('University name already registered');
            }
        }
    ),
    body('abrev_name').trim().escape().isLength({ min: 1 }).withMessage('Le nom abrege est requis'),
    body('town', 'Le nom de la ville est requis.').trim().escape().isLength({ min: 1 }),
    body('description').trim().escape(),
    result,
    async (req, res, next) => {
        try {
            const univ = new Univ({
                full_name: req.body.full_name,
                abrev_name: req.body.abrev_name,
                town: req.body.town,
                description: req.body.description
            });

            const savedUniv = await univ.save();

            return res.json(savedUniv);
        } catch (err) {
            next(err);
        }
    }
];

exports.univ_get_all = async (req, res, next) => {
    try {
        const univs = await Univ.find();

        return res.json(univs);
    } catch (err) {
        next(err);
    }
};

exports.univ_get_one = async (req, res, next) => {
    try {
        const { univId } = req.params;
        const univ = await Univ.findById(univId);
        if (!univ) {
            return res.json({
                status: 'fail',
                message: 'Universite introuvable.'
            });
        }

        return res.json(univ);

    } catch (err) {
        next(err);
    }
};