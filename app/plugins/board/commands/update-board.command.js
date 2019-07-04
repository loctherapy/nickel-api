const ACTIONS = require("./actions");
let BoardService;

function updateBoardCmd(board, boardId) {
    let boardBeforeUpdate = null,
        boardAfterUpdate = null;

    const command = async () => {
        boardBeforeUpdate = await BoardService.get(boardId);
        boardAfterUpdate = await BoardService.update({ board, boardId });
        return boardAfterUpdate;
    };

    command.undo = async () => {
        if (boardBeforeUpdate) {
            await BoardService.update(boardBeforeUpdate);
            boardBeforeUpdate = null;
            boardAfterUpdate = null;
        }
    };

    command.serialize = () => {
        return {
            action: ACTIONS.UPDATE_BOARD_CMD,
            payload: {
                boardBeforeUpdate,
                boardAfterUpdate
            }
        };
    };

    return command;
}

module.exports = boardService => {
    BoardService = boardService;
    return updateBoardCmd;
};
