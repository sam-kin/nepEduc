const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promotionSchema = new Schema({
    description: { type: String },
    option: { type: Schema.Types.ObjectId, required: true },
    level: { type: String, match: /G1|G2|G3|L1|L2/, required: true },
    admin: { type: Schema.Types.ObjectId, ref: "User" },
    student_list: { type: [String] },
    academic_year: {
        start: { type: Number, default: Date.now() },
        end: { type: Number, default: new Date() }
    }
});

module.exports = mongoose.model("Promotion", promotionSchema);