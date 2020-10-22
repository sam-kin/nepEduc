const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const univSchema = new Schema({
    full_name: { type: String, maxlength: 50, required: true },
    abrev_name: { type: String, maxlength: 20, required: true },
    town: { type: String, maxlength: 50, required: true },
    description: { type: String }
});

module.exports = mongoose.model("University", univSchema);