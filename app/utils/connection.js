const mongoose = require("mongoose");

module.exports = dbURI => {
    return mongoose.createConnection(dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
};
