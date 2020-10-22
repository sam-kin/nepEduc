const Depart = require('../../../models/departModel');
const Fac = require('../../../models/facModel');
const { result } = require('../user/validators');
const { body } = require('express-validator');

exports.create_department = [
    body("name", "Le nom du departement est requis.").trim().escape().isLength({ min: 1 }),
    body("description").trim().escape(),
    body("faculty", "Faculte' Incorrecte.").isMongoId(),
    result,
    async (req, res, next) => {
        try {
            const fac = await Fac.findOne({ _id: req.body.faculty });
            console.log(fac);
            if (!fac) return res.status(404).json({ message: "Facultee incorrecte." });

            const existingDepart = (await Depart.find({ faculty: fac._id })).find(depart => depart.name === req.body.name);

            if (existingDepart) return res.json({
                status: 'fail',
                message: 'Ce departement existe'
            });

            const depart = new Depart({
                name: req.body.name,
                faculty: fac._id,
                description: req.body.description
            });

            const returnedDepart = await depart.save();

            return res.json(returnedDepart);
        } catch (err) {
            next(err);
        }
    }
];

exports.depart_get_all = async (req, res, next) => {
    try {
        const departs = await Depart.find();

        return res.json(departs);
    } catch (err) {
        next(err);
    }
};

exports.depart_get_by_fac = async (req, res, next) => {
    try {
        const { facId } = req.params;
        const fac = await Fac.findById(facId);

        if (!fac) {
            return res.status(404).json({
                status: 'fail',
                message: "Fac Not Found"
            });
        }

        const departs = await Depart.find({ faculty: fac._id });

        return res.json(departs);
    } catch (err) {
        next(err);
    }
};