let Command;

async function add(command) {
    const cmd = new Command(command);
    return await cmd.save();
}

module.exports = commandModel => {
    Command = commandModel;

    return {
        add
    };
};
