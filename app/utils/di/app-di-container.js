const Injectables = require("./injectables");
const config = require("../../../config")();

const diContainer = require("./di-container")();
diContainer.register(Injectables.CONFIG, config);
diContainer.register(Injectables.DB_URI, config.dbUri);
diContainer.register(Injectables.PASSWORD_SECRET, config.passwordSecret);
diContainer.register(Injectables.PREDEFINED_ROLES, config.predefinedRoles);
diContainer.register(
    Injectables.RESPONSE_MESSAGES,
    require("../response-messages")
);
diContainer.register(Injectables.COMMANDS, require("../cmd/commands"));
diContainer.factory(Injectables.CONNECTION, require("../connection"));
diContainer.factory(Injectables.COMMAND_MODEL, require("../cmd/command.model"));
diContainer.factory(
    Injectables.COMMAND_SERVICE,
    require("../cmd/command.service")
);
diContainer.factory(Injectables.INVOKER, require("../cmd/invoker"));
diContainer.factory(
    Injectables.USER_MODEL,
    require("../../bl/user/user.model")
);
diContainer.factory(Injectables.SECURITY, require("../security"));
diContainer.factory(
    Injectables.USER_SERVICE,
    require("../../bl/user/user.service")
);
diContainer.factory(
    Injectables.BOARD_MODEL,
    require("../../bl/board/board.model")
);
diContainer.factory(
    Injectables.BOARD_SERVICE,
    require("../../bl/board/board.service")
);
diContainer.factory(
    Injectables.ADD_BOARD_CMD,
    require("../../bl/board/commands/add-board.command")
);
diContainer.factory(
    Injectables.CLOSE_BOARD_CMD,
    require("../../bl/board/commands/close-board.command")
);
diContainer.factory(
    Injectables.OPEN_BOARD_CMD,
    require("../../bl/board/commands/open-board.command")
);
diContainer.factory(Injectables.INIT_ADMINS, require("../../init/init-admins"));

module.exports = diContainer;
