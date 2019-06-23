let BoardService, Commands;

function deleteBoardCmd(boardId) {
    let board = null;

    const command = async () => {
        board = await BoardService.get(boardId);
        return await BoardService.delete(boardId);
    };

    command.undo = async () => {
        if (board) {
            await BoardService.add(board);
            board = null;
        }
    };

    command.serialize = () => {
        return {
            action: Commands.DELETE_BOARD_CMD,
            payload: {
                board,
                boardId
            }
        };
    };

    return command;
}

module.exports = (boardService, commands) => {
    BoardService = boardService;
    Commands = commands;

    return deleteBoardCmd;
};
