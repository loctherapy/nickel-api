const NAME = "INIT";

const TOKENS = {
    get INIT_ADMINS() {
        return "initAdmins";
    }
};

const FACTORIES = [
    {
        token: TOKENS.INIT_ADMINS,
        factory: require("./init-admins")
    }
];

module.exports = {
    NAME,
    TOKENS,
    FACTORIES
};
