const NAME = "COMMAND";

const TOKENS = {
    get COMMAND_MODEL() {
        return "commandModel";
    },
    get COMMAND_SERVICE() {
        return "commandService";
    },
    get COMMAND_INVOKER() {
        return "commandInvoker";
    }
};

const FACTORIES = [
    {
        token: TOKENS.COMMAND_MODEL,
        factory: require("./command.model")
    },
    {
        token: TOKENS.COMMAND_SERVICE,
        factory: require("./command.service")
    },
    {
        token: TOKENS.COMMAND_INVOKER,
        factory: require("./invoker")
    }
];

module.exports = {
    NAME,
    TOKENS,
    FACTORIES
};
