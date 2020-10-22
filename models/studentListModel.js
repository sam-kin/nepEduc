const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    promotion: { type: Schema.Types.ObjectId, required: true },
    names: { type: [String] }
});

module.exports = mongoose.model('StudentList', listSchema);