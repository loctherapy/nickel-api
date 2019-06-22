let CommandService;

async function run(cmd) {
    const res = await cmd();
    CommandService.add(cmd.serialize());
    console.log(`Command executed ${JSON.stringify(cmd.serialize())}`);
    return res;
}

module.exports = commandService => {
    CommandService = commandService;

    return {
        run
    };
};
