const ACTIONS = require("./actions");
let ListService;

function updateListCmd(list, listId) {
    let listBeforeUpdate = null,
        listAfterUpdate = null;

    const command = async () => {
        listBeforeUpdate = await ListService.get(listId);
        listAfterUpdate = await ListService.update({ list, listId });
        return listAfterUpdate;
    };

    command.undo = async () => {
        if (listBeforeUpdate) {
            await ListService.update(listBeforeUpdate);
            listBeforeUpdate = null;
            listAfterUpdate = null;
        }
    };

    command.serialize = () => {
        return {
            action: ACTIONS.UPDATE_LIST_CMD,
            payload: {
                listBeforeUpdate,
                listAfterUpdate
            }
        };
    };

    return command;
}

module.exports = listService => {
    ListService = listService;
    return updateListCmd;
};
