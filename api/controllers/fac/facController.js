const Fac = require('../../../models/facModel');
const Univ = require('../../../models/universityModel');
const { result } = require('../user/validators');
const { body } = require('express-validator');

exports.fac_create = [
    body('name', 'Le nom de la faculte\' est requis').trim().escape().isLength({ min: 1 }),
    body('description').trim().escape(),
    body('university', 'Universite\' Incorrect.').isMongoId(),
    result,
    async (req, res, next) => {
        try {
            const univ = await Univ.findOne({ _id: req.body.university });
            if (!univ) {
                return res.status(404).json({ message: "id de l'Universite' incorrecte" });
            }

            const facs = await Fac.find({ university: univ._id });

            const existingFac = facs.find(fac => fac.name === req.body.name);

            if (existingFac) {
                return res.json({
                    status: 'fail',
                    message: 'Cette faculte existe deja'
                });
            }

            const fac = new Fac({
                name: req.body.name,
                university: univ._id,
                description: req.body.description
            });

            const savedFac = await fac.save();

            return res.json(savedFac);
        } catch (err) {
            next(err);
        }
    }
];

exports.fac_get_all = async (req, res, next) => {
    try {
        const facs = await Fac.find();

        return res.json(facs);
    } catch (err) {
        next(err);
    }
};

exports.fac_get_by_univ = async (req, res, next) => {
    try {
        const univId = req.params.univId;
        const univ = await Univ.findById(univId);
        if (!univ) {
            return res.status(404).json({
                status: 'failed',
                message: 'University Not Found'
            });
        }

        const facs = await Fac.find({ university: univ._id });
        return res.json(facs);
    } catch (err) {
        next(err);
    }
};