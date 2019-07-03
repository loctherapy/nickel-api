// The command is a Proxy on a Service method
// with additional functionality - it records the data
// about command to the command stack
const ACTIONS = require("./actions");
let ListService;

function addListCmd(list) {
    let listId = null;

    const command = async () => {
        const l = await ListService.add(list);
        listId = l._id;
        return l;
    };

    command.undo = async () => {
        if (listId) {
            await ListService.del(listId);
            listId = null;
        }
    };

    command.serialize = () => {
        return {
            action: ACTIONS.ADD_LIST_CMD,
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
    return addListCmd;
};
