const ACTIONS = require("./actions");
let BoardService;

function closeBoardCmd(boardId) {
    const command = async () => {
        const b = await BoardService.close(boardId);
        return b;
    };

    command.undo = async () => {
        return await BoardService.open(boardId);
    };

    command.serialize = () => {
        return {
            action: ACTIONS.CLOSE_BOARD_CMD,
            payload: {
                boardId
            }
        };
    };

    return command;
}

module.exports = boardService => {
    BoardService = boardService;
    return closeBoardCmd;
};
