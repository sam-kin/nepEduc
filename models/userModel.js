const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    },
    tel: { type: String, maxlength: 13, required: true },
    f_name: { type: String, maxlength: 30 },
    name: { type: String, maxlength: 30 },
    l_name: { type: String, maxlength: 30 },
    avatar: { type: String },
    cover: { type: String },
    description: { type: String, maxlength: 100 },
    account: {
        type: { type: String, required: true, match: /student|standard|unset/, default: 'unset' },
        authorization: { type: [String], match: /simple|student|cp|cpa|delegue|student/, default: ['simple'] },
        preference: { type: [String] },
        date_reg: { type: Date, default: Date.now() },
    },
    university: { type: Schema.Types.ObjectId },
    fac: { type: Schema.Types.ObjectId },
    depart: { type: Schema.Types.ObjectId },
    promotion: { type: Schema.Types.ObjectId },
    folow: { type: Schema.Types.ObjectId },
    liked_courses: { type: [Schema.Types.ObjectId], ref: "Course" },
    liked_posts: { type: [Schema.Types.ObjectId], ref: "Post" },
    cheked_alert: { type: [Schema.Types.ObjectId], ref: "alert" },
    birth_date: { type: Date },
    password: { type: String, required: true }
});

userSchema
    .virtual("url")
    .get(function () {
        return `http://localhost:5000/api/users/${this._id}`;
    });
userSchema
    .virtual("fullName")
    .get(function () {
        let fn;
        if (this.l_name && this.name && this.f_name)
            fn = `${this.f_name} ${this.l_name} ${this.name}`;
        return fn;
    });

module.exports = mongoose.model("User", userSchema);