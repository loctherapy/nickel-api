const ACTIONS = require("./actions");
let ListService;

function closeListCmd(listId) {
    const command = async () => {
        const l = await ListService.close(listId);
        return l;
    };

    command.undo = async () => {
        return await ListService.open(listId);
    };

    command.serialize = () => {
        return {
            action: ACTIONS.CLOSE_LIST_CMD,
            payload: {
                listId
            }
        };
    };

    return command;
}

module.exports = listService => {
    ListService = listService;
    return closeListCmd;
};
