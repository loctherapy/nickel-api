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
diContainer.addPlugin(require("./../../bl/user/user.module"));
diContainer.factory(Injectables.SECURITY, require("../security"));
diContainer.addPlugin(require("./../../bl/board/board.module"));
diContainer.factory(Injectables.INIT_ADMINS, require("../../init/init-admins"));

module.exports = diContainer;
