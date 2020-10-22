const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facSchema = new Schema({
    name: { type: String, maxlength: 50, required: true },
    university: { type: Schema.Types.ObjectId, required: true },
    description: { type: String },
    admin: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model("Faculty", facSchema);