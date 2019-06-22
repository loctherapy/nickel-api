let CommandService;

function run(cmd) {
    CommandService.add(cmd.serialize());
    cmd();
    console.log(`Command executed ${JSON.stringify(cmd.serialize())}`);
}

module.exports = commandService => {
    CommandService = commandService;

    return {
        run
    };
};
