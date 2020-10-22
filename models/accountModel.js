const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    name: {type: String, required: true, match: /student|standard/, default: "standard"},
    user: {type: Schema.Types.ObjectId, required: true, ref:"User"},
    authorization: {type: String, default: "simple"},
    preference: {type: [String]},
    date_reg: {type: Date, default: Date.now()},
});

module.exports = mongoose.model("Account", accountSchema);