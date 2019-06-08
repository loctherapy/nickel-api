const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    desc: {
        type: String,
        unique: false,
        required: true
    },
    closed: {
        type: Boolean,
        unique: false,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: false
    }
});

BoardSchema.pre("validate", function(next) {
    this.createdAt = new Date();
    this.isActive = true;
    next();
});

BoardSchema.pre("findOneAndUpdate", function(next) {
    this._update.$set.updatedAt = new Date();
    next();
});

module.exports = mongoose.model("Board", BoardSchema);
