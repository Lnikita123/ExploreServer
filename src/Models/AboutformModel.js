const mongoose = require("mongoose");
const AboutformModel = new mongoose.Schema(
    {
        id: {
            type: String,
        },
        Name: {
            type: String,
        },
        Phone: {
            type: String,
        },
        Email: {
            type: String,
        },

        Message: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Aboutform", AboutformModel);
