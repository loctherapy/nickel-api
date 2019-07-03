const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
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
    board: {
        type: Schema.Types.ObjectId,
        ref: "Board",
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

ListSchema.pre("validate", function(next) {
    this.createdAt = new Date();
    this.isActive = true;
    next();
});

ListSchema.pre("findOneAndUpdate", function(next) {
    this._update.$set.updatedAt = new Date();
    next();
});

module.exports = connection => {
    return connection.model("List", ListSchema);
};
