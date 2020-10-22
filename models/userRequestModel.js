const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRequestSchema = new Schema({
    obj: {type: String, match: /promotion/, required: true},
    from: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    to: {type: Schema.Types.ObjectId, required: true},
    extra_data: {type: Object, default: {}},
    status: {type: String, match: /pending|accepted/, default: "pending"},
    isRead: {type: Boolean, default: false}
});


module.exports = mongoose.model('UserRequest', userRequestSchema);