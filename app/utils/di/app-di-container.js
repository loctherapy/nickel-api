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
diContainer.factory(Injectables.CONNECTION, require("../connection"));
diContainer.factory(Injectables.COMMAND_MODEL, require("../cmd/command.model"));
diContainer.factory(
    Injectables.COMMAND_SERVICE,
    require("../cmd/command.service")
);
diContainer.factory(Injectables.INVOKER, require("../cmd/invoker"));
diContainer.addPlugin(require("../../plugins/user/user.module"));
diContainer.factory(Injectables.SECURITY, require("../security"));
diContainer.addPlugin(require("../../plugins/board/board.module"));
diContainer.addPlugin(require("../../plugins/list/list.module"));
diContainer.addPlugin(require("../../plugins/init/init.module"));

module.exports = diContainer;
