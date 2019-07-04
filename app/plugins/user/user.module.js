const NAME = "USER";

const TOKENS = {
    get USER_MODEL() {
        return "userModel";
    },
    get USER_SERVICE() {
        return "userService";
    }
};

const FACTORIES = [
    {
        token: TOKENS.USER_MODEL,
        factory: require("./user.model")
    },
    {
        token: TOKENS.USER_SERVICE,
        factory: require("./user.service")
    }
];

module.exports = {
    NAME,
    TOKENS,
    FACTORIES
};
