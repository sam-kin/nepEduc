const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alertShema = new Schema({
    author: {type: Schema.Types.ObjectId},
    title: {type: String, required: true, maxlength: 50},
    message: {type: String, required: true, maxlength: 100},
    cheked: Number
});

module.exports = mongoose.model("Alert", alertShema);