let BoardService, Commands;

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
            action: Commands.UPDATE_BOARD_CMD,
            payload: {
                boardBeforeUpdate,
                boardAfterUpdate
            }
        };
    };

    return command;
}

module.exports = (boardService, commands) => {
    BoardService = boardService;
    Commands = commands;

    return updateBoardCmd;
};
