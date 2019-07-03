const NAME = "SECURITY";

const TOKENS = {
    get SECURITY_SERVICE() {
        return "securityService";
    }
};

const FACTORIES = [
    {
        token: TOKENS.SECURITY_SERVICE,
        factory: require("./security.service")
    }
];

module.exports = {
    NAME,
    TOKENS,
    FACTORIES
};
