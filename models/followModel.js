const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followShema = new Schema({
    follower: {type: Schema.Types.ObjectId, required: true},
    followed: {type: Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model("Follow", followShema);