const { text } = require("body-parser");
const mongoose = require("mongoose");
require("mongoose-type-email");
const ObjectId = mongoose.Schema.Types.ObjectId


const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "plese enter your full name buddy"],
    },

    email: {
        type: mongoose.SchemaTypes.Email,
        required: [true, "email should be present"],
        unique: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },

    collegeId: {
        type: ObjectId,
        required: true,
        ref: "college",
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

module.exports = mongoose.model("intern", internSchema);