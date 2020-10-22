const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departSchema = new Schema({
    name: { type: String, maxlength: 100, required: true },
    faculty: { type: Schema.Types.ObjectId, required: true, ref: "Faculty" },
    description: { type: String },
    admin: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model("Department", departSchema);