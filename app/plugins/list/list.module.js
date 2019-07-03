const ACTIONS = require("./commands/actions");
const NAME = "LIST";

const TOKENS = {
    get LIST_MODEL() {
        return "listModel";
    },
    get LIST_SERVICE() {
        return "listService";
    },
    get ADD_LIST_CMD() {
        return "addListCmd";
    },
    get CLOSE_LIST_CMD() {
        return "closeListCmd";
    },
    get OPEN_LIST_CMD() {
        return "openListCmd";
    },
    get DELETE_LIST_CMD() {
        return "deleteListCmd";
    },
    get UPDATE_LIST_CMD() {
        return "updateListCmd";
    }
};

const FACTORIES = [
    {
        token: TOKENS.LIST_MODEL,
        factory: require("./list.model")
    },
    {
        token: TOKENS.LIST_SERVICE,
        factory: require("./list.service")
    },
    {
        token: TOKENS.ADD_LIST_CMD,
        factory: require("./commands/add-list.command")
    },
    {
        token: TOKENS.CLOSE_LIST_CMD,
        factory: require("./commands/close-list.command")
    },
    {
        token: TOKENS.OPEN_LIST_CMD,
        factory: require("./commands/open-list.command")
    },
    {
        token: TOKENS.DELETE_LIST_CMD,
        factory: require("./commands/delete-list.command")
    },
    {
        token: TOKENS.UPDATE_LIST_CMD,
        factory: require("./commands/update-list.command")
    }
];

module.exports = {
    NAME,
    TOKENS,
    ACTIONS,
    FACTORIES
};
