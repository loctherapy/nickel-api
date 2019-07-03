const ACTIONS = require("./actions");
let ListService;

function deleteListCmd(listId) {
    let list = null;

    const command = async () => {
        list = await ListService.get(listId);
        return await ListService.delete(listId);
    };

    command.undo = async () => {
        if (list) {
            await ListService.add(list);
            list = null;
        }
    };

    command.serialize = () => {
        return {
            action: ACTIONS.DELETE_LIST_CMD,
            payload: {
                list,
                listId
            }
        };
    };

    return command;
}

module.exports = listService => {
    ListService = listService;
    return deleteListCmd;
};
