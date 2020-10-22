const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    title: {type: String, maxlength: 50, required:true},
    message: {type: String, maxlength: 100, required:true}
});

module.exports = mongoose.model("Notification", notificationSchema);