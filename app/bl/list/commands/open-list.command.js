const ACTIONS = require("./actions");
let ListService;

function openListCmd(listId) {
    const command = async () => {
        const b = await ListService.open(listId);
        return b;
    };

    command.undo = async () => {
        return await ListService.close(listId);
    };

    command.serialize = () => {
        return {
            action: ACTIONS.OPEN_LIST_CMD,
            payload: {
                listId
            }
        };
    };

    return command;
}

module.exports = listService => {
    ListService = listService;
    return openListCmd;
};
