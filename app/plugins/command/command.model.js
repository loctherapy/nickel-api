const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommandSchema = new Schema({
    action: {
        type: String,
        unique: false,
        required: true
    },
    payload: Schema.Types.Mixed,
    createdAt: {
        type: Date,
        required: true
    }
});

CommandSchema.pre("validate", function(next) {
    this.createdAt = new Date();
    next();
});

module.exports = connection => {
    return connection.model("Command", CommandSchema);
};
