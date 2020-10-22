const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {type: String, maxlength: 150, required: true},
    description: {type: String, maxlength: 300},
    content: {type: String, required: true},
    domains: {type: [String]},
    author: {type: Schema.Types.ObjectId},
    images: [String],
    views: Number,
    likes: Number,
});

module.exports = mongoose.model("Schema", postSchema);