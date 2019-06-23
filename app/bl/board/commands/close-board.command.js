let BoardService, Commands;

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
            action: Commands.CLOSE_BOARD_CMD,
            payload: {
                boardId
            }
        };
    };

    return command;
}

module.exports = (boardService, commands) => {
    BoardService = boardService;
    Commands = commands;

    return closeBoardCmd;
};
