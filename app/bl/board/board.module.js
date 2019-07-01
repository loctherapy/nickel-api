const NAME = "BOARD";

const TOKENS = {
    get BOARD_MODEL() {
        return "boardModel";
    },
    get BOARD_SERVICE() {
        return "boardService";
    },
    get ADD_BOARD_CMD() {
        return "addBoardCmd";
    },
    get CLOSE_BOARD_CMD() {
        return "closeBoardCmd";
    },
    get OPEN_BOARD_CMD() {
        return "openBoardCmd";
    },
    get DELETE_BOARD_CMD() {
        return "deleteBoardCmd";
    },
    get UPDATE_BOARD_CMD() {
        return "updateBoardCmd";
    }
};

const FACTORIES = [
    {
        token: TOKENS.BOARD_MODEL,
        factory: require("./board.model")
    },
    {
        token: TOKENS.BOARD_SERVICE,
        factory: require("./board.service")
    },
    {
        token: TOKENS.ADD_BOARD_CMD,
        factory: require("./commands/add-board.command")
    },
    {
        token: TOKENS.CLOSE_BOARD_CMD,
        factory: require("./commands/close-board.command")
    },
    {
        token: TOKENS.OPEN_BOARD_CMD,
        factory: require("./commands/open-board.command")
    },
    {
        token: TOKENS.DELETE_BOARD_CMD,
        factory: require("./commands/delete-board.command")
    },
    {
        token: TOKENS.UPDATE_BOARD_CMD,
        factory: require("./commands/update-board.command")
    }
];

module.exports = {
    NAME,
    TOKENS,
    FACTORIES
};
