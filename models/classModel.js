const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: {type: String, required: true, maxlength: 50},
    description: {type: String, required: true, maxlength: 150},
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    follow: {type: Schema.Types.ObjectId, ref: "Follow", required: true},
});

module.exports = mongoose.model('Class', classSchema);