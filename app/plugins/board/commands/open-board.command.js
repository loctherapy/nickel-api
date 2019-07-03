const ACTIONS = require("./actions");
let BoardService;

function openBoardCmd(boardId) {
    const command = async () => {
        const b = await BoardService.open(boardId);
        return b;
    };

    command.undo = async () => {
        return await BoardService.close(boardId);
    };

    command.serialize = () => {
        return {
            action: ACTIONS.OPEN_BOARD_CMD,
            payload: {
                boardId
            }
        };
    };

    return command;
}

module.exports = boardService => {
    BoardService = boardService;
    return openBoardCmd;
};
