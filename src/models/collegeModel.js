const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'College name should be present'],
            unique: true
        },

        fullName: {
            type: String,
            required: [true, 'Please enter full name of college'],
            unique: true
        },

        logoLink: String,

        isDeleted: {
            type: Boolean,
            default: false,
        },

    }, { timestamps: true }


);

module.exports = mongoose.model("college", collegeSchema);