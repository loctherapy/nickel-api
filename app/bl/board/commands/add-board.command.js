// The command is a Proxy on a Service method
// with additional functionality - it records the data
// about command to the command stack
const ACTIONS = require("./actions");
let BoardService;

function addBoardCmd(board) {
    let boardId = null;

    const command = async () => {
        const b = await BoardService.add(board);
        boardId = b._id;
        return b;
    };

    command.undo = async () => {
        if (boardId) {
            await BoardService.del(boardId);
            boardId = null;
        }
    };

    command.serialize = () => {
        return {
            action: ACTIONS.ADD_BOARD_CMD,
            payload: {
                board,
                boardId
            }
        };
    };

    return command;
}

module.exports = boardService => {
    BoardService = boardService;
    return addBoardCmd;
};
