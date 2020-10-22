const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
    name: { type: String, required: true },
    department: { type: Schema.Types.ObjectId, required: true },
    description: { type: String }
});

module.exports = mongoose.model("Option", optionSchema);