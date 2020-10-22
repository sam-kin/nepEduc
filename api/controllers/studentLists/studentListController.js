const StudentList = require('../../../models/studentListModel');
const Prom = require('../../../models/promotionModel');

exports.student_list_add_names = async (req, res, next) => {
    try {
        const { names } = req.body;
        const { listId } = req.params;
        const list = await StudentList.findById(listId);

        if (!list) return res.json({
            status: 'failed',
            message: "Mauvais list_Id."
        });

        names.forEach(name => {
            if (!list.names.some(n => n === name)) {
                list.names.push(name);
            }
        });

        const newList = await list.save();

        return res.json(newList);
    } catch (err) {
        next(err);
    }
};

exports.student_list_check_name = async (req, res, next) => {
    try {
        const { listId } = req.params;
        const { name } = req.body;

        const list = await StudentList.findById(listId);

        if (!list) {
            return res.json({
                status: "failed",
                message: "Mauvais list_Id."
            });
        }

        if (!list.names.some(n => n === name)) {
            return res.json({
                status: 'unfound',
                message: 'Ce nom n\'existe pas dans la liste de cette promotion.'
            });
        }

        return res.json({
            status: "found",
            message: "Ce nom existe dans la liste."
        });

    } catch (err) {
        next(err);
    }
};