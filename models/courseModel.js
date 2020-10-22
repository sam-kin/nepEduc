const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseModel = new Schema({
    title: {type: String, maxlength: 150, required: true},
    description: {type: String, maxlength: 300, required: true},
    content: {type: String},
    domains: {type: [String]},
    class: {type: Schema.Types.ObjectId, required: true},
    author: {type: Schema.Types.ObjectId},
    images: [String],
    views: Number,
    likes: Number,
});

module.exports = mongoose.model("Course", courseModel);