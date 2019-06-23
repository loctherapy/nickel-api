let BoardService, Commands;

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
            action: Commands.OPEN_BOARD_CMD,
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

    return openBoardCmd;
};
